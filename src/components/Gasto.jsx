import React from "react";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { formatDate } from "../helpers";

import IconAhorro from "../assets/img/icono_ahorro.svg";
import IconCasa from "../assets/img/icono_casa.svg";
import IconComida from "../assets/img/icono_comida.svg";
import IconGastos from "../assets/img/icono_gastos.svg";
import IconOcio from "../assets/img/icono_ocio.svg";
import IconSalud from "../assets/img/icono_salud.svg";

const dictionaryIcons = {
  ahorro: IconAhorro,
  comida: IconComida,
  casa: IconCasa,
  gastos: IconGastos,
  ocio: IconOcio,
  salud: IconSalud,
};

const Gasto = ({ gasto, setGastoEditar, deleteSpent }) => {
  const { categoria, nombre, cantidad, id, fecha } = gasto;

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setGastoEditar(gasto)}>Editar</SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={() => deleteSpent(id)} destructive={true}>
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img src={dictionaryIcons[categoria]} alt="Spent Icon" />
            <div className="descripcion-gasto">
              <p className="categoria">{categoria}</p>
              <p className="nombre-gasto">{nombre}</p>
              <p className="fecha-gasto">
                Agregado el: {""}
                <span>{formatDate(fecha)}</span>
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">${cantidad}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default Gasto;
