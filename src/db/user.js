
export async function getUserById(id) {
  try {
    const response = await fetch(`/api/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching user: ", error);
    throw error.message;
  }
}

export async function getUserByUsername(username) {
  try {
    const response = await fetch(`/api/users?username=${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw error;
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error.message;
  }
}

export async function getUserByCode(code) {
  try {
    const response = await fetch(`/api/users/details?code=${code}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw error;
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error.message;
  }
}

export async function updateMetadataUser({ role, status }) {
  try {
    const response = await fetch('/api/users/clerk', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role, status }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    return response.json();
  } catch (error) {
    console.error('Error updating user metadata:', error);
    throw error;
  }
}

export async function updateMetadataExternalUser({ id, role, status }) {
  try {
    const response = await fetch('/api/users/clerk', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, role, status }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    return response.json();
  } catch (error) {
    console.error('Error updating user metadata:', error);
    throw error;
  }
}

export async function addUserStudent(formData, url_consent) {
  try {
    let age = 0;
    if (formData.birthDate) {
      const today = new Date();
      const birthDate = new Date(formData.birthDate);
      let ageL = today.getFullYear() - birthDate.getFullYear();
      const month = today.getMonth() - birthDate.getMonth();
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        ageL--;
      }
      age = ageL;
    }
    const userData = {
      document_number_person: formData.numberDocument,
      id_role_user: 'STU', // Assuming the role is 'STU' for students
      password_user: formData.password, // Assuming password is part of formData
      email_user: formData.email,
      inscription_detail: {
        id_estatment_u: formData.programType,
        student_code: formData.studentCode,
        emergency_contact: {
          full_name_emecont: formData.emergencyContact.emergencyfullName,
          relationship_emecont: formData.emergencyContact.relationship,
          phone_number_emecont: formData.emergencyContact.contactNumber,
        },
        eps: formData.eps,
        blood_type: formData.bloodType,
        url_consent: url_consent,
        allergy: formData.allergies ? { name_allergy: formData.allergies } : null,
        medications: formData.medications.map(med => ({
          name_presmed: med.nameMedication,
          dose_persmed: med.dosage,
          recipe_reason: med.reason,
        })) || null,
      },
    };

    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    return response.json();
  } catch (error) {
    console.error('Error adding user:', error);
    throw error.message;
  }
}

export async function addUserWithRole(formData) {
  try {
    if (formData.role !== 'ADM' && formData.role !== 'EMP') {
      throw "El tipo de usuario no es válido";
    }

    const userData = {
      document_number_person: formData.numberDocument,
      id_role_user: formData.role,
      password_user: formData.password,
      email_user: formData.email,
    };

    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    return response.json();
  } catch (error) {
    console.error('Error adding user:', error);
    throw error.message;
  }
}

export async function getUserByRole(role) {
  try {
    const response = await fetch(`/api/users/details?role=${role}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching users by role:", error);
    throw error.message;
  }
}

export async function deleteUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    return response.json();
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

export async function addUserInClerk({ email, password, username }) {
  try {
    const response = await fetch('/api/users/clerk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, username }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw error;
    } 
    return response.json();
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
}

export async function getUserDetailById(id) {
  try {
    const response = await fetch(`/api/users/details/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw error;
    } 
    return response.json();
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error.message;
  }
}

export async function updateStatusUser({idUser, status, reason, idModifier}) {
  try {
    const response = await fetch(`/api/users/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idUser, status, reason, idModifier }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    return response.json();
  } catch (error) {
    console.error('Error updating user status:', error);
    throw error.message;
  }
}

export async function getUserByUsernameWithClerk(username) {
  try {
    const response = await fetch(`/api/users/clerk?username=${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error.message;
  }
}
