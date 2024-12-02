import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/users/details:
 *   get:
 *     summary: Retrieve user details
 *     description: Retrieve user details based on query parameters. If `code` is provided, fetch details for the specific user with that code. If `role` is provided, fetch details for users with that role. If neither is provided, fetch details for all users.
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         description: The student code to filter users by.
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: The role to filter users by (e.g., "STU" for students, "EMP" for employees).
 *     responses:
 *       200:
 *         description: A list of user details.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idUser:
 *                     type: integer
 *                     description: The user ID.
 *                   idPerson:
 *                     type: integer
 *                     description: The person ID.
 *                   documentNumberPerson:
 *                     type: string
 *                     description: The document number of the person.
 *                   idRoleUser:
 *                     type: string
 *                     description: The role ID of the user.
 *                   nameUser:
 *                     type: string
 *                     description: The name of the user.
 *                   emailUser:
 *                     type: string
 *                     description: The email of the user.
 *                   passwordUser:
 *                     type: string
 *                     description: The password of the user.
 *                   creationDateUser:
 *                     type: string
 *                     format: date-time
 *                     description: The creation date of the user.
 *                   roleUser:
 *                     type: object
 *                     description: The role details of the user.
 *                     properties:
 *                       idRoleUser:
 *                         type: string
 *                         description: The role ID.
 *                       nameRoleUser:
 *                         type: string
 *                         description: The role name.
 *                   historyUserStatus:
 *                     type: array
 *                     description: The history of user statuses.
 *                     items:
 *                       type: object
 *                       properties:
 *                         idHistoryUserStatus:
 *                           type: integer
 *                           description: The history user status ID.
 *                         idUser:
 *                           type: integer
 *                           description: The user ID.
 *                         idUserStatus:
 *                           type: integer
 *                           description: The user status ID.
 *                         changeDate:
 *                           type: string
 *                           format: date-time
 *                           description: The date of the status change.
 *                         changeReason:
 *                           type: string
 *                           description: The reason for the status change.
 *                   userAudit:
 *                     type: object
 *                     description: The audit details of the user.
 *                   person:
 *                     type: object
 *                     description: The person details.
 *                     properties:
 *                       idPerson:
 *                         type: integer
 *                         description: The person ID.
 *                       documentNumberPerson:
 *                         type: string
 *                         description: The document number of the person.
 *                       idDocumentType:
 *                         type: integer
 *                         description: The document type ID.
 *                       firstNamePerson:
 *                         type: string
 *                         description: The first name of the person.
 *                       lastNamePerson:
 *                         type: string
 *                         description: The last name of the person.
 *                       phoneNumberPerson:
 *                         type: string
 *                         description: The phone number of the person.
 *                       birthdatePerson:
 *                         type: string
 *                         format: date
 *                         description: The birthdate of the person.
 *                       createdPersonBy:
 *                         type: string
 *                         description: The creator of the person record.
 *                       createdPersonAt:
 *                         type: string
 *                         format: date-time
 *                         description: The creation date of the person record.
 *                       updatedPersonBy:
 *                         type: string
 *                         description: The updater of the person record.
 *                       updatedPersonAt:
 *                         type: string
 *                         format: date-time
 *                         description: The update date of the person record.
 *                   inscriptionDetails:
 *                     type: array
 *                     description: The inscription details of the person.
 *                     items:
 *                       type: object
 *                       properties:
 *                         idInscriptionDetail:
 *                           type: integer
 *                           description: The inscription detail ID.
 *                         idStudent:
 *                           type: integer
 *                           description: The student ID.
 *                         idEstatement:
 *                           type: integer
 *                           description: The estatement ID.
 *                         studentCode:
 *                           type: string
 *                           description: The student code.
 *                         idEmergencyContact:
 *                           type: integer
 *                           description: The emergency contact ID.
 *                         idEps:
 *                           type: integer
 *                           description: The EPS ID.
 *                         bloodType:
 *                           type: string
 *                           description: The blood type.
 *                         idAllergy:
 *                           type: integer
 *                           description: The allergy ID.
 *                         urlConsent:
 *                           type: string
 *                           description: The URL of the consent form.
 *                         createdAtInscriptionDetail:
 *                           type: string
 *                           format: date-time
 *                           description: The creation date of the inscription detail.
 *                         allergy:
 *                           type: object
 *                           description: The allergy details.
 *                         emergencyContact:
 *                           type: object
 *                           description: The emergency contact details.
 *                           properties:
 *                             idEmergencyContact:
 *                               type: integer
 *                               description: The emergency contact ID.
 *                             fullNameEmergencyContact:
 *                               type: string
 *                               description: The full name of the emergency contact.
 *                             relationshipEmergencyContact:
 *                               type: string
 *                               description: The relationship of the emergency contact.
 *                             phoneNumberEmergencyContact:
 *                               type: string
 *                               description: The phone number of the emergency contact.
 *                         eps:
 *                           type: object
 *                           description: The EPS details.
 *                           properties:
 *                             idEps:
 *                               type: integer
 *                               description: The EPS ID.
 *                             nameEps:
 *                               type: string
 *                               description: The name of the EPS.
 *                         estatement:
 *                           type: object
 *                           description: The estatement details.
 *                           properties:
 *                             idEstatement:
 *                               type: integer
 *                               description: The estatement ID.
 *                             nameEstatement:
 *                               type: string
 *                               description: The name of the estatement.
 *                         medications:
 *                           type: array
 *                           description: The prescription medications.
 *                           items:
 *                             type: object
 *                             properties:
 *                               idPrescriptionMedication:
 *                                 type: integer
 *                                 description: The prescription medication ID.
 *                               namePrescriptionMedication:
 *                                 type: string
 *                                 description: The name of the prescription medication.
 *                               dosePrescriptionMedication:
 *                                 type: string
 *                                 description: The dose of the prescription medication.
 *                               recipeReason:
 *                                 type: string
 *                                 description: The reason for the prescription.
 *       400:
 *         description: Invalid role provided.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
