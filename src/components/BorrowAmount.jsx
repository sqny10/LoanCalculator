import {useContext} from "react";
import AmountContext from "../context/AmountContext";

function BorrowAmount() {
    // Required variables and functions from the AmountContext
    const {minMaxAmounts, amount, handleChange} = useContext(AmountContext)

    return (
        <div className="input-container">
            <p className="input-title">How much would you like to borrow?</p>
            <div className="form-control">
                <div className="relative">
                    <input 
                        type="number"
                        name="amount"
                        min={minMaxAmounts.min}
                        max={minMaxAmounts.max}
                        value={amount}
                        step="100"
                        className="form-input"
                        placeholder="Enter Amount"
                        onChange={handleChange}
                    />
                    <span className="currency">$</span>
                </div>
            </div>
            <div className="form-control">
                <input 
                    type="range"
                    name="amount"
                    min={minMaxAmounts.min}
                    max={minMaxAmounts.max}
                    value={amount}
                    step="100"
                    tabIndex="-1"
                    className="range-input"
                    onChange={handleChange}
                />
                <div className="slider-range-info-container">
                    <span className="info">{`${minMaxAmounts.min.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} $`}</span>
                    <span className="info">{`${minMaxAmounts.max.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} $`}</span>
                </div>
            </div>
        </div>
    )
}

export default BorrowAmount