import { useState } from "react";
import { ModalContext } from "./ModalContext";

export default function ModalProvider({ children }) {
  const [showPopup, setShowPopup] = useState(false);
  const [modalEditChargesOpened, setEditChargesOpened] = useState(false);
  const [modalEditClientOpened, setmodalEditClientOpened] = useState(false);
  const [modalAddChargesOpened, setAddChargesOpened] = useState(false);
  const [modalAddClientOpened, setAddClientOpened] = useState(false);
  const [modalUserEditOpened, setUserEditOpened] = useState(false);
  const [ChargeInfoOpened, setChargeInfoOpened] = useState(false);
  const [modalChargeDeleteConfirmEditOpened, setChargeDeleteConfirmEditOpened] =
    useState(false);
  const [onEdiUserSuccess, setOnEditUserSuccess] = useState(false);
  return (
    <ModalContext.Provider
      value={{
        showPopup,
        setShowPopup,
        modalAddChargesOpened,
        setAddChargesOpened,
        modalEditClientOpened,
        setmodalEditClientOpened,
        modalEditChargesOpened,
        setEditChargesOpened,
        modalAddClientOpened,
        setAddClientOpened,
        modalUserEditOpened,
        setUserEditOpened,
        modalChargeDeleteConfirmEditOpened,
        setChargeDeleteConfirmEditOpened,
        ChargeInfoOpened,
        setChargeInfoOpened,
        onEdiUserSuccess,
        setOnEditUserSuccess,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
