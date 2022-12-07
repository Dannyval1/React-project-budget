import React from "react";
import Gasto from "./Gasto";

const ListadoGastos = ({
  gastos,
  setGastoEditar,
  deleteSpent,
  filtro,
  gastosFiltrados,
}) => {
  return (
    <div className="listados-gastos contenedor">
      {filtro ? (
        <>
          <h2>{gastosFiltrados.length ? "Gastos" : "No hay gastos en esta categoria"}</h2>

          {gastosFiltrados.map((gasto) => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setGastoEditar={setGastoEditar}
              deleteSpent={deleteSpent}
            />
          ))}
        </>
      ) : (
        <>
          <h2>{gastos.length ? "Gastos" : "No hay gastos aun"}</h2>

          {gastos.map((gasto) => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setGastoEditar={setGastoEditar}
              deleteSpent={deleteSpent}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default ListadoGastos;
