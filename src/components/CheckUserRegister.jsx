// depends on the register.css stylesheet

import Button from '@/components/buttons/Button'

import { FaAddressCard } from 'react-icons/fa'
import { MdOutlinePermIdentity, MdVerified } from 'react-icons/md'

function CheckUserRegister({ valueTypeDocument, valueNumberDocument, handleChange, checkUserExists }) {
    return (
        <>
            <div className="register-inputDiv" style={{ padding: '0.5rem' }}>
                <label htmlFor="typeDocument">Tipo de Documento (*)</label>
                <div className="register-input register-flex">
                    <FaAddressCard className="register-icon" />
                    <select id="typeDocument" name='typeDocument' required value={valueTypeDocument} onChange={handleChange} className={`select-input ${valueTypeDocument ? 'filled' : ''}`}  >
                        <option value="">Selecciona un tipo de documento</option>
                        <option value="CC">Cédula de Ciudadanía</option>
                        <option value="TI">Tarjeta de Identidad</option>
                        <option value="CE">Cédula de Extranjería</option>
                    </select>
                </div>
            </div>
            <div className="register-inputDiv">
                <label htmlFor="numdoc">Número de documento (*)</label>
                <div className="register-input register-flex">
                    <MdOutlinePermIdentity className="register-icon" />
                    <input type="number" name="numberDocument" placeholder="Ingresa tu número de documento" value={valueNumberDocument} onChange={handleChange} required maxLength={10} />
                </div>
            </div>

            <div style={{ gridColumn: 'span 2' }}>
                <Button
                    buttonText="Siguiente"
                    colSpan={2}
                    onClick={checkUserExists}
                    Icon={MdVerified}
                    disabled={!valueTypeDocument || !valueNumberDocument}
                />
            </div>
        </>
    )
}

export default CheckUserRegister;