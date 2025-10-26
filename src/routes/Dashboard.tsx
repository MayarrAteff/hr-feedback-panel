import FeedbackTable from "../UI/FeedbackTable";
import { ScoreChart } from "../UI/ScoreChart";

export default function Dashboard() {
  return (
    <div className="flex flex-col container gap-3">
      <div className="text-2xl font-bold">Dashboard Page</div>
      <ScoreChart />
      <FeedbackTable />
    </div>
  );
}
