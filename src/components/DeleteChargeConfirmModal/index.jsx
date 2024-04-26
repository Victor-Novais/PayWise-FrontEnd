import { enqueueSnackbar } from "notistack";
import { useEffect, useRef } from "react";
import CloseIcon from "../../assets/close-icon.svg";
import useModalContext from "../../hooks/useModalContext";
import WarningIcon from "../../assets/warning-icon.svg";
import { api } from "../../services/api";
import "./DeleteChargeConfirmModal.css";

export default function DeleteChargeConfirmModal() {
  const ref = useRef();

  const {
    modalChargeDeleteConfirmEditOpened,
    setChargeDeleteConfirmEditOpened,
  } = useModalContext();

  useEffect(() => {
    if (modalChargeDeleteConfirmEditOpened) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [modalChargeDeleteConfirmEditOpened]);

  async function handleConfirmDelete() {
    const charge = JSON.parse(localStorage.getItem("currentCharge"));

    try {
      const response = await api.delete(`/charges/${charge.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.status === 200) {
        enqueueSnackbar(response.data.message, { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    } finally {
      localStorage.removeItem("currentCharge");
      setChargeDeleteConfirmEditOpened(false);
    }
  }

  return (
    <>
      {modalChargeDeleteConfirmEditOpened && (
        <dialog ref={ref}>
          <img
            className="delete-charge-warning"
            src={CloseIcon}
            alt="close"
            onClick={() => {
              setChargeDeleteConfirmEditOpened(false);
              window.location.reload();
            }}
          />
          <div>
            <img src={WarningIcon} alt="aviso" className="warning" />
            <h4>Tem certeza que deseja excluir esta cobrança?</h4>
          </div>
          <div className="testes-btns">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => setChargeDeleteConfirmEditOpened(false)}
            >
              Não
            </button>
            <button
              type="button"
              className="btn-aplicar"
              onClick={handleConfirmDelete}
              style={{ width: "350px" }}
            >
              Sim
            </button>
          </div>
        </dialog>
      )}
    </>
  );
}
