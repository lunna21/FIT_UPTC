import { PrismaClient } from '@prisma/client';
import { validateUser, validateInscriptionDetail } from '@/utils/validations';
import { generateUsername } from '@/utils/utils';
import { hashPassword } from '@/utils/bcrypt';

const prisma = new PrismaClient();

export default async function postHandler(req, res) {
    try {
        const data = req.body;
        const {
            document_number_person,
            id_role_user,
            password_user,
            inscription_detail,
        } = data;

        // Validar usuario
        const userValidation = validateUser({
            document_number_person,
            id_role_user,
            password_user
        });

        if (!userValidation.isValid) {
            return res.status(400).json(
                { error: 'Errores de validación en los datos del usuario', details: userValidation.errors }
            );
        }

        // Verificar si en verdad hay una persona con el mismo documento
        const existingPerson = await prisma.person.findUnique({
            where: { document_number_person: parseInt(document_number_person) },
        });

        const personForUsername = await prisma.person.findFirst({
            where: {
                first_name_person: existingPerson.first_name_person,
                last_name_person: existingPerson.last_name_person
            }
        });

        let numberUsername = 0;
        if(personForUsername){
            numberUsername = await prisma.user.count({
                where: { id_person: personForUsername.id_person }
            });
        }

        if (!existingPerson) {
            return res.status(400).json(
                { error: 'No existe una persona con este número de documento' }
            );
        }

        const name_user = generateUsername(existingPerson.first_name_person, existingPerson.last_name_person, numberUsername+1);

        // Verificar si ya existe un usuario con el mismo name_user
        const existingUser = await prisma.user.findFirst({
            where: { name_user: name_user },
        });

        if (existingUser) {
            return res.status(400).json(
                { error: 'Ya existe un usuario con este nombre de usuario' }
            );
        }

        // Verificar si el rol de usuario existe
        const existingRole = await prisma.role_user.findUnique({
            where: { id_role_user: id_role_user },
        });

        if (!existingRole) {
            return res.status(400).json(
                { error: 'No existe un rol de usuario con este nombre' }
            );
        }

        // Usar una transacción para asegurar la integridad de los datos
        const result = await prisma.$transaction(async (prisma) => {
            const newUser = await prisma.user.create({
                data: {
                    id_person: existingPerson.id_person,
                    document_number_person: parseInt(document_number_person),
                    id_role_user,
                    name_user,
                    password_user: await hashPassword(password_user),
                    creation_date_user: new Date(),
                }
            });

            let newInscriptionDetail = null;
            let user_status = 'ACT';
            if (newUser.id_role_user === 'STU' && inscription_detail) {
                user_status = 'PEN';
                const inscriptionDetailValidation = validateInscriptionDetail(inscription_detail);
                if (!inscriptionDetailValidation.isValid) {
                    return res.status(400).json(
                        { error: 'Errores de validación en los datos de la inscripción', details: inscriptionDetailValidation.errors }
                    );
                }

                // añadir y validar emergency_contact
                const { full_name_emecont, relationship_emecont, phone_number_emecont } = inscription_detail.emergency_contact;

                let existingEmergencyContact = await prisma.emergency_contact.findFirst({
                    where: { full_name_emecont: full_name_emecont.toLowerCase().trim() },
                });

                if (!existingEmergencyContact || existingEmergencyContact?.phone_number_emecont !== phone_number_emecont || existingEmergencyContact?.relationship_emecont !== relationship_emecont) {
                    existingEmergencyContact = await prisma.emergency_contact.create({
                        data: {
                            full_name_emecont,
                            relationship_emecont,
                            phone_number_emecont
                        }
                    });
                }

                // añadir y validar eps
                let name_eps = inscription_detail.eps;
                name_eps = name_eps.toUpperCase().trim();

                let existingEps = await prisma.eps.findUnique({
                    where: { name_eps },
                });

                if (!existingEps) {
                    existingEps = await prisma.eps.create({
                        data: {
                            name_eps
                        }
                    });
                }

                // obtener alergia, si existe
                let allergyId = null;
                if (inscription_detail.allergy) {
                    let name_allergy = inscription_detail.allergy.name_allergy.toLowerCase().trim();
                    let existingAllergy = await prisma.allergy.findFirst({
                        where: { name_allergy: name_allergy },
                    });

                    if (!existingAllergy) {
                        existingAllergy = await prisma.allergy.create({
                            data: {
                                name_allergy
                            }
                        });
                    }

                    allergyId = existingAllergy.id_allergy;
                }

                newInscriptionDetail = await prisma.inscription_detail.create({
                    data: {
                        id_estu: existingPerson.id_person,
                        id_estatment_u: inscription_detail.id_estatment_u,
                        student_code: inscription_detail.student_code,
                        id_emecont: existingEmergencyContact.id_emecont,
                        id_eps: existingEps.id_eps,
                        blood_type: inscription_detail.blood_type,
                        url_consent: inscription_detail.url_consent,
                        ...(allergyId !== null && { id_allergy: allergyId }),
                    },
                });

                // Si hay medicamentos, crearlos y asociarlos
                if (inscription_detail.medications && inscription_detail.medications.length > 0) {
                    for (const med of inscription_detail.medications) {
                        const medication = await prisma.prescription_medication.create({
                            data: {
                                name_presmed: med.name_presmed,
                                dose_persmed: med.dose_persmed,
                                recipe_reason: med.recipe_reason
                            }
                        });

                        await prisma.inscripdetail_presmed.create({
                            data: {
                                id_insdetail: newInscriptionDetail.id_insdetail,
                                id_presmed: medication.id_presmed
                            }
                        });
                    }
                }
            }

            // Crear registro en HISTORY_USER_STATUS
            await prisma.history_user_status.create({
                data: {
                    id_user_status: user_status,
                    id_user: newUser.id_user,
                    date_hour_userstatus: new Date(),
                    created_hiuserstatus_by: newUser.id_user,
                },
            });

            return {
                user: newUser,
                inscription_detail: newInscriptionDetail
            };
        }, { timeout: 20000 });

        return res.status(201).json(result);
    } catch (error) {
        console.error('Error creating user:', error);

        // Si el error es de validación, devolver los detalles
        try {
            const parsedError = JSON.parse(error.message);
            if (parsedError.details) {
                return res.status(400).json(parsedError);
            }
        } catch (_) {
            // No es un error de validación
        }

        return res.status(500).json(
            { error: 'Error al crear usuario y datos asociados' }
        );
    }
}