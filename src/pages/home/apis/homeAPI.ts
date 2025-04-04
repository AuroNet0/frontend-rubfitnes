const BASE_URL = "http://localhost:8080";

export const homeAPI = () => {
  const consultarTreinos = async () => {
    try {
        const response = await fetch(`${BASE_URL}/treinos`);
  
        return await response.json();
      } catch (error) {
        console.error("Erro ao carregar os treinos:", error);
        return [];
      }
  };

  return {
    consultarTreinos,
  };
};
