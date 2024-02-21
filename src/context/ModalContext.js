// ModalContext.js
import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  console.log(modal2);
  const [modal3, setModal3] = useState(false);
  
  const openModal1 = () => {
    setModal1(true);
  };

  const closeModal1 = () => {
    setModal1(false);
  };

  const openModal2 = () => {
    setModal2(true);
  };

  const closeModal2 = () => {
    setModal2(false);
  };
  const openModal3 = () => {
    setModal3(true);
  };

  const closeModal3 = () => {
    setModal3(false);
  };

  return (
    <ModalContext.Provider value={{ modal1, openModal1, closeModal1, modal2, openModal2, closeModal2, modal3, openModal3, closeModal3 }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};