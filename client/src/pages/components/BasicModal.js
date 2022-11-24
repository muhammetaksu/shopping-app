import React, { useContext } from "react";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { modalsContext } from "../../context/ModalsProvider";

const BasicModal = () => {
    const {
        isModalOpen,
        setIsModalOpen,

        modalContent,
        setModalContent,
    } = useContext(modalsContext);

    const navigate = useNavigate();

    const handleOk = () => {
        navigate("/login");
        setIsModalOpen(false);
        setModalContent("");
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setModalContent("");
    };
    return (
        <>
            <Modal
                centered
                title={"Alert!"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Login"
            >
                <p>{modalContent}</p>
            </Modal>
        </>
    );
};
export default BasicModal;
