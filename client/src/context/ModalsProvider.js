import React, { createContext, useState } from "react";

export const modalsContext = createContext("");

const ModalsProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");

    const values = {
        isModalOpen,
        setIsModalOpen,
        modalContent,
        setModalContent,
    };

    return <modalsContext.Provider value={values}>{children}</modalsContext.Provider>;
};

export default ModalsProvider;
