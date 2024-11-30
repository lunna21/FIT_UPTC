import { Modal, ModalContent, ModalBody, ModalHeader } from "@nextui-org/modal";

import TableConfigTurns from '@/components/tables/TableConfigTurns';

const ConfigTurnsModal = ({
    isOpen,
    onClose,
}) => {

    return (
        <>
            <Modal
                size="5xl"
                isOpen={isOpen}
                onClose={onClose}
                className="bg-white"
                classNames={{
                    closeButton: "top-[8px] text-xl hover:bg-red-500 active:bg-red-700 text-white rounded-full p-2 transition duration-300 ease-in-out transform hover:scale-110",
                }}
            >
                {
                    <>
                        <ModalContent>
                            {
                                () => (
                                    <>
                                        <ModalHeader className="flex items-center justify-between gap-1 text-white bg-neutral-gray-dark">
                                            <h1>
                                                Configuración de turnos UPTC FIT
                                            </h1>
                                        </ModalHeader >
                                        <ModalBody className="overflow-y-auto overflow-x-hidden p-4">
                                            {/* Calendario semanal */}
                                            {
                                                isOpen && (
                                                    <TableConfigTurns />
                                                )
                                            }
                                            <div className="w-full h-20 text-transparent">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam aut exercitationem ipsum? Harum eius iusto blanditiis veritatis inventore quidem voluptas nam officia, modi perspiciatis aspernatur iure natus facilis vitae labore.
                                            </div>
                                        </ModalBody>

                                    </>
                                )}
                        </ModalContent >
                    </>
                }
            </Modal >
        </>
    );
};

export default ConfigTurnsModal;
