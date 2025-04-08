import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/TabMenuNav/TabMenuNav";
import Home from "../pages/home";
import NotFound from "../pages/notFound/NotFound";
import Treino from "../pages/treino";
import Exercicio from "../pages/exercicio";
import Login from "../pages/login/login";

export default function AppRoutes() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/treino" element={<Treino />} />
        <Route path="/exercicio" element={<Exercicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
