import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getHandler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "User ID is required" });
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
      return res.status(404).json({ error: "User not found" });
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
    return res.status(500).json({ error: "Error fetching user details" });
  }
}
