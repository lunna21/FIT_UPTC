// depends on the register.css stylesheet
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/assets/logo.png'

import Button from '@/components/buttons/Button'

import { AiOutlineSwapRight } from "react-icons/ai";

function HeaderRegister() {
    return (
        <div className="register-headerDiv">
            <Image priority src={logo} alt="Logo" className='register-image' />
            <h3 className='hidden-responsive'>¡Dejános conocerte!</h3>
            <div className="register-footerDiv register-flex">
                <Link href='/login' className='register-a'>
                    <span className="text-gray-dark">¿Ya tienes una cuenta?</span>
                    <Button
                        buttonText="Ingresar"
                        Icon={AiOutlineSwapRight}
                        sizeHeight='h-10'
                        justify='between'
                    />
                </Link>
            </div>
        </div>
    )
}

export default HeaderRegister;