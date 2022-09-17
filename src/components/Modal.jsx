import {useState, forwardRef, useImperativeHandle} from "react";

function Modal(props, ref) {
    // Return a title case word
    function toTitleCase(str){
        const strArr = str.split("");
        let newStr = ""
        strArr.forEach((letter, index) => {
            if(index < 1){
                letter = letter.toUpperCase();
                newStr += letter;
            }else{
                newStr += letter;
            }
        });

        return newStr;
    }

    // Modal open close state
    const [isModalOpen, setIsModalOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        openModal: () => setIsModalOpen(true)
    }));

    // Modal close function
    const closeModal = () => setIsModalOpen(false);

    // Outside click modal close function
    const handleOutsideClick = (e) => {
        if(e.target.className === "modal"){
            closeModal();
        }
    }

    if(!isModalOpen){
        return null;
    }

    return (
        <div className="modal" onClick={handleOutsideClick}>
            <div className="modal-container">
                <div className="modal-title-container">
                    <h3 className="modal-title">Payment Plan and Costs</h3>
                    <button className="close-btn" onClick={closeModal}>X</button>
                </div>
                <div className="modal-body-container">
                    <table className="payment-table">
                        <thead>
                            <tr>
                                <th>{toTitleCase(props.paymentPeriod)}{props.paymentRange < 2 ? "" : "s"}</th>
                                <th>{toTitleCase(props.paymentPeriod)}ly Payment</th>
                                <th>Principal</th>
                                <th>Remaining Principal</th>
                                <th>Interest</th>
                                <th>RUSF<wbr/>(KKDF)</th>
                                <th>BITT<wbr/>(BSMV)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.rows.map((row) => (
                                <tr key={row.no}>
                                    <td>{row.no}</td>
                                    <td>{row.monthlyPayment.toFixed(2)}</td>
                                    <td>{row.principal.toFixed(2)}</td>
                                    <td>{row.remainingPrincipal.toFixed(2)}</td>
                                    <td>{row.interest.toFixed(2)}</td>
                                    <td>{row.kkdf.toFixed(2)}</td>
                                    <td>{row.bsmv.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default forwardRef(Modal)