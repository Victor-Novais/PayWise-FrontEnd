import { useEffect, useRef } from "react";
import CloseIcon from "../../assets/close-icon.svg";
import useModalContext from "../../hooks/useModalContext";
import "./ChargeInfo.css";
import chargeIcon from "../../assets/charge-icon.svg"

export default function ChargeInfo() {
  const ref = useRef();
  const charge = JSON.parse(localStorage.getItem("currentCharge"));
  const {
    ChargeInfoOpened,
    setChargeInfoOpened,
  } = useModalContext();

  useEffect(() => {
    if (ChargeInfoOpened) {

      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [ChargeInfoOpened]);



  return (
    <>
      {ChargeInfoOpened && (
        <dialog ref={ref}>
          <img
            className="delete-charge-warning"
            src={CloseIcon}
            alt="close"
            onClick={() => setChargeInfoOpened(false)}
          />
          <div className="menu-modal-infoCharge">
            <img src={chargeIcon} alt="" />
            <h1>Detalhe da Cobrança</h1>
          </div>

          <div className="chargeInfoContainer">

            <div className="chargeInfo">
              <p className="iformChargep">Nome</p>
              <span>{charge.client_name}</span>
            </div>

            <div className="chargeInfo">
              <p>Descrição</p>
              <span>{charge.description}</span>
            </div>

            <div className="subInfos">
              <div>
                <p>Vencimento</p>
                <span>{charge.due_date_pt}</span>
              </div>

              <div>
                <p>Valor</p>
                <span>{charge.amount_pt}</span>
              </div>

            </div>

            <div className="subInfos">
              <div>
                <p>ID cobranças</p>
                <span>{charge.id_pt}</span>
              </div>

              <div>
                <p>Status</p>
                <span className={charge.status_pt}>{charge.status_pt}</span>
              </div>

            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
