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
      <Route path="/student">
        <Route index element={<Student />} />
        <Route path="questionaire" element={<Questionaire user="student" />} />
      </Route>

      <Route path="/teacher">
        <Route index element={<Teacher />} />
        <Route path="questionaire" element={<Questionaire user="teacher" />} />
        <Route path="history" element={<PollHistory user="teacher" />} />
        <Route path=":fromstart" element={<Teacher />} />
      </Route>
    </Routes>
  );
}

export default App;
