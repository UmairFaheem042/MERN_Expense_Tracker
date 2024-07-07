import { useEffect, useState } from "react";
import AddTransaction from "./components/AddTransaction";
import CashFlow from "./components/CashFlow";
import Transactions from "./components/Transactions";

function App() {
  const [updateUI, setUpdateUI] = useState(false);
  useEffect(() => {
    setUpdateUI(false);
  }, [updateUI]);

  return (
    <div className="max-w-[1000px] mx-auto flex flex-col gap-4 p-4">
      <CashFlow updateUI={updateUI} setUpdateUI={setUpdateUI} />
      <AddTransaction setUpdateUI={setUpdateUI} />
      <Transactions updateUI={updateUI} setUpdateUI={setUpdateUI} />
    </div>
  );
}

export default App;
