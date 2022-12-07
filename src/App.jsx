import { useState, useEffect } from "react";
import ControladorGastos from "./components/ControladorGastos";
import Filtros from "./components/Filtros";
import ListadoGastos from "./components/ListadoGastos";
import Modal from "./components/Modal";
import Footer from "./components/Footer";
import { generarId } from "./helpers";
import iconNewSpent from "./assets/img/nuevo-gasto.svg";

function App() {
  const [budget, setBudget] = useState(
    localStorage.getItem("presupuesto") ?? 0
  );
  const [isValidBudget, setIsValidBudget] = useState(false);
  const [modal, setModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const [gastos, setGastos] = useState(
    localStorage.getItem("gastos")
      ? JSON.parse(localStorage.getItem("gastos"))
      : []
  );
  const [gastoEditar, setGastoEditar] = useState({});
  const [filtro, setFiltro] = useState("");
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);
      setTimeout(() => {
        setAnimateModal(true);
      }, 300);
    }
  }, [gastoEditar]);

  const handleNewSpent = () => {
    setModal(true);
    setGastoEditar({});
    setTimeout(() => {
      setAnimateModal(true);
    }, 300);
  };

  const saveSpent = (spent) => {
    if (spent.id) {
      //Actualizar
      const gastosActualizados = gastos.map((gastoState) =>
        gastoState.id === spent.id ? spent : gastoState
      );
      setGastos(gastosActualizados);
    } else {
      //Nuevo gasto
      spent.id = generarId();
      spent.fecha = Date.now();
      setGastos([...gastos, spent]);
      setGastoEditar({});
    }

    setAnimateModal(false);

    setTimeout(() => {
      setModal(false);
    }, 300);
  };

  const deleteSpent = (id) => {
    const gastosActualizados = gastos.filter((gasto) => gasto.id !== id);
    setGastos(gastosActualizados);
  };

  useEffect(() => {
    Number(localStorage.setItem("presupuesto", budget) ?? 0);
  }, [budget]);

  useEffect(() => {
    const presupuestoLS =
      Number(localStorage.getItem("presupuesto", budget)) ?? 0;

    if (presupuestoLS > 0) {
      setIsValidBudget(true);
    }
  }, []);

  useEffect(() => {
    if (filtro) {
      //Actualizar gasto por categoria
      const gastosFiltrado = gastos.filter(
        (gasto) => gasto.categoria === filtro
      );
      setGastosFiltrados(gastosFiltrado);
    }
  }, [filtro]);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
  }, [gastos]);

  return (
    <div id="all-content" className={modal ? "fijar" : ""}>
      <header>
        <h1>Expense Planner</h1>
      </header>
      <ControladorGastos
        gastos={gastos}
        setGastos={setGastos}
        budget={budget}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
      />

      {isValidBudget && (
        <>
          <main>
            <Filtros filtro={filtro} setFiltro={setFiltro} />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              deleteSpent={deleteSpent}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={iconNewSpent}
              onClick={handleNewSpent}
              alt="Icon New Spent"
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          animateModal={animateModal}
          setAnimateModal={setAnimateModal}
          setModal={setModal}
          saveSpent={saveSpent}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
