import { ScoreChart } from "../UI/ScoreChart";

export default function Dashboard() {
  return (
    <div className="flex flex-col container">
      <div className="text-2xl font-bold mb-4">Dashboard Page</div>
      <ScoreChart />
    </div>
  );
}