export default async function getHandler(req, res) {
  const { role, code } = req.query;

  if (code) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          person_user_id_personToperson: {
            inscription_detail: {
              some: {
                student_code: code,
              },
            },
          },
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
        return res.status(404).json({ message: "Usuario no encontrado." });
      }

      const person = user.person_user_id_personToperson;
      const inscriptionDetails = person?.inscription_detail || [];

      const userDetails = {
        idUser: user.id_user,
        idPerson: user.id_person,
        documentNumberPerson: user.document_number_person,
        idRoleUser: user.id_role_user,
        nameUser: user.name_user,
        emailUser: user.email_user,
        passwordUser: user.password_user,
        creationDateUser: user.creation_date_user,
        roleUser: user.role_user_user_id_role_userTorole_user && {
          idRoleUser: user.role_user_user_id_role_userTorole_user.id_role_user,
          nameRoleUser: user.role_user_user_id_role_userTorole_user.name_role_user,
        },
        historyUserStatus: user.history_user_status_history_user_status_id_userTouser.map(
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
            relationshipEmergencyContact: detail.emergency_contact.relationship_emecont,
            phoneNumberEmergencyContact: detail.emergency_contact.phone_number_emecont,
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
            namePrescriptionMedication: presmed.prescription_medication.name_presmed,
            dosePrescriptionMedication: presmed.prescription_medication.dose_persmed,
            recipeReason: presmed.prescription_medication.recipe_reason,
          })),
        })),
      };

      return res.status(200).json(userDetails);
    } catch (error) {
      console.error("Error fetching user details by code:", error);
      return res.status(500).json({ message: "Error fetching user details by code" });
    }
  }
  else if (!role) {
    try {
      const users = await prisma.user.findMany({
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

      const userDetails = users.map((user) => {
        const person = user.person_user_id_personToperson;
        const inscriptionDetails = person?.inscription_detail || [];

        return {
          idUser: user.id_user,
          idPerson: user.id_person,
          documentNumberPerson: user.document_number_person,
          idRoleUser: user.id_role_user,
          nameUser: user.name_user,
          emailUser: user.email_user,
          passwordUser: user.password_user,
          creationDateUser: user.creation_date_user,
          roleUser: user.role_user_user_id_role_userTorole_user && {
            idRoleUser:
              user.role_user_user_id_role_userTorole_user.id_role_user,
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
              fullNameEmergencyContact:
                detail.emergency_contact.full_name_emecont,
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
              idPrescriptionMedication:
                presmed.prescription_medication.id_presmed,
              namePrescriptionMedication:
                presmed.prescription_medication.name_presmed,
              dosePrescriptionMedication:
                presmed.prescription_medication.dose_persmed,
              recipeReason: presmed.prescription_medication.recipe_reason,
            })),
          })),
        };
      });

      return res.status(200).json(userDetails);
    } catch (error) {
      console.error("Error fetching user details:", error);
      return res.status(500).json({ message: "Error al traer el usuario" });
    }
  } else if (role === "STU" || role === "EMP") {
    try {
      const students = await prisma.user.findMany({
        where: {
          id_role_user: role,
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

      const userDetails = students.map((student) => {
        const person = student.person_user_id_personToperson;
        const inscriptionDetails = person?.inscription_detail || [];
        return {
          idUser: student.id_user,
          idPerson: student.id_person,
          documentNumberPerson: student.document_number_person,
          idRoleUser: student.id_role_user,
          nameUser: student.name_user,
          passwordUser: student.password_user,
          creationDateUser: student.creation_date_user,
          emailUser: student.email_user,
          roleUser: student.role_user_user_id_role_userTorole_user && {
            idRoleUser:
              student.role_user_user_id_role_userTorole_user.id_role_user,
            nameRoleUser:
              student.role_user_user_id_role_userTorole_user.name_role_user,
          },
          historyUserStatus:
            student.history_user_status_history_user_status_id_userTouser.map(
              (status) => ({
                idHistoryUserStatus: status.id_history_user_status,
                idUser: status.id_user,
                idUserStatus: status.id_user_status,
                changeDate: status.change_date,
                changeReason: status.change_reason,
              })
            ),
          userAudit: student.user_audit_user_audit_id_userTouser,
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
              fullNameEmergencyContact:
                detail.emergency_contact.full_name_emecont,
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
              idPrescriptionMedication:
                presmed.prescription_medication.id_presmed,
              namePrescriptionMedication:
                presmed.prescription_medication.name_presmed,
              dosePrescriptionMedication:
                presmed.prescription_medication.dose_persmed,
              recipeReason: presmed.prescription_medication.recipe_reason,
            })),
          })),
        };
      });
      return res.status(200).json(userDetails);
    } catch (error) {
      console.error("Error fetching student details:", error);
      return res.status(500).json({ message: "Error fetching student details" });
    }
  } else {
    return res.status(400).json({ message: "Invalid role" });
  }
}