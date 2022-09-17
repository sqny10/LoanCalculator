import {createContext, useState} from "react";

const TaxesContext = createContext();

export const TaxesProvider = (({children}) => {
    // Defines min and max values of the input. Could be changes accordingly
    const minMaxRange = {
        min: 0.01,
        max: 100
    }

    // Defines default interest rate, bsmv and kkdf. Could be changes accordingly
    const [taxesData, setTaxesData] = useState({
        interest: 2.28,
        kkdf: 15,
        bsmv: 10
    })

    // Handles input changes
    const handleChange = (e) => {
        if(+e.target.value > minMaxRange.max){
            setTaxesData((prevState) => ({
                ...prevState,
                [e.target.name]: minMaxRange.max
            }));
        }else if(+e.target.value < minMaxRange.min){
            setTaxesData((prevState) => ({
                ...prevState,
                [e.target.name]: minMaxRange.min
            }));
        }else{
            setTaxesData((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value
            }));
        }
    }

    return <TaxesContext.Provider value={{
        minMaxRange,
        taxesData,
        handleChange
    }}>
        {children}
    </TaxesContext.Provider>
})

export default TaxesContext