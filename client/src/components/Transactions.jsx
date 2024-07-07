import { useEffect, useState } from "react";

const Transactions = ({ updateUI, setUpdateUI }) => {
  const [transactions, setTransactions] = useState([]);
  const transactionAPI = import.meta.env.VITE_API_TRANSACTION;

  useEffect(() => {
    async function fetchTransactions() {
      const response = await fetch(transactionAPI);
      const data = await response.json();
      setTransactions(data);
    }
    fetchTransactions();
  }, [updateUI]);

  async function resetCashFlow() {
    try {
      const response = await fetch(transactionAPI, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setUpdateUI(true);
    } catch (error) {
      console.error("Error resetting cash flow:", error.message);
    }
  }

  return (
    <div className="recent_transactions ">
      <div className="flex justify-between">
        <h4 className="text-[rgba(255,255,255,0.2)] text-2xl font-bold">
          Recent Transactions
        </h4>
        <button className=" text-white font-semibold" onClick={resetCashFlow}>
          Reset
        </button>
      </div>
      <div className="all_transactions flex flex-col gap-4 mt-4">
        {transactions.length != 0 ? (
          <>
            {transactions
              .slice()
              .reverse()
              .map((flow) => {
                return (
                  <div
                    className="bg-[rgba(255,255,255,0.04)] p-4 rounded-md border-2 border-[rgba(255,255,255,0.1)]"
                    key={flow._id}
                  >
                    <div className="details flex justify-between text-lg">
                      <span className="title">{flow.title}</span>
                      <span
                        className={`amount ${
                          flow.isDebit
                            ? "text-[#ff4f4f]"
                            : "text-[#36c502] font-semibold"
                        }`}
                      >
                        {" "}
                        {flow.isDebit ? "-" : "+"} ₹ {flow.amount}
                      </span>
                    </div>
                  </div>
                );
              })}
          </>
        ) : (
          <>
            <p>No Transactions made</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Transactions;
