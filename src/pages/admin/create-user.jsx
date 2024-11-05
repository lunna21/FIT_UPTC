import { useState } from "react";
import CheckUserRegister from "@/components/CheckUserRegister";
import ValidationInput from "@/components/inputs/InputValidation";
import Button from "@/components/buttons/Button";
import ProgressLine from "@/components/ProgressLine";

const CreateUser = () => {
    const [formValues, setFormValues] = useState({
        numberDocument: '',
        typeDocument: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    });
    const [isValidated, setIsValidated] = useState("no");
    const [countFillObligatory, setCountFillObligatory] = useState(1);
    const [obligatoryFields, setObligatoryFields] = useState(['numberDocument', 'typeDocument', 'firstName', 'lastName', 'email', 'phone']);
    const [obligatoryFieldsCheck, setObligatoryFieldsCheck] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <div className="h-screen w-full flex items-center justify-center">
            <div className="h-4/5 flex flex-col w-auto mx-auto justify-between rounded-lg overflow-auto bg-neutral-gray-light shadow-lg">
                <div className="flex flex-col gap-6 p-3 justify-between">
                    <ProgressLine
                        lineColor="primary"
                        step={countFillObligatory}
                        maxSteps={obligatoryFields.length}
                        
                    />
                    <p className="text-red-600 text-sm mt-4 ml-8 text-left">
                        Los campos con (*) son campos obligatorios.
                    </p>
                    <form className="grid grid-cols-2 gap-2 p-4" onSubmit={handleSubmit}>
                        <CheckUserRegister
                            valueNumberDocument={formValues.numberDocument}
                            valueTypeDocument={formValues.typeDocument}
                            handleChange={handleChange}
                            setIsValidated={setIsValidated}
                        />
                        {isValidated === 'yes' && (
                            <>
                                <ValidationInput
                                    label="First Name (*)"
                                    name="firstName"
                                    value={formValues.firstName}
                                    onChange={handleChange}
                                    type="text"
                                    required
                                />
                                <ValidationInput
                                    label="Last Name (*)"
                                    name="lastName"
                                    value={formValues.lastName}
                                    onChange={handleChange}
                                    type="text"
                                    required
                                />

                                <ValidationInput
                                    label="Email"
                                    name="email"
                                    value={formValues.email}
                                    onChange={handleChange}
                                    type="email"
                                    required
                                />

                                <ValidationInput
                                    label="Phone"
                                    name="phone"
                                    value={formValues.phone}
                                    onChange={handleChange}
                                    type="tel"
                                    required
                                />


                                <div className='mt-4 col-span-2'>
                                    <Button
                                        buttonText='Create User'
                                        type='submit'
                                    />
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateUser;