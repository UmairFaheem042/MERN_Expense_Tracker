import { useEffect, useState } from "react";

const CashFlow = ({ updateUI, setUpdateUI }) => {
  const [cashFlow, setCashFlow] = useState({
    balance: 0,
    expenditure: 0,
    income: 0,
  });

  const styles = {
    cashFlowContainer: "flex items-center justify-between gap-4",
    cashBox: "flex-1 bg-[rgba(255,255,255,0.07)] px-4 py-2 rounded-lg",
    cashText: "text-[rgba(255,255,255,0.3)] font-semibold text-[0.85rem]",
  };

  useEffect(() => {
    async function fetchCashFlow() {
      const cashFlowAPI = import.meta.env.VITE_API_CASHFLOW;
      try {
        const response = await fetch(cashFlowAPI);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        if (data && typeof data === "object") {
          setCashFlow(data);
        } else {
          console.error("Unexpected data format:", data);
          setCashFlow({
            balance: 0,
            expenditure: 0,
            income: 0,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchCashFlow();
    setUpdateUI(true);
  }, [updateUI]);

  console.log(cashFlow);

  return (
    <div className={styles.cashFlowContainer}>
      <div className={styles.cashBox}>
        <span className={styles.cashText}>Net Cash Flow</span>
        <h3
          className={`text-[1.5rem] font-bold ${
            cashFlow.balance > 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          ₹ {cashFlow.balance}
        </h3>
      </div>
      <div className={styles.cashBox}>
        <span className={styles.cashText}>Expenditure</span>
        <h3 className="text-[1.5rem] font-bold">₹ {cashFlow.expenditure}</h3>
      </div>
      <div className={styles.cashBox}>
        <span className={styles.cashText}>Income</span>
        <h3 className="text-[1.5rem] font-bold">₹ {cashFlow.income}</h3>
      </div>
    </div>
  );
};

export default CashFlow;
