import { useEffect, useState } from "react";
import { useSignIn } from '@clerk/nextjs';
import { useRouter } from "next/router";

import Link from "next/link";

import ValidationInput from "./inputs/InputValidation";
import Button from "./buttons/Button";
import Loader from "./Loader";

// Import Icons
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";

function FormLogin() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [isLoading, setIsLoading] = useState(false);
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
      }, 3000);
    }
  }, [loginStatus]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (loginUsername && password) {
        const response = await signIn.create({
          identifier: loginUsername.trim(),
          password: password.trim(),
        });

        if (response.status === 'complete') {
          console.log("Inicio de sesión exitoso:", response);
          await setActive({ session: response.createdSessionId });
          setIsLoading(false);
          router.push('/');
        }
        else {
          setLoginStatus("Error en inicio de sesión");
          setStatusHolder("absolute");
          setIsLoading(false);
        }
      } else {
        setLoginStatus("Por favor, ingrese sus credenciales");
        setIsLoading(false);
        setStatusHolder("absolute");
      }
    } catch (error) {
      console.error("Error en Clerk:", error?.errors || error);
      if (error.errors[0].code === "form_identifier_not_found" || error.errors[0].code === "form_password_incorrect") {
        setLoginStatus("Por favor verifica el usuario y contraseña y vuelve a intentar.");
      } else
        setLoginStatus("Error al iniciar sesión");

      setStatusHolder("absolute");
      setIsLoading(false);
    }
  };


  if (!isLoaded || isLoading) {
    return (
      <div className="min-h-screen min-w-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <form className="max-w-72 min-w-72 flex flex-col gap-2 mx-auto overflow-y-hidden">
      <div className={`${statusHolder} top-auto max-w-[260px] text-neutral-white p-2.5 mt-[-44px] bg-accent-red text-sm rounded text-center`}>
        {loginStatus}
      </div>

      <ValidationInput
        className="mt-2"
        label="Nombre de Usuario"
        id="username"
        placeholder="Ingresa tu usuario"
        required={true}
        onChange={(e) => setLoginUsername(e.target.value.trim())}
        Icon={FaUserShield}
        name="username"
        value={loginUsername}
      />

      <ValidationInput
        className="mt-2"
        label="Contraseña"
        id="password"
        placeholder="Ingresa tu contraseña"
        required={true}
        type="password"
        autocomplete="current-password"
        onChange={(e) => setPassword(e.target.value.trim())}
        Icon={BsFillShieldLockFill}
        name="password"
        value={password}
      />


      <Button
        type="submit"
        onClick={handleLogin}
        buttonText="Ingresar"
        justify="between"
        Icon={AiOutlineSwapRight}
      />

      <span className="text-sm text-neutral-gray-medium text-center">
        ¿Olvidó su contraseña?{" "}
        <Link href="/recover" className="underline cursor-pointer opacity-100">
          Presiona aquí
        </Link>
      </span>
    </form>
  )
}

export default FormLogin;