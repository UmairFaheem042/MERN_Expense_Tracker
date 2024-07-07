import { useState } from "react";

const AddTransaction = ({ setUpdateUI }) => {
  const [newTransaction, setNewTransaction] = useState({
    title: "",
    amount: "",
    isDebit: true,
  });

  function handleNewTransaction(e, label) {
    const value = e.target.value;
    setNewTransaction((prev) => ({
      ...prev,
      [label]: value,
    }));
  }

  function handleTypeSelection(isDebit) {
    setNewTransaction((prev) => ({
      ...prev,
      isDebit: isDebit,
    }));
  }

  async function createTransaction() {
    const { amount, title, isDebit } = newTransaction;
    const requestBody = {
      amount: parseFloat(amount),
      title: title,
      isDebit: isDebit,
    };
    const transactionAPI = import.meta.env.VITE_API_TRANSACTION;
    try {
      const response = await fetch(transactionAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const transactionMade = await response.json();
      console.log("Transaction created:", transactionMade);
      setUpdateUI(true);
    } catch (error) {
      console.error("Error creating transaction:", error.message);
    }
  }

  return (
    <>
      <form
        className="flex flex-col items-end gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          createTransaction();
          setNewTransaction({ title: "", amount: "", isDebit: true });
        }}
      >
        <div className="w-full border-2 border-[rgba(255,255,255,0.1)] flex rounded-[5px] px-3 py-2">
          <input
            type="text"
            placeholder="What happened today?"
            value={newTransaction.title}
            onChange={(e) => handleNewTransaction(e, "title")}
            required
            className="flex-1 bg-transparent outline-none border-none font-semibold"
          />
          <input
            type="number"
            placeholder="0.00"
            min={0}
            value={newTransaction.amount}
            onChange={(e) => handleNewTransaction(e, "amount")}
            required
            className="w-28 bg-[rgba(255,255,255,0.04)] px-3 py-2 rounded-md outline-none border-none font-semibold"
          />
        </div>
        <div className="buttons flex gap-4">
          <button
            type="button"
            className={`type ${
              newTransaction.isDebit && "bg-[#ff4f4f]"
            } min-w-[100px] px-4 py-2 rounded-md font-semibold border border-[rgba(255,255,255,0.2)]`}
            onClick={() => handleTypeSelection(true)}
          >
            Debit
          </button>
          <button
            type="button"
            className={`type ${
              !newTransaction.isDebit && "bg-[#36c502]"
            } min-w-[100px] px-4 py-2 rounded-md font-semibold border border-[rgba(255,255,255,0.2)]`}
            onClick={() => handleTypeSelection(false)}
          >
            Credit
          </button>

          <button
            type="submit"
            className="bg-white text-black px-4 py-2 rounded-md font-semibold"
          >
            Add Transaction
          </button>
        </div>
      </form>
    </>
  );
};

export default AddTransaction;
