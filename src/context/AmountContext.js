import {createContext, useState} from "react";

const AmountContext = createContext();

export const AmountProvider = ({children}) => {
    // Defines min and max values of the input. Could be changes accordingly
    const minMaxAmounts = {
        min: "1",
        max: "1000000"
    }

    // Sets the default amount value. Could be changes accordingly 
    const [amount, setAmount] = useState(100000);

    // Handles input changes
    const handleChange = (e) => {
        if(+e.target.value > +minMaxAmounts.max){
            setAmount(+minMaxAmounts.max)
        }else if(+e.target.value < +minMaxAmounts.min){
            setAmount(+minMaxAmounts.min)
        }else{
            setAmount(e.target.value)
        }
    }

    return <AmountContext.Provider value={{
        minMaxAmounts,
        amount,
        handleChange
    }}>
        {children}
    </AmountContext.Provider>
}

export default AmountContext