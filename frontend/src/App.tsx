import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Student from "./pages/Student/Student";
import Teacher from "./pages/Teacher/Teacher";
import Questionaire from "./pages/Questionaire/Questionaire";
import PollHistory from "./pages/PollHistory/PollHistory";
function App() {
  const location = useLocation();

  return (
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/student" element={<Student />} />
        <Route path="/student/questionaire" element={<Questionaire user="student"/>} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/teacher/questionaire" element={<Questionaire user="teacher"/>} />
        <Route path="/teacher/history" element={<PollHistory user="teacher"/>} />
      </Routes>
  );
}

export default App;
