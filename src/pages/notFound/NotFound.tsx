import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <h1>Erro 404</h1>
      <p>Página não encontrada!</p>
      <Link to="/">Voltar para Home</Link>
    </div>
  );
}
