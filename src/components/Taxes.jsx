import {useContext} from "react";
import TaxesContext from "../context/TaxesContext";

function Taxes() {
    // Required variables and functions from the TaxesContext
    const {minMaxRange, taxesData, handleChange} = useContext(TaxesContext);

    return (
        <div className="input-container">
            <p className="input-title">Enter your taxes and interest rates</p>
            {/* Interest Rate inputs */}
            <div className="form-control with-label">
                <div className="relative">
                    <label htmlFor="interest">Interest Rate (Monthly basis)</label>
                    <input 
                        type="number"
                        name="interest"
                        min={minMaxRange.min}
                        max={minMaxRange.max}
                        value={taxesData.interest}
                        step="0.01"
                        className="form-input"
                        placeholder="Enter Interest Rate"
                        onChange={handleChange}
                    />
                    <span className="currency">%</span>
                </div>
            </div>
            <div className="form-control">
                <input 
                    type="range"
                    name="interest"
                    min={minMaxRange.min}
                    max={minMaxRange.max}
                    value={taxesData.interest}
                    step="0.01"
                    tabIndex="-1"
                    className="range-input"
                    onChange={handleChange}
                />
                <div className="slider-range-info-container">
                    <span className="info">{minMaxRange.min}</span>
                    <span className="info">{minMaxRange.max}</span>
                </div>
            </div>
            {/* KKDF Rate inputs */}
            <div className="form-control with-label">
                <div className="relative">
                    <label htmlFor="kkdf">RUSF(KKDF)</label>
                    <input 
                        type="number"
                        name="kkdf"
                        min={minMaxRange.min}
                        max={minMaxRange.max}
                        value={taxesData.kkdf}
                        step="0.01"
                        className="form-input"
                        placeholder="Enter RUSF(KKDF) Rate"
                        onChange={handleChange}
                    />
                    <span className="currency">%</span>
                </div>
            </div>
            <div className="form-control">
                <input 
                    type="range"
                    name="kkdf"
                    min={minMaxRange.min}
                    max={minMaxRange.max}
                    value={taxesData.kkdf}
                    step="0.01"
                    tabIndex="-1"
                    className="range-input"
                    onChange={handleChange}
                />
                <div className="slider-range-info-container">
                    <span className="info">{minMaxRange.min}</span>
                    <span className="info">{minMaxRange.max}</span>
                </div>
            </div>
            {/* BSMV Rate inputs */}
            <div className="form-control with-label">
                <div className="relative">
                    <label htmlFor="bsmv">BITT(BSMV)</label>
                    <input 
                        type="number"
                        name="bsmv"
                        min={minMaxRange.min}
                        max={minMaxRange.max}
                        value={taxesData.bsmv}
                        step="0.01"
                        className="form-input"
                        placeholder="Enter BITT(BSMV) Rate"
                        onChange={handleChange}
                    />
                    <span className="currency">%</span>
                </div>
            </div>
            <div className="form-control">
                <input 
                    type="range"
                    name="bsmv"
                    min={minMaxRange.min}
                    max={minMaxRange.max}
                    value={taxesData.bsmv}
                    step="0.01"
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

export default Taxes