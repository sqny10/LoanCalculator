import Header from "./components/Header";
import SmallHeader from "./components/SmallHeader";
import BorrowAmount from "./components/BorrowAmount";
import PaymentPlan from "./components/PaymentPlan";
import Taxes from "./components/Taxes";
import CalculationInfo from "./components/CalculationInfo";
import {AmountProvider} from "./context/AmountContext";
import {PaymentPlanProvider} from "./context/PaymentPlanContext";
import {TaxesProvider} from "./context/TaxesContext";

function App() {
  return (
    <AmountProvider>
    <PaymentPlanProvider>
    <TaxesProvider>
      <Header/>
      <main className="container">
        <div className="loan-calculator-container">
          <div className="loan-calculator-top">
            <SmallHeader/>
            <BorrowAmount/>
            <PaymentPlan/>
            <Taxes/>
          </div>
          <div className="loan-calculator-bottom">
            <CalculationInfo/>
          </div>
        </div>
      </main>
    </TaxesProvider>
    </PaymentPlanProvider>
    </AmountProvider>
  );
}

export default App;
