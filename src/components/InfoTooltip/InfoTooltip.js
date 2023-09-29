import "./InfoTooltip.css";
import resolve from "../../images/info_ok.svg";
import reject from "../../images/info_no.svg";

function InfoTooltip({
    isOpen,
    onClose,
    isSuccess,
    textIsSuccessTrue,
    textIsSuccessFalse,
}) {
    return (
        <div className={isOpen ? "info info_opened" : "info"} onClick={onClose}>
            <div className="info__container">
                <img
                    className="info__icon"
                    alt="Иконка"
                    src={isSuccess ? resolve : reject}
                ></img>
                <span className="info__text">
                    {isSuccess ? textIsSuccessTrue : textIsSuccessFalse}
                </span>
            </div>
        </div>
    );
}

export default InfoTooltip;
