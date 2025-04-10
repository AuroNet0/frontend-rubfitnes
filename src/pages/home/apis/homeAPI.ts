const BASE_URL = import.meta.env.VITE_API_URL;

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
