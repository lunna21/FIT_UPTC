import Link from "next/link";
import Image from "next/image";

import FormLogin from "@/components/FormLogin";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";

import logo from '@/assets/logo.png'

import './login.css'

function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
        <div className="login-container h-[80vh] w-[60%] min-w-[660px] min-h-[545px] flex justify-between rounded-lg bg-neutral-gray-light">
            
            <div className="login-info relative flex-1 flex flex-col justify-center items-center p-6 text-center rounded-lg overflow-hidden">
                    <video
                            src='/video.mp4'
                            type='video/mp4' 
                            autoPlay 
                            muted 
                            loop 
                            className="absolute inset-0 w-full h-full object-cover"
                    />
                    
                    <div className="relative z-10">
                            <h1 className="text-[85px] font-extrabold text-white drop-shadow-lg">
                                    UPTC
                            </h1>
                            <h1 className="text-[65px] font-extrabold text-neutral-white drop-shadow-lg">
                                    FIT
                            </h1>
                            <p className="text-xl font-normal text-neutral-white p-4 drop-shadow-lg">
                                    ¡Lleva tu entrenamiento al siguiente nivel con nosotros!
                            </p>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 h-[60px] flex justify-between items-center px-4 bg-black/30 backdrop-blur rounded-lg">
                            <span className="text-neutral-white">¿No tienes una cuenta?</span>
                            <Link href="/register">
                                <ButtonPrimary buttonText="Regístrate"/>
                            </Link>
                    </div>
            </div>

            <div className="flex-1 flex flex-col justify-around gap-4 m-4 overflow-hidden">
                <div className="text-center py-4">
                    <div className="relative w-[160px] h-[100px] mx-auto mb-2">
                        <Image
                            src={logo}
                            alt="Logo"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-contain"
                        />
                    </div>
                    <h3 className="text-xl text-neutral-gray-dark font-bold mt-2">
                        ¡Inicia sesión y lleva el control al siguiente nivel!
                    </h3>
                </div>
                <FormLogin />
            </div>
        </div>
    </div>
  )
}

export default LoginPage;