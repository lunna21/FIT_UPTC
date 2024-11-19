import { useState } from 'react'
import { Modal, ModalContent, ModalBody, ModalHeader, ModalFooter } from "@nextui-org/modal";

const TurnModal = ({ isOpen, onClose }) => {
    const [dismissable, setDismissable] = useState(true);

    return (
        <Modal
            isDismissable={dismissable}
            backdrop="opaque"
            isOpen={isOpen}
            onClose={onClose}
            radius="lg"
            classNames={{
                body: "py-6",
                backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                header: "border-b-[1px] border-[#292f46]",
                footer: "border-t-[1px] border-[#292f46]",
                closeButton: "hover:bg-white/5 active:bg-white/10",
            }}
            size="md"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex justify-between items-center border-b pb-2">
                            <h2 className="text-xl">Un titulo</h2>
                        </ModalHeader>
                        <ModalBody className="mt-4">
                            <form>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Label</label>
                                    <input type="text" className="w-full p-2 border rounded" />
                                </div>
                                <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Submit</button>
                            </form>
                        </ModalBody>
                        <ModalFooter className="flex justify-end space-x-2">
                            <button className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600" onClick={onClose}>
                                Close
                            </button>
                            <button className="bg-[#6f4ef2] text-white p-2 rounded hover:bg-[#5a3ecf]" onClick={onClose}>
                                Action
                            </button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default TurnModal;
