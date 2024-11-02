import { useEffect, useState } from "react";
import { useSignIn } from '@clerk/nextjs';
import { useRouter } from "next/router";

import Link from "next/link";

import Input from "./inputs/Input";
import Button from "./buttons/Button";
import Loader from "./Loader";

// Import Icons
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";

function FormLogin() {
  const { isLoaded, signIn, setActive } = useSignIn();
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
          identifier: loginUsername.trim(),
          password: password.trim(),
        });

        if (response.status === 'complete') {
          console.log("Inicio de sesión exitoso:", response);
          await setActive({ session: response.createdSessionId });
          router.push('/');
        }
        else {
          setLoginStatus('Error en el proceso de inicio de sesión.');
        }
      } else {
        setLoginStatus("Por favor, ingrese sus credenciales");
        setStatusHolder("absolute");
      }
    } catch (error) {
      console.error("Error en Clerk:", error?.errors || error);
      setLoginStatus("Error al iniciar sesión");
      setStatusHolder("absolute");
    }
  };


  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-70 flex flex-col gap-2 mx-auto overflow-y-hidden">
      <div className={`${statusHolder} text-neutral-white p-2.5 mt-[-44px] bg-accent-red text-sm rounded text-center h-10`}>
        {loginStatus}
      </div>

      <div className="space-y-2">
        <Input
          label="Nombre de Usuario"
          id="username"
          placeholder="Ingresa tu usuario"
          required={true}
          onChange={(e) => setLoginUsername(e.target.value.trim())}
          Icon={FaUserShield}
        />
      </div>

      <div className="space-y-2">
        <Input
          label="Contraseña"
          id="password"
          placeholder="Ingresa tu contraseña"
          required={true}
          type="password"
          autocomplete="current-password"
          onChange={(e) => setPassword(e.target.value.trim())}
          Icon={BsFillShieldLockFill}
        />
      </div>

      <Button
        type="submit"
        onClick={handleLogin}
        buttonText="Ingresar"
        justify="between"
        Icon={AiOutlineSwapRight}
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