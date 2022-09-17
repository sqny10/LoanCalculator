import {createContext, useState, useEffect} from "react";

const PaymentPlanContext = createContext();

export const PaymentPlanProvider = (({children}) => {
    // Select base styles
    const customSelectStyles = {
        control: (provided, state) => ({
            ...provided,
            with: "100%",
            backgroundColor: "var(--neutral-color)",
            padding: "3px var(--size-m)",
            borderRadius: "0",
            outline: "none",
            border: "none",
            color: "var(--dark-color)"
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            padding: "0",
            outline: "none",
            color: "var(--dark-color)"
        }),
        menuList: (provided, state) => ({
            ...provided,
            backgroundColor: "var(--neutral-color)",
            color: "var(--dark-color)"
        }),
        placeholder: (provided, state) => ({
            ...provided,
            color: "var(--dark-color)"
        }),
        option: (provided, state) => ({
            ...provided,
            color: "var(--dark-color)"
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: "var(--dark-color)"
        }),
    }

    // Select options.
    const periodOptions = [
        {
            value: "week",
            label: "Weekly"
        },
        {
            value: "month",
            label: "Monthly"
        },
        {
            value: "year",
            label: "Yearly"
        }
    ];

    // Defines min and max values of the input. Could be changes accordingly
    const initialMinMaxRange = {
        month: {
            min: 1,
            max: 240
        },
        week: {
            min: 1,
            max: 1040
        },
        year: {
            min: 1,
            max: 20
        }
    }

    // States
    const [paymentPeriod, setPaymentPeriod] = useState("month");
    const [paymentRange, setPaymentRange] = useState(12);
    const [interestMultiplier, setInterestMultiplier] = useState();
    const [minMaxRange, setMinMaxRange] = useState(initialMinMaxRange.month);

    useEffect(() => {
        // Resets the max values in order to the period selection
        if(paymentPeriod === "week"){
            setMinMaxRange(initialMinMaxRange.week);
            setInterestMultiplier(7 / 30);
            setPaymentRange(52);
        }else if(paymentPeriod === "month"){
            setMinMaxRange(initialMinMaxRange.month);
            setInterestMultiplier(30 / 30);
            setPaymentRange(12);
        }else{
            setMinMaxRange(initialMinMaxRange.year);
            setInterestMultiplier(365 / 30);
            setPaymentRange(1);
        }
        // this eslint comment added due to warning on dependency array requirement. But object in a dependency array creates an infinite loop. 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paymentPeriod]);

    // Handles select changes
    const handlePeriodTypeChange = (selectedOption) => {
        setPaymentPeriod(selectedOption.value);
    }

    // Handles input changes
    const handleChange = (e) => {
        if(paymentPeriod === "week"){
            if(+e.target.value > initialMinMaxRange.week.max){
                setPaymentRange(initialMinMaxRange.week.max);
            }else if(+e.target.value < initialMinMaxRange.week.min){
                setPaymentRange(initialMinMaxRange.week.min);
            }else{
                setPaymentRange(e.target.value);
            }
        }else if(paymentPeriod === "month"){
            if(+e.target.value > initialMinMaxRange.month.max){
                setPaymentRange(initialMinMaxRange.month.max);
            }else if(+e.target.value < initialMinMaxRange.month.min){
                setPaymentRange(initialMinMaxRange.month.min);
            }else{
                setPaymentRange(e.target.value);
            }
        }else if(paymentPeriod === "year"){
            if(+e.target.value > initialMinMaxRange.year.max){
                setPaymentRange(initialMinMaxRange.year.max);
            }else if(+e.target.value < initialMinMaxRange.year.min){
                setPaymentRange(initialMinMaxRange.year.min);
            }else{
                setPaymentRange(e.target.value);
            }
        }
    }

    return <PaymentPlanContext.Provider value={{
        customSelectStyles,
        periodOptions,
        paymentPeriod,
        paymentRange,
        minMaxRange,
        interestMultiplier,
        handleChange,
        handlePeriodTypeChange
    }}>
        {children}
    </PaymentPlanContext.Provider>
})

export default PaymentPlanContext