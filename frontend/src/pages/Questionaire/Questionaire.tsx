/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button, Poll, Spinner } from "../../components";
import PageWrapper from "../../Pagewrapper";
import type { QuestionaireProps } from "./types";
import { useNavigate } from "react-router-dom";
import type { PollProps } from "../../components/Poll/types";

const Questionaire: React.FC<QuestionaireProps> = ({ user }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [activeQuestion, setActiveQuestion] = useState<PollProps["question"] | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [asked, setAsked] = useState(1);
  const navigate = useNavigate();
  const st = new Set();
  const API_URL = import.meta.env.VITE_API_URL;
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    if (user == "teacher") setSubmitted(true);
  }, [user]);
  useEffect(() => {
    const fetchQuestion = async () => {
      let data = localStorage.getItem("student");
      if (!data) data = JSON.stringify({ id: -1 });
      const student = JSON.parse(data);
      try {
        const res = await fetch(
          `${API_URL}/questions/active?student_id=${student?.id}`
        );
        const data = await res.json();
        if (data.id) {
          st.add(data.id);
          setAsked(st.size);
          setActiveQuestion(data);
          if (user == "student") setSubmitted(data.answered);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchQuestion();
    const interval = setInterval(fetchQuestion, 2000);
    return () => clearInterval(interval);
  }, []);

  const submitAnswer = async () => {
    if (user == "teacher") return;
    if (!selectedOption || !activeQuestion) {
      alert("Please select option");
      return;
    }
    const data = localStorage.getItem("student");
    if (!data) return;
    const student = JSON.parse(data);
    try {
      await fetch(`${API_URL}/answers/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question_id: activeQuestion.id,
          option_id: selectedOption,
          student_id: student.id,
        }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Failed to submit answer.");
    }
  };

  const askNewQuestion = () => {
    navigate("/teacher?fromstart");
  };


  return (
    <PageWrapper>
      <div className="flex gap-y-9 items-center justify-center my-auto">
        <div className="flex flex-col">
          {loading ? (
            <>
              <Spinner />
              {user === "student" ? (
                <h2 className="font-bold flex justify-center text-2xl mt-12">
                  Wait for the teacher to ask a new question..
                </h2>
              ) : (
                <div className="flex justify-end py-6">
                  <Button
                    label="+ Ask a new question"
                    type="button"
                    onClick={askNewQuestion}
                    style={{ width: "300px" }}
                  />
                </div>
              )}
            </>
          ) : (
            <>
              <Poll
                asked={asked}
                user={user}
                question={activeQuestion}
                submitted={submitted}
                setSubmitted={(val) => setSubmitted(val)}
                selectedOption={selectedOption}
                setSelectedOption={(id)=>setSelectedOption(id)}
              />
              {user == "student" ? (
                submitted ? (
                  <h2 className="font-bold flex justify-center text-2xl mt-12">
                    Wait for the teacher to ask a new question..
                  </h2>
                ) : (
                  <div className="flex justify-end py-6">
                    <Button
                      label="Submit"
                      type="button"
                      onClick={submitAnswer}
                    />
                  </div>
                )
              ) : (
                <div className="flex justify-end py-6">
                  <Button
                    label="+ Ask a new question"
                    type="button"
                    onClick={askNewQuestion}
                    style={{ width: "300px" }}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {user == "teacher" ? (
        <div className="absolute top-5 right-25 flex justify-end py-6">
          <Button
            icon={
              <svg
                width="29"
                height="19"
                viewBox="0 0 29 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.5 0.125C8.25 0.125 2.9125 4.0125 0.75 9.5C2.9125 14.9875 8.25 18.875 14.5 18.875C20.7563 18.875 26.0875 14.9875 28.25 9.5C26.0875 4.0125 20.7563 0.125 14.5 0.125ZM14.5 15.75C11.05 15.75 8.25 12.95 8.25 9.5C8.25 6.05 11.05 3.25 14.5 3.25C17.95 3.25 20.75 6.05 20.75 9.5C20.75 12.95 17.95 15.75 14.5 15.75ZM14.5 5.75C12.4312 5.75 10.75 7.43125 10.75 9.5C10.75 11.5688 12.4312 13.25 14.5 13.25C16.5688 13.25 18.25 11.5688 18.25 9.5C18.25 7.43125 16.5688 5.75 14.5 5.75Z"
                  fill="white"
                />
              </svg>
            }
            label="View Poll History"
            type="button"
            onClick={() => navigate("/teacher/history")}
            style={{ background: "#8F64E1" }}
          />
        </div>
      ) : (
        ""
      )}
    </PageWrapper>
  );
};

export default Questionaire;
