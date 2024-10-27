import { useState } from 'react'

import '../../global.css'

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        studentCode: '',
        phoneNumber: '',
        email: '',
        birthDate: '',
        eps: '',
        bloodType: '',
        allergies: '',
        medications: [],
        emergencyContact: {
            fullName: '',
            relationship: '',
            contactNumber: ''
        },
        informedConsent: null,
        parentalAuthorization: null
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleMedicationChange = (index, e) => {
        const { name, value } = e.target
        const newMedications = [...formData.medications]
        newMedications[index] = {
            ...newMedications[index],
            [name]: value
        }
        setFormData({
            ...formData,
            medications: newMedications
        })
    }

    const handleFileChange = (e) => {
        const { name, files } = e.target
        setFormData({
            ...formData,
            [name]: files[0]
        })
    }

    const addMedication = () => {
        setFormData({
            ...formData,
            medications: [...formData.medications, { name: '', dosage: '', reason: '' }]
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle form submission
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded">
            <div className="mb-4">
                <label className="block text-gray-700">Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Student Code</label>
                <input type="text" name="studentCode" value={formData.studentCode} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Phone Number</label>
                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Birth Date</label>
                <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Eps</label>
                <input type="text" name="eps" value={formData.eps} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Blood Type</label>
                <select name="bloodType" value={formData.bloodType} onChange={handleChange} required className="w-full px-3 py-2 border rounded">
                    <option value="">Select</option>
                    <option value="A+">A+</option>
                    <option value="B+">B+</option>
                    <option value="AB+">AB+</option>
                    <option value="O+">O+</option>
                    <option value="A-">A-</option>
                    <option value="B-">B-</option>
                    <option value="AB-">AB-</option>
                    <option value="O-">O-</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Allergies</label>
                <input type="text" name="allergies" value={formData.allergies} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Prescribed Medications</label>
                {formData.medications.map((medication, index) => (
                    <div key={index} className="mb-2">
                        <input type="text" name="name" placeholder="Medication Name" value={medication.name} onChange={(e) => handleMedicationChange(index, e)} className="w-full px-3 py-2 border rounded mb-2" />
                        <input type="text" name="dosage" placeholder="Dosage" value={medication.dosage} onChange={(e) => handleMedicationChange(index, e)} className="w-full px-3 py-2 border rounded mb-2" />
                        <input type="text" name="reason" placeholder="Reason for Prescription" value={medication.reason} onChange={(e) => handleMedicationChange(index, e)} className="w-full px-3 py-2 border rounded" />
                    </div>
                ))}
                <button type="button" onClick={addMedication} className="px-4 py-2 bg-blue-500 text-white rounded">Add Medication</button>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Emergency Contact</label>
                <input type="text" name="fullName" placeholder="Full Name" value={formData.emergencyContact.fullName} onChange={(e) => handleChange(e, 'emergencyContact')} required className="w-full px-3 py-2 border rounded mb-2" />
                <input type="text" name="relationship" placeholder="Relationship" value={formData.emergencyContact.relationship} onChange={(e) => handleChange(e, 'emergencyContact')} required className="w-full px-3 py-2 border rounded mb-2" />
                <input type="text" name="contactNumber" placeholder="Contact Number" value={formData.emergencyContact.contactNumber} onChange={(e) => handleChange(e, 'emergencyContact')} required className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Attach Informed Consent</label>
                <input type="file" name="informedConsent" onChange={handleFileChange} className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Attach Parental Authorization (for minors)</label>
                <input type="file" name="parentalAuthorization" onChange={handleFileChange} className="w-full px-3 py-2 border rounded" />
            </div>
            <button type="submit" className="w-full px-4 py-2 bg-green-500 text-white rounded">Register</button>
        </form>
    )
}

export default Register