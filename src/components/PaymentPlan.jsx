import Select from "react-select";
import {useContext} from "react";
import PaymentPlanContext from "../context/PaymentPlanContext";

function PaymentPlan() {
    // Required variables and functions from the PaymentPlanContext
    const {
        customSelectStyles, 
        periodOptions, 
        paymentPeriod, 
        paymentRange, 
        minMaxRange, 
        handleChange, 
        handlePeriodTypeChange
    } = useContext(PaymentPlanContext);

    return (
        <div className="input-container">
            <p className="input-title">Select your payment period and range</p>
            <div className="form-control">
                <Select 
                    placeholder="Select Period Type" 
                    options={periodOptions} 
                    styles={customSelectStyles}
                    onChange={handlePeriodTypeChange}
                />
            </div>
            <div className="form-control">
                <div className="relative">
                    <input 
                        type="number"
                        name="amount"
                        min={minMaxRange.min}
                        max={minMaxRange.max}
                        value={paymentRange}
                        step="1"
                        className="form-input"
                        placeholder="Enter Payment Range"
                        onChange={handleChange}
                    />
                    <span className="currency">{paymentPeriod[0].toUpperCase()}</span>
                </div>
            </div>
            <div className="form-control">
                <input 
                    type="range"
                    name="amount"
                    min={minMaxRange.min}
                    max={minMaxRange.max}
                    value={paymentRange}
                    step="1"
                    tabIndex="-1"
                    className="range-input"
                    onChange={handleChange}
                />
                <div className="slider-range-info-container">
                    <span className="info">{minMaxRange.min}</span>
                    <span className="info">{minMaxRange.max}</span>
                </div>
            </div>
        </div>
    )
}

export default PaymentPlan