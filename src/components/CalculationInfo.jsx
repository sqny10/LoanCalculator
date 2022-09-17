import {useContext, useState, useEffect, useRef} from 'react'
import AmountContext from "../context/AmountContext";
import PaymentPlanContext from "../context/PaymentPlanContext";
import TaxesContext from "../context/TaxesContext";
import Modal from "./Modal";

function CalculationInfo() {
    // Sperates the number and decimal parts of the number and places the thousand comma seperators 
    function setSeperator(decimalNumber){
        decimalNumber = decimalNumber.toFixed(2);
        const _parts = decimalNumber.toString().split(".");
        const numberPart = _parts[0];
        const decimalPart = _parts[1];
        const regexExpression = /\B(?=(\d{3})+(?!\d))/g;

        return numberPart.replace(regexExpression, ",") + (decimalPart ? "." + decimalPart : "");
    }

    // Required variables from contexts
    const {amount} = useContext(AmountContext);
    const {paymentPeriod, paymentRange, interestMultiplier} = useContext(PaymentPlanContext);
    const {taxesData} = useContext(TaxesContext);
    const {interest, kkdf, bsmv} = taxesData;

    // States and ref
    const [rows, setRows] = useState([]);
    const periodPaymentRef = useRef();
    const modalRef = useRef();

    useEffect(() => {
        // Calculates the period payment
        // Used formula => E = P * r * ((1 + r) ** n) / (((1 + r) ** n) - 1) 
        // E => EMI
        // P => Principal loan amount
        // r => interest rate on monthly basis (in this app => interest + kkdfRate + bsmvRate)
        // n => duration of the loan
        const kkdfRate = +interest * +kkdf / 100;
        const bsmvRate = +interest * +bsmv / 100;
        const totalRateIncludingTaxes = (+interest + kkdfRate + bsmvRate) * interestMultiplier;
        const _a = (1 + (totalRateIncludingTaxes / 100)) ** +paymentRange;
        const _b = _a - 1;
        let periodPayment = +amount * totalRateIncludingTaxes * _a / _b / 100;

        // Infinity and NaN check
        if(!isFinite(periodPayment) || isNaN(periodPayment)){
            periodPayment = 0;
            periodPaymentRef.current.innerText = "Invalid Inputs";
            return
        }

        // Sets the highlighted period payment area
        periodPaymentRef.current.innerHTML = `
            $ <span class="big">${setSeperator(periodPayment)}</span>
            <span> / ${paymentPeriod.toUpperCase()}</span>
        `;

        // Sets the payment plan inside of the modal
        const rowsArr = [];
        let copyAmount = +amount;
        for(let i = 0; i < +paymentRange; i++){
            const rowObj = {};

            rowObj.no = i + 1;
            rowObj.monthlyPayment = periodPayment;
            rowObj.interest = copyAmount * interestMultiplier * +interest / 100;
            rowObj.kkdf = rowObj.interest * +kkdf / 100;
            rowObj.bsmv = rowObj.interest * +bsmv / 100;
            rowObj.principal = rowObj.monthlyPayment - rowObj.interest - rowObj.kkdf - rowObj.bsmv;
            rowObj.remainingPrincipal = copyAmount - rowObj.principal;

            copyAmount = rowObj.remainingPrincipal;

            if(i === +paymentRange - 1 && copyAmount !== 0){
                rowObj.monthlyPayment = periodPayment + copyAmount;
                rowObj.remainingPrincipal = 0;
            }

            rowsArr.push(rowObj);
        }

        setRows(rowsArr);
    }, [interest, kkdf, bsmv, paymentRange, amount, interestMultiplier, paymentPeriod]);

    const handleOpenModal = () => {
        modalRef.current.openModal();
    }

    return (
        <>
            <div className='info-container'>
                <p 
                    className='small-title'
                >
                    Your calculation for your loan of 
                    <span 
                        className='bolder'
                    >
                        {" "}${" "}
                        {`${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                    </span>
                    {" "}with{" "}
                    <span 
                        className='bolder'
                    >
                        {`${paymentRange}`} {`${paymentPeriod}s`}
                    </span> 
                    {" "}repayment;
                </p>
                <div>
                    <div className='highlight-container container'>
                        <p className='highlight-text'>Installment Amount</p>
                        <p ref={periodPaymentRef} className='highlight-text'></p>
                    </div>
                    <div className='taxes-container'>
                        <div>
                            <p>Interest</p>
                            <p className='bolder'>{`% ${interest}`}</p>
                        </div>
                        <div>
                            <p>RUSF<wbr/>(KKDF)</p>
                            <p className='bolder'>{`% ${kkdf}`}</p>
                        </div>
                        <div>
                            <p>BITT<wbr/>(BSMV)</p>
                            <p className='bolder'>{`% ${bsmv}`}</p>
                        </div>
                    </div>
                    <button 
                        className='btn btn-ghost' 
                        type='button'
                        onClick={handleOpenModal}
                    >
                        See Payment Plan and Costs
                    </button>
                </div>
            </div>
            <Modal ref={modalRef} paymentPeriod={paymentPeriod} rows={rows}></Modal>
        </>
    )
}

export default CalculationInfo