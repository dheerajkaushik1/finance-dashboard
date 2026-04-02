export default function Insights({ transactions, darkMode }) {

  const categoryMap = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      const category = t.title.toLowerCase();

      if (!categoryMap[category]) {
        categoryMap[category] = 0;
      }

      categoryMap[category] += t.amount;
    }
  });

  let topCategory = "";
  let topAmount = 0;

  for (let cat in categoryMap){
    if(categoryMap[cat] > topAmount){
        topAmount = categoryMap[cat];
        topCategory = cat;
    }
  }

  return (
    <div className={`mt-6 ${darkMode ? "bg-gray-800" : "bg-white"} p-4 rounded-xl shadow`}>
      <h2 className="text-xl font-semibold mb-4">Insights</h2>

        <div className="space-y-3">

        <p>
          💸 Highest spending category: <b>{topCategory || "N/A"}</b> (₹{topAmount})
        </p>

        <p>
          📊 Total transactions: <b>{transactions.length}</b>
        </p>

      </div>

    </div>
  )

}