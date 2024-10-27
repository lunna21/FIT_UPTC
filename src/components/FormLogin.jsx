import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import InputAuth from "./inputs/InputAuth";
import ButtonPrimary from "./buttons/ButtonPrimary";

// Import Icons
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";


function FormLogin() {
    const [loginStatus, setLoginStatus] = useState("");
    const [statusHolder, setStatusHolder] = useState("hidden");
    const [loginUsername, setLoginUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (loginStatus !== "") {
          setStatusHolder("block");
          setTimeout(() => {
            setStatusHolder("hidden");
            setLoginStatus("");
          }, 2500);
        }
      }, [loginStatus]);
    
      const onSubmit = () => {
        setLoginUsername("");
        setPassword("");
      };

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
          // Add your authentication logic here
          // Example:
          // const response = await signIn('credentials', {
          //   username: loginUsername,
          //   password: password,
          //   redirect: false,
          // });
    
          // Temporary simulation of login
          if (loginUsername && password) {
            router.push("/dashboard");
          } else {
            setLoginStatus("Por favor, ingrese sus credenciales");
            setStatusHolder("block");
          }
        } catch (error) {
          setLoginStatus("Error al iniciar sesión");
          setStatusHolder("block");
        }
      };

    return (
        <form onSubmit={onSubmit} className="w-70 flex flex-col gap-2 mx-auto overflow-y-hidden">
            <div className={`${statusHolder} text-neutral-white p-2.5 absolute mt-[-44px] bg-accent-red text-sm rounded text-center h-10`}>
                {loginStatus}
            </div>

            <div className="space-y-2">
                <InputAuth 
                  label="Nombre de Usuario" 
                  id="username"
                  placeholder="Ingresa tu usuario"
                  required={true}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  IconAuth={FaUserShield}
                />
            </div>

            <div className="space-y-2">
                <InputAuth 
                  label="Contraseña"
                  id="password"
                  placeholder="Ingresa tu contraseña"
                  required={true}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  IconAuth={BsFillShieldLockFill}
                />
            </div>

            <ButtonPrimary 
                onClick={handleLogin}
                buttonText="Ingresar"
                IconButton={AiOutlineSwapRight}
            />

            <span className="text-sm text-neutral-gray-medium text-center">
                ¿Olvidó su contraseña?{" "}
                <Link href="/forgot-password" className="underline cursor-pointer opacity-100">
                    Click aquí
                </Link>
            </span>
        </form>
    )
}

export default FormLogin;