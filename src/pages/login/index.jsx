import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

import logo from '../../assets/logo.png'

// Import Icons
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";

function LoginPage() {
  const [loginUsername, setLoginUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loginStatus, setLoginStatus] = useState("");
  const [statusHolder, setStatusHolder] = useState("hidden");

  // Commented Axios implementation for future reference
  /*
  const loginUser = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:3002/login", {
      UserloginName: loginUsername,
      UserPassword: password,
    })
      .then((response) => {
        if (response.data.message) {
          router.push("/");
          setLoginStatus("¡Credenciales No Existen, Registrate!");
        } else {
          router.push("/bill");
        }
      })
      .catch((error) => {
        console.error("Error al intentar ingresar:", error);
        setLoginStatus("Error de conexión. Inténtalo de nuevo más tarde.");
      });
  };
  */

  // Temporary login handler - replace with your authentication logic
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

  useEffect(() => {
    if (loginStatus !== "") {
      setStatusHolder("block");
      setTimeout(() => {
        setStatusHolder("hidden");
      }, 4000);
    }
  }, [loginStatus]);

  const onSubmit = () => {
    setLoginUsername("");
    setPassword("");
  };

return (
    <div className="min-h-screen w-full flex items-center justify-center">
        <div className="h-[80vh] w-[60%] min-w-[320px] min-h-[545px] flex justify-between rounded-lg bg-neutral-gray-light">
            
            <div className="relative flex-1 flex flex-col justify-center items-center p-6 text-center rounded-lg overflow-hidden">
                    <video 
                            src='/video.mp4'
                            type='video/mp4' 
                            autoPlay 
                            muted 
                            loop 
                            className="absolute inset-0 w-full h-full object-cover"
                    />
                    
                    <div className="relative z-10">
                            <h1 className="text-[85px] font-extrabold text-neutral-white drop-shadow-lg">
                                    GYM
                            </h1>
                            <h1 className="text-[65px] font-extrabold text-neutral-white drop-shadow-lg">
                                    FITUPTC
                            </h1>
                            <p className="text-xl font-normal text-neutral-white p-4 drop-shadow-lg">
                                    ¡Lleva tu entrenamiento al siguiente nivel con nosotros!
                            </p>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 h-[60px] flex justify-between items-center px-4 bg-black/30 backdrop-blur rounded-lg">
                            <span className="text-neutral-white">¿No tienes una cuenta?</span>
                            <Link href="/register">
                                    <button className="bg-primary-medium hover:bg-primary-light text-neutral-white hover:text-neutral-black px-6 py-3 rounded-lg font-normal transition-colors duration-300 h-11">
                                            Regístrate
                                    </button>
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
                            className="object-contain"
                            priority
                        />
                    </div>
                    <h3 className="text-xl text-neutral-gray-dark font-bold mt-2">
                        ¡Inicia sesión y lleva el control al siguiente nivel!
                    </h3>
                </div>

                <form onSubmit={onSubmit} className="w-70 flex flex-col gap-2 mx-auto overflow-y-hidden">
                    <div className={`${statusHolder} text-neutral-white p-2.5 absolute mt-[-44px] bg-accent-red text-sm rounded text-center h-10`}>
                        {loginStatus}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="username" className="block text-sm text-neutral-black font-normal">
                            Nombre de Usuario
                        </label>
                        <div className="flex items-center gap-2 p-4 bg-white rounded-lg h-1/2">
                            <FaUserShield className="text-neutral-gray-medium text-xl cursor-pointer" />
                            <input
                                type="text"
                                id="username"
                                placeholder="Ingresa tu usuario"
                                required
                                onChange={(e) => setLoginUsername(e.target.value)}
                                className="bg-transparent outline-none border-none w-full"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm text-neutral-black font-normal">
                            Contraseña
                        </label>
                        <div className="flex items-center gap-2 p-4 bg-white rounded-lg h-1/2">
                            <BsFillShieldLockFill className="text-neutral-gray-medium text-xl cursor-pointer" />
                            <input
                                type="password"
                                id="password"
                                placeholder="Ingresa tu contraseña"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-transparent outline-none border-none w-full"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        onClick={handleLogin}
                        className="flex items-center justify-center gap-20 w-full p-3 bg-primary-medium hover:bg-primary-light text-neutral-white hover:text-neutral-black text-base rounded-lg transition-colors duration-300 h-11"
                    >
                        <span>Ingresar</span>
                        <AiOutlineSwapRight className="text-2xl transition-transform duration-300 group-hover:translate-x-1" />
                    </button>

                    <span className="text-sm text-neutral-gray-medium text-center">
                        ¿Olvidó su contraseña?{" "}
                        <Link href="/forgot-password" className="underline cursor-pointer opacity-100">
                            Click aquí
                        </Link>
                    </span>
                </form>
            </div>
        </div>
    </div>
);
}

export default LoginPage;