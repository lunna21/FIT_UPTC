import { PrismaClient } from '@prisma/client';
import { validateUser, validateInscriptionDetail } from '@/utils/validations';
import { generateUsername } from '@/utils/utils';
// import { hashPassword } from '@/utils/bcrypt';

const prisma = new PrismaClient();

export default async function postHandler(req, res) {
    try {
        const data = req.body;
        const {
            document_number_person,
            id_role_user,
            email_user,
            password_user,
            inscription_detail,
        } = data;

        // Validar usuario
        const userValidation = validateUser({
            document_number_person,
            id_role_user,
            email_user,
        });

        if (!userValidation.isValid) {
            return res.status(400).json(
                { error: 'Errores de validación en los datos del usuario ' + userValidation.errors.join(', ') }
            );
        }

        // Verificar si en verdad hay una persona con el mismo documento
        const existingPerson = await prisma.person.findUnique({
            where: { document_number_person: document_number_person },
        });

        const personForUsername = await prisma.person.findFirst({
            where: {
                first_name_person: existingPerson.first_name_person,
                last_name_person: existingPerson.last_name_person
            }
        });

        let numberUsername = 0;
        if (personForUsername) {
            numberUsername = await prisma.user.count({
                where: { id_person: personForUsername.id_person }
            });
        }

        if (!existingPerson) {
            return res.status(400).json(
                { error: 'No existe una persona con este número de documento' }
            );
        }

        let username = generateUsername(existingPerson.first_name_person, existingPerson.last_name_person, id_role_user, numberUsername + 1);
        // Verificar si ya existe un usuario con el mismo nombre de usuario
        console.log(username);

        let existingUser = await prisma.user.findUnique({
            where: { name_user: username },
        });

        while (existingUser) {
            numberUsername += 1;
            username = generateUsername(existingPerson.first_name_person, existingPerson.last_name_person, id_role_user, numberUsername);
            existingUser = await prisma.user.findUnique({
                where: { name_user: username },
            });
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

            const userData = {
                id_person: existingPerson.id_person,
                document_number_person: document_number_person,
                id_role_user,
                name_user: username,
                password_user: password_user,
                email_user,
                creation_date_user: new Date(),
            }

            const newUser = await prisma.user.create({
                data: userData,
            });

            let newInscriptionDetail = null;
            let user_status = 'ACT';
            if (newUser.id_role_user === 'STU' && inscription_detail) {
                user_status = 'PEN';
                const inscriptionDetailValidation = validateInscriptionDetail(inscription_detail);
                if (!inscriptionDetailValidation.isValid) {
                    console.error(inscriptionDetailValidation.errors)
                    return res.status(400).json(
                        { error: 'Errores de validación en los datos de la inscripción', details: inscriptionDetailValidation.errors }
                    );
                }

                // Verificar si ya existe un detalle de inscripción con el mismo código de estudiante
                const existingInscriptionDetail = await prisma.inscription_detail.findFirst({
                    where: { student_code: inscription_detail.student_code },
                });

                if (existingInscriptionDetail) {
                    return res.status(400).json(
                        { error: 'Ya existe un detalle de inscripción con este código de estudiante' }
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
                        let medication = await prisma.prescription_medication.findUnique({
                            where: {
                                name_presmed: med.name_presmed,
                            },
                        });

                        if (!medication) {
                            medication = await prisma.prescription_medication.create({
                                data: {
                                    name_presmed: med.name_presmed,
                                    dose_persmed: med.dose_persmed,
                                    recipe_reason: med.recipe_reason,
                                },
                            });
                        }

                        await prisma.inscripdetail_presmed.create({
                            data: {
                                id_insdetail: newInscriptionDetail.id_insdetail,
                                id_presmed: medication.id_presmed,
                            },
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
        }, { maxWait: 5000, timeout: 30000 });

        return res.status(201).json(result);
    } catch (error) {
        console.error('Error creating user:', error);

        if (error.code === 'P2002') {
            // Prisma unique constraint error
            const uniqueField = error.meta.target;
            console.log('Unique field:', uniqueField);
            let errorMessage = 'Error al crear la persona';

            switch (uniqueField) {
                case 'user_uk_email_user':
                    errorMessage = 'El correo electrónico ya está registrado';
                    break;
                case 'user_uk_name_user':
                    errorMessage = 'El nombre de usuario ya está registrado';
                    break;
                case 'pers_uk_document_person':
                    errorMessage = 'El número de documento de la persona ya está registrado';
                    break;
                case 'insdtail_uk_student_code':
                    errorMessage = 'El código de estudiante ya está registrado';
                    break;
                case 'insdtail_uk_urlconsent':
                    errorMessage = 'La URL del consentimiento ya está registrada';
                    break;
                case 'presmed_uk_name':
                    errorMessage = 'El nombre del medicamento ya está registrado';
                    break;
                case 'uk_name_allergy':
                    errorMessage = 'El nombre de la alergia ya está registrado';
                    break;
                case 'eps_uk_name_eps':
                    errorMessage = 'El nombre de la EPS ya está registrado';
                    break;
                case 'estatemeu_uk_name_userstatus':
                    errorMessage = 'El nombre del estado del usuario ya está registrado';
                    break;
                case 'doctype_uk_document_type':
                    errorMessage = 'El nombre del tipo de documento ya está registrado';
                    break;
                case 'userstatu_uk_name_userstatus':
                    errorMessage = 'El nombre del estado del usuario ya está registrado';
                    break;

            }

            return res.status(400).json({ error: errorMessage });

        }

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