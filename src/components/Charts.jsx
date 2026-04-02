import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function Charts({ totalIncome, totalExpense, darkMode }) {
    const data = [
        { name: "Income", value: totalIncome },
        { name: "Expense", value: totalExpense }
    ];

    const COLORS = ["#22c55e", "#ef4444"]; // green, red

    return (
        <div className={`${darkMode ? "bg-gray-500" : "bg-white"} p-4 rounded-xl shadow mt-6`}>
            <h2 className="text-xl font-semibold mb-4">
                Analytics
            </h2>

            <div className="w-full h-60">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie data={data} dataKey="value" outerRadius={80} label>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}