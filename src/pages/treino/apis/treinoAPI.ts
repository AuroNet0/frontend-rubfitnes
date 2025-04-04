const BASE_URL = "http://localhost:8080";

export const treinoAPI = () => {
  const consultarExercicios = async () => {
    try {
      const response = await fetch(`${BASE_URL}/exercicios`);

      return await response.json();
    } catch (error) {
      console.error("Erro ao carregar os exercícios:", error);
      return [];
    }
  };

  const consultarTiposTreino = async () => {
    try {
      const response = await fetch(`${BASE_URL}/tipos`);
      return await response.json();
    } catch (error) {
      console.error("Erro ao carregar os tipos de treino:", error);
      return [];
    }
  };

  const inserirTreino = async (treinoData: any) => {
    try {
      const response = await fetch(`${BASE_URL}/treinos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(treinoData),
      });

      if (!response.ok) {
        throw new Error("Erro ao inserir treino");
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return {
    consultarExercicios,
    consultarTiposTreino,
    inserirTreino,
  };
};
