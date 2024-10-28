import { useEffect, useState } from "react";
import { useSignIn } from '@clerk/nextjs';
import { useRouter } from "next/router";

import Link from "next/link";

import InputAuth from "./inputs/InputAuth";
import ButtonPrimary from "./buttons/ButtonPrimary";

// Import Icons
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";

function FormLogin() {
  const { signIn } = useSignIn();
  const router = useRouter();
  const [loginStatus, setLoginStatus] = useState("");
  const [statusHolder, setStatusHolder] = useState("hidden");
  const [loginUsername, setLoginUsername] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
    if (loginStatus !== "") {
      setStatusHolder("absolute");
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
      if (loginUsername && password) {
        const response = await signIn.create({
          identifier: loginUsername.trim(), // Elimina espacios adicionales
          password: password.trim()
        })

        if (response.status === 'complete') 
          router.reload();
        else 
          setLoginStatus('Error en el proceso de inicio de sesión.');
      } else {
        setLoginStatus("Por favor, ingrese sus credenciales");
        setStatusHolder("absolute");
      }
    } catch (error) {
      console.error(error);
      setLoginStatus("Error al iniciar sesión");
      setStatusHolder("absolute");
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-70 flex flex-col gap-2 mx-auto overflow-y-hidden">
      <div className={`${statusHolder} text-neutral-white p-2.5 mt-[-44px] bg-accent-red text-sm rounded text-center h-10`}>
        {loginStatus}
      </div>

      <div className="space-y-2">
        <InputAuth
          label="Nombre de Usuario"
          id="username"
          placeholder="Ingresa tu usuario"
          required={true}
          onChange={(e) => setLoginUsername(e.target.value.trim())}
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
          onChange={(e) => setPassword(e.target.value.trim())}
          IconAuth={BsFillShieldLockFill}
        />
      </div>

        <ButtonPrimary
          type="submit"
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