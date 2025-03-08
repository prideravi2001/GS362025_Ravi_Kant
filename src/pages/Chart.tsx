import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart = () => {
  const data = {
    labels: ["Store 1", "Store 2", "Store 3"],
    datasets: [
      {
        label: "Revenue ($)",
        data: [1200, 1500, 1800],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="p-4 bg-white shadow-md w-full sm:max-w-4xl mx-auto size-auto">
      <h2 className="text-l font-semibold">Revenue by Store</h2>
      <Bar data={data} />
    </div>
  );
};

export default Chart