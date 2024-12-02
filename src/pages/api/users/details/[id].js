import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/users/details/{id}:
 *   get:
 *     summary: Obtiene los detalles de un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Detalles del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idUser:
 *                   type: integer
 *                 idPerson:
 *                   type: integer
 *                 documentNumberPerson:
 *                   type: string
 *                 idRoleUser:
 *                   type: integer
 *                 nameUser:
 *                   type: string
 *                 passwordUser:
 *                   type: string
 *                 creationDateUser:
 *                   type: string
 *                   format: date-time
 *                 emailUser:
 *                   type: string
 *                 roleUser:
 *                   type: object
 *                   properties:
 *                     idRoleUser:
 *                       type: integer
 *                     nameRoleUser:
 *                       type: string
 *                 historyUserStatus:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idHistoryUserStatus:
 *                         type: integer
 *                       idUser:
 *                         type: integer
 *                       idUserStatus:
 *                         type: integer
 *                       changeDate:
 *                         type: string
 *                         format: date-time
 *                       changeReason:
 *                         type: string
 *                 userAudit:
 *                   type: object
 *                 person:
 *                   type: object
 *                   properties:
 *                     idPerson:
 *                       type: integer
 *                     documentNumberPerson:
 *                       type: string
 *                     idDocumentType:
 *                       type: integer
 *                     firstNamePerson:
 *                       type: string
 *                     lastNamePerson:
 *                       type: string
 *                     phoneNumberPerson:
 *                       type: string
 *                     emailPerson:
 *                       type: string
 *                     birthdatePerson:
 *                       type: string
 *                       format: date
 *                     createdPersonBy:
 *                       type: string
 *                     createdPersonAt:
 *                       type: string
 *                       format: date-time
 *                     updatedPersonBy:
 *                       type: string
 *                     updatedPersonAt:
 *                       type: string
 *                       format: date-time
 *                 inscriptionDetails:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idInscriptionDetail:
 *                         type: integer
 *                       idStudent:
 *                         type: integer
 *                       idEstatement:
 *                         type: integer
 *                       studentCode:
 *                         type: string
 *                       idEmergencyContact:
 *                         type: integer
 *                       idEps:
 *                         type: integer
 *                       bloodType:
 *                         type: string
 *                       idAllergy:
 *                         type: integer
 *                       urlConsent:
 *                         type: string
 *                       createdAtInscriptionDetail:
 *                         type: string
 *                         format: date-time
 *                       allergy:
 *                         type: object
 *                       emergencyContact:
 *                         type: object
 *                         properties:
 *                           idEmergencyContact:
 *                             type: integer
 *                           fullNameEmergencyContact:
 *                             type: string
 *                           relationshipEmergencyContact:
 *                             type: string
 *                           phoneNumberEmergencyContact:
 *                             type: string
 *                       eps:
 *                         type: object
 *                         properties:
 *                           idEps:
 *                             type: integer
 *                           nameEps:
 *                             type: string
 *                       estatement:
 *                         type: object
 *                         properties:
 *                           idEstatement:
 *                             type: integer
 *                           nameEstatement:
 *                             type: string
 *                       medications:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             idPrescriptionMedication:
 *                               type: integer
 *                             namePrescriptionMedication:
 *                               type: string
 *                             dosePrescriptionMedication:
 *                               type: string
 *                             recipeReason:
 *                               type: string
 *       400:
 *         description: El id del usuario es requerido
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error fetching user details
 */
export default async function getHandler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "El id del usuario es requerido" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id_user: parseInt(id),
      },
      include: {
        person_user_id_personToperson: {
          include: {
            inscription_detail: {
              include: {
                allergy: true,
                emergency_contact: true,
                eps: true,
                estatement_u: true,
                inscripdetail_presmed: {
                  include: {
                    prescription_medication: true,
                  },
                },
              },
            },
          },
        },
        role_user_user_id_role_userTorole_user: true,
        history_user_status_history_user_status_id_userTouser: true,
        user_audit_user_audit_id_userTouser: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const person = user.person_user_id_personToperson;
    const inscriptionDetails = person?.inscription_detail || [];

    const userDetails = {
      idUser: user.id_user,
      idPerson: user.id_person,
      documentNumberPerson: user.document_number_person,
      idRoleUser: user.id_role_user,
      nameUser: user.name_user,
      passwordUser: user.password_user,
      creationDateUser: user.creation_date_user,
      emailUser: user.email_user,
      roleUser: user.role_user_user_id_role_userTorole_user && {
        idRoleUser: user.role_user_user_id_role_userTorole_user.id_role_user,
        nameRoleUser:
          user.role_user_user_id_role_userTorole_user.name_role_user,
      },
      historyUserStatus:
        user.history_user_status_history_user_status_id_userTouser.map(
          (status) => ({
            idHistoryUserStatus: status.id_history_user_status,
            idUser: status.id_user,
            idUserStatus: status.id_user_status,
            changeDate: status.change_date,
            changeReason: status.change_reason,
          })
        ),
      userAudit: user.user_audit_user_audit_id_userTouser,
      person: {
        idPerson: person.id_person,
        documentNumberPerson: person.document_number_person,
        idDocumentType: person.id_document_type,
        firstNamePerson: person.first_name_person,
        lastNamePerson: person.last_name_person,
        phoneNumberPerson: person.phone_number_person,
        emailPerson: person.email_person,
        birthdatePerson: person.birthdate_person,
        createdPersonBy: person.created_person_by,
        createdPersonAt: person.created_person_at,
        updatedPersonBy: person.updated_person_by,
        updatedPersonAt: person.updated_person_at,
      },
      inscriptionDetails: inscriptionDetails.map((detail) => ({
        idInscriptionDetail: detail.id_insdetail,
        idStudent: detail.id_estu,
        idEstatement: detail.id_estatment_u,
        studentCode: detail.student_code,
        idEmergencyContact: detail.id_emecont,
        idEps: detail.id_eps,
        bloodType: detail.blood_type,
        idAllergy: detail.id_allergy,
        urlConsent: detail.url_consent,
        createdAtInscriptionDetail: detail.created_at_insdetail,
        allergy: detail.allergy,
        emergencyContact: detail.emergency_contact && {
          idEmergencyContact: detail.emergency_contact.id_emecont,
          fullNameEmergencyContact: detail.emergency_contact.full_name_emecont,
          relationshipEmergencyContact:
            detail.emergency_contact.relationship_emecont,
          phoneNumberEmergencyContact:
            detail.emergency_contact.phone_number_emecont,
        },
        eps: detail.eps && {
          idEps: detail.eps.id_eps,
          nameEps: detail.eps.name_eps,
        },
        estatement: detail.estatement_u && {
          idEstatement: detail.estatement_u.id_estatment_u,
          nameEstatement: detail.estatement_u.name_estatment_u,
        },
        medications: detail.inscripdetail_presmed.map((presmed) => ({
          idPrescriptionMedication: presmed.prescription_medication.id_presmed,
          namePrescriptionMedication:
            presmed.prescription_medication.name_presmed,
          dosePrescriptionMedication:
            presmed.prescription_medication.dose_persmed,
          recipeReason: presmed.prescription_medication.recipe_reason,
        })),
      })),
    };

    return res.status(200).json(userDetails);
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).json({ message: "Error fetching user details" });
  }
}
