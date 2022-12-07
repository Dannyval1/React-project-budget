export const generarId = () => {
  const random = Math.random().toString(36).substr(2);
  const fecha = Date.now().toString(36);
  return random + fecha;
};

export const formatDate = (date) => {
  const currentDate = new Date(date);
  const options = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };

  return currentDate.toLocaleDateString("es-ES", options);
};
