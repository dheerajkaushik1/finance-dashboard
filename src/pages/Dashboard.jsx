import { useEffect, useState } from "react";
import AddTransactionModal from "../components/AddTransactionModal";
import Charts from "../components/Charts";
import Insights from "../components/Insights";
const mockData = [
    { id: 1, title: "Salary", amount: 50000, type: "income", date: "2026-04-01" },
    { id: 2, title: "Food", amount: 500, type: "expense", date: "2026-04-02" },
];

export default function Dashboard() {
    const [transactions, setTransactions] = useState(() => {
        const localData = localStorage.getItem("transactions");
        return localData ? JSON.parse(localData) : mockData;
    });

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    })

    const [isAdmin, setIsAdmin] = useState(false);
    const [sortBy, setSortBy] = useState("latest");
    const [filter, setFilter] = useState("all");
    const [showModal, setShowModal] = useState(false);

    const totalIncome = transactions
        .filter((t) => t.type === "income")
        .reduce((acc, t) => acc + t.amount, 0);

    const totalExpense = transactions
        .filter((t) => t.type === "expense")
        .reduce((acc, t) => acc + t.amount, 0);

    const balance = totalIncome - totalExpense;

    const addTransaction = (newTx) => {
        setTransactions([...transactions, newTx]);
    };

    const deleteTransaction = (id) => {
        const updatedTransactions = transactions.filter((t) => t.id !== id);
        setTransactions(updatedTransactions);
    };

    const processedTransactions = transactions
        .filter((t) => {
            if (filter === "all") return true;
            return t.type === filter;
        })
        .sort((a, b) => {
            if (sortBy === "latest") return new Date(b.date) - new Date(a.date);
            if (sortBy === "oldest") return new Date(a.date) - new Date(b.date);
            if (sortBy === "AmountHighLow") return b.amount - a.amount;
            if (sortBy === "AmountLowHigh") return a.amount - b.amount;
            return 0;
        });

    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const handleTheme = () => {
        setDarkMode(!darkMode);
    }

    return (
        <div className={`min-h-screen p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} relative`}>

            {showModal && (
                <AddTransactionModal setShowModal={setShowModal}
                    addTransaction={addTransaction} darkMode={darkMode}
                />
            )}

            <button className="h-20 w-20 bg-black rounded-full text-white font-bold fixed top-4 right-4" onClick={() => {
                isAdmin ? setIsAdmin(false) : setIsAdmin(true)
            }}>
                {isAdmin ? "Admin" : "User"}
            </button>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 border-b-2 pb-6 border-purple-300">
                <div className={`p-4 rounded-xl shadow ${darkMode ? "bg-gray-500" : "bg-white"}`}>
                    <h2 className={`${darkMode ? "text-gray-300" : "text-gray-500"}`}>
                        Balance
                    </h2>
                    <p className="text-green-400 text-2xl font-bold">
                        ₹{balance}
                    </p>
                </div>

                <div className={`p-4 rounded-xl shadow ${darkMode ? "bg-gray-500" : "bg-white"}`}>
                    <h2 className={`${darkMode ? "text-gray-300" : "text-gray-500"}`}>Income</h2>
                    <p className="text-green-400 text-2xl font-bold">₹{totalIncome}</p>
                </div>

                <div className={`p-4 rounded-xl shadow ${darkMode ? "bg-gray-500" : "bg-white"}`}>
                    <h2 className={`${darkMode ? "text-gray-300" : "text-gray-500"}`}>Expenses</h2>
                    <p className={`${darkMode ? "text-gray-300" : "text-red-600"} text-2xl font-bold`}>₹{totalExpense}</p>
                </div>
            </div>


            <div className="mb-4 flex flex-col-reverse md:flex-row justify-between items-center w-full overflow-hidden">

                <div className="flex gap-5">
                    <button onClick={() => {
                        setFilter("all")
                    }} className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-3">
                        All
                    </button>

                    <button onClick={() => {
                        setFilter("income")
                    }} className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-3">
                        Income
                    </button>

                    <button onClick={() => {
                        setFilter("expense")
                    }} className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-3">
                        Expense
                    </button>
                </div>

                <select className="border px-3 py-2 rounded-lg mb-3" name="Sort By" id="" onChange={(e) => setSortBy(e.target.value)}>
                    <option value="latest" className={`${darkMode ? "text-gray-300 bg-gray-600" : "text-gray-500"}`} >Latest</option>
                    <option value="oldest" className={`${darkMode ? "text-gray-300 bg-gray-600" : "text-gray-500"}`} >Oldest</option>
                    <option value="AmountHighLow" className={`${darkMode ? "text-gray-300 bg-gray-600" : "text-gray-500"}`} >Amount High to Low</option>
                    <option value="AmountLowHigh" className={`${darkMode ? "text-gray-300 bg-gray-600" : "text-gray-500"}`} >Amount Low to High</option>
                </select>

                <div className="flex gap-5">
                    <button className="bg-black text-white px-4 py-2 rounded-lg mb-3" onClick={handleTheme}>
                        {darkMode ? "Light Mode" : "Dark Mode"}
                    </button>
                    {isAdmin && <button
                        className="bg-black text-white px-4 py-2 rounded-lg mb-3"
                        onClick={() => setShowModal(true)}
                    >
                        + Add Transaction
                    </button>}
                </div>
            </div>

            {/* Table */}
            <div className={`${darkMode ? "bg-gray-500" : "bg-white"} p-4 rounded-xl shadow `}>
                <h2 className="text-2xl font-semibold mb-4">
                    Transactions
                </h2>
                <table className="w-full text-left overflow-auto">
                    <thead>
                        <tr className={`${darkMode ? "text-gray-300" : "text-gray-500"}`}>
                            <th className="py-2">
                                Title
                            </th>
                            <th className="py-2">Amount</th>
                            <th className="py-2">Type</th>
                            <th className="py-2">Date</th>
                            {isAdmin && <th className="py-2">Delete</th>}
                        </tr>
                    </thead>

                    <tbody>
                        {processedTransactions.map(tx => (
                            <tr key={tx.id} className="border-t ">
                                <td className="py-2">{tx.title}</td>
                                <td className={tx.type === "income" ? "text-green-400" : `${darkMode ? "text-gray-300" : "text-red-600"}`}>
                                    ₹{tx.amount}
                                </td>
                                <td>{tx.type}</td>
                                <td>{tx.date}</td>
                                {isAdmin && <td className="py-2">
                                    <button className="bg-red-500 text-white px-4 py-1 rounded-lg" onClick={() => deleteTransaction(tx.id)}>
                                        Delete
                                    </button>
                                </td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Charts */}
            <Charts totalExpense={totalExpense} totalIncome={totalIncome} darkMode={darkMode} />

            {/* Insights */}
            <Insights transactions={transactions} darkMode={darkMode} />
        </div>
    )
}