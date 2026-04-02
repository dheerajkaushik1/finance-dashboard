import { useState } from "react";

export default function AddTransactionModal({setShowModal, addTransaction, darkMode}) {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("income");

    const handleSubmit = (e) => {
        if(!title || !amount) return;

        const nextTx = {
            id: Date.now(),
            title,
            amount: Number(amount),
            type,
            date: new Date().toISOString().split("T")[0],
        };

        addTransaction(nextTx);
        setShowModal(false);
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-999">
            <div className={`${darkMode ? "bg-gray-500" : "bg-white"} p-6 rounded-xl w-80 relative`}>
                <h2 className="text-lg font-semibold mb-4">
                    Add Transaction
                </h2>

                <div className={`py-1 px-2 rounded font-bold text-white bg-black absolute top-4 right-4 cursor-pointer`} onClick={() => setShowModal(false)}>
                    X
                </div>

                <input type="text" placeholder="Title" className="w-full mb-2 p-2 border rounded" onChange={(e) => {
                    setTitle(e.target.value)
                }} />

                <input type="text" placeholder="Amount" className="w-full mb-2 p-2 border rounded" onChange={(e) => {
                    setAmount(e.target.value)
                }} />

                <select id="" className="w-full mb-4 p-2 border rounded" onChange={(e) => {
                    setType(e.target.value)
                }}>
                        <option value="income" className={darkMode ? "bg-gray-500 text-white" : "bg-white text-gray-900"}>
                            Income
                        </option>
                        <option value="expense" className={darkMode ? "bg-gray-500 text-white" : "bg-white text-gray-900"}>
                            Expense
                        </option>
                </select>

                <input type="date" className="w-full mb-4 p-2 border rounded" onChange={(e) => {
                    setDate(e.target.value)
                }} />

                <button className="bg-black text-white px-4 py-2 rounded w-full" onClick={handleSubmit}>
                    Add
                </button>
            </div>
        </div>
    )
}