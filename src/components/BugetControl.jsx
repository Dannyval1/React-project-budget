import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const BugetControl = ({ budget, setBudget, gastos, setGastos, setIsValidBudget }) => {
  const [available, setAvailable] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );
    const totalDisponible = budget - totalGastado;

    //Calcular porcentaje gastado
    const nuevoPorcentaje = (
      ((budget - totalDisponible) / budget) *
      100
    ).toFixed(2);

    setAvailable(totalDisponible);
    setGastado(totalGastado);
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 1000);
  }, [gastos]);

  const quantityFormat = (cantidad) => {
    return cantidad.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleResetApp = () => {
    const resultado = confirm("¿Deseas reiniciar presupuesto y gastos?");
    if (resultado) {
      setGastos([]);
      setBudget(0);
      setIsValidBudget(false)
    }
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas mb-20 mt-20">
      <div className="grafica">
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? "#DC2626" : "#3b82f6",
            trailColor: "#F5F5F5",
            textColor: porcentaje > 100 ? "#DC2626" : "#3b82f6",
          })}
          value={porcentaje}
          text={`${porcentaje}% Spent`}
        />
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          Reset App
        </button>
        <p>
          <span>Budget: </span> {quantityFormat(budget)}
        </p>
        <p className={`${available < 0 ? "negativo" : ""}`}>
          <span>Available: </span> {quantityFormat(available)}
        </p>
        <p>
          <span>Spent: </span> {quantityFormat(gastado)}
        </p>
      </div>
    </div>
  );
};

export default BugetControl;
