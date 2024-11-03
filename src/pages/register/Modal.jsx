import React from 'react';
import Button from '@/components/buttons/Button';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { RiCloseCircleFill } from "react-icons/ri";

const Modal = ({ isOpen, onClose, onAccept }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-4xl h-[80vh] overflow-y-auto mt-8 relative z-50">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-accent-red z-50"
          onClick={onClose}
          aria-label="Close"
        >
          <RiCloseCircleFill size={40} />
        </button>
        <h1 className="text-primary text-center text-3xl font-bold mb-4">Términos y Condiciones</h1>
        <div className="mb-4 text-gray-700 leading-relaxed space-y-4">
          <section>
            <h2 className="text-primary text-2xl font-semibold mb-4">Alcance y uso del sitio web</h2>
            <p className="text-justify">
              Al acceder al sitio web de <span className="text-primary font-semibold">UPTC FIT</span>, los usuarios aceptan los términos y condiciones de uso.
              Este sitio proporciona servicios de gestión para el Centro de Acondicionamiento Físico para estudiantes de la sede central de la UPTC.
              Todos los contenidos del sitio (documentos, imágenes, videos) son propiedad de UPTC FIT.
            </p>
          </section>

          <section>
            <h2 className="text-primary text-2xl font-semibold mb-4">Derechos y responsabilidades del usuario</h2>
            <ul className="list-disc ml-5">
              <li>El usuario será responsable de cualquier uso indebido, anormal o ilícito que haga del sitio web y sus contenidos.</li>
              <li>Al ingresar sus datos en el sitio, el usuario acepta las políticas de tratamiento de datos de la UPTC.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-primary text-2xl font-semibold mb-4">Política de privacidad y tratamiento de datos</h2>
            <p className="text-justify mb-4">
              La UPTC, como responsable del tratamiento de datos personales, cumple con la Ley 1581 de 2012 y el Decreto 1377 de 2013, asegurando la protección de los datos necesarios para su misión.<br />
            </p>
            <p className="text-justify mb-4">
              Los datos proporcionados en este formulario serán utilizados conforme a la política de protección de datos establecida en la Resolución No. 3842 de 2013.
            </p>
            <p className="text-justify mb-4">
              Para más detalles, consulte la política de tratamiento de datos en el siguiente enlace:
              <br />
              <a
                className="text-primary font-semibold underline hover:text-primary-dark"
                href="http://www.uptc.edu.co/gel/habeas_data/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Política de Tratamiento y Protección de Datos Personales
              </a>
            </p>
            <p className="text-justify mb-4">
              Al enviar su información, el usuario autoriza expresamente su uso para procesar su inscripción o registro en eventos académicos de la Universidad. Esta información será utilizada únicamente para fines organizacionales e institucionales.
            </p>
          </section>
        </div>

        <div className="flex justify-center w-full gap-4 mt-4">
          <div className="items-center">
          <Button
            buttonText="Aceptar"
            Icon={IoIosCheckmarkCircle}
            onClick={() => {
              onAccept();
              onClose();
            }}
            sizeHeight="py-3"
            sizeWidth="px-6"
          />
          </div>
          <div className="items-center">
          <Button
            buttonText="Cerrar"
            Icon={RiCloseCircleFill}
            onClick={onClose}
            sizeHeight="py-3"
            sizeWidth="px-6"
          />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
