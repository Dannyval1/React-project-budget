import React from "react";
import NewBudget from "./NewBudget";
import BugetControl from "./BugetControl";

const ControladorGastos = ({
  budget,
  setBudget,
  isValidBudget,
  setIsValidBudget,
  gastos,
  setGastos,
}) => {
  return (
    <>
      <main>
        {isValidBudget ? (
          <BugetControl
            gastos={gastos}
            setGastos={setGastos}
            budget={budget}
            setBudget={setBudget}
            setIsValidBudget={setIsValidBudget}
          />
        ) : (
          <>
            <NewBudget
              budget={budget}
              setBudget={setBudget}
              setIsValidBudget={setIsValidBudget}
            />
          </>
        )}
      </main>
    </>
  );
};

export default ControladorGastos;
