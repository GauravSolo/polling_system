import { useEffect, useState } from "react";
import type { Option } from "../../types";
import type { PollProps } from "../../components/Poll/types";
import { Poll, Spinner } from "../../components";
import PageWrapper from "../../Pagewrapper";

interface PollHistoryItem {
  id: number;
  question_text: string;
  options: { id: number; text: string; votes: number }[];
  timer_duration: number;
  timer_start: string;
  timer_end: string;
}
interface PollHistoryProps {
  user: string;
}

const PollHistory: React.FC<PollHistoryProps> = ({ user }) => {
  const [history, setHistory] = useState<PollHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`${API_URL}/questions/history`);
        const data = await res.json();
        setHistory(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <h2>Loading poll history...</h2>;

  return (
    <PageWrapper>
      <div className="flex flex-col gap-y-6 items-start justify-center my-auto mx-auto mt-25 ">
        <h1 className="mb-6 text-[40px]">
          View <span className="font-semibold">Poll History</span>
        </h1>
        {history.length === 0 ? (
          <Spinner/>
        ) : (
          history.map((poll, idx) => {
            const totalVotes = poll.options.reduce(
              (sum, o) => sum + o.votes,
              0
            );

            const questionForPoll: PollProps["question"] = {
              id: poll.id,
              question_text: poll.question_text,
              timer_duration: poll.timer_duration,
              timer_start: poll.timer_start,
              timer_end: poll.timer_end,
              options: poll.options.map((opt) => ({
                id: opt.id,
                text: opt.text,
                isCorrect: false,
                percentage: totalVotes
                  ? Math.round((opt.votes * 100) / totalVotes)
                  : 0,
              })) as Option[],
            };
            return (
              <div className="mb-5" key={poll.id}>
                <Poll
                  key={poll.id}
                  question={questionForPoll}
                  submitted={true}
                  setSubmitted={() => {}}
                  user={user}
                  asked={idx + 1}
                />
              </div>
            );
          })
        )}
      </div>
    </PageWrapper>
  );
};

export default PollHistory;
