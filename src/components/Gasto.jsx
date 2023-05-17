import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list"
import 'react-swipeable-list/dist/styles.css';
import { formatearFecha } from "../helpers"

import IconoAhorro from "../img/icono_ahorro.svg"
import IconoCasa from "../img/icono_casa.svg"
import IconoComida from "../img/icono_comida.svg"
import IconoGastos from "../img/icono_gastos.svg"
import IconoSalud from "../img/icono_salud.svg"
import IconoSuscripciones from "../img/icono_suscripciones.svg"

const diccionaroIconos ={
    ahorro: IconoAhorro,
    comida: IconoComida,
    casa:IconoCasa,
    gastos:IconoGastos,
    salud: IconoSalud,
    suscripciones: IconoSuscripciones,
}

export const Gasto = ({ gasto, setGastoEditar, eliminarGasto }) => {
  const leadingActions = ()=>(
    <LeadingActions>
      <SwipeAction onClick={()=> setGastoEditar(gasto)}>
        Editar
      </SwipeAction>
    </LeadingActions>
  )

  
  const trailingActions= ()=>(
    <TrailingActions>
      <SwipeAction  onClick={()=> eliminarGasto(gasto.id)} destructive={true}>
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )
  return (
    <SwipeableList>
      <SwipeableListItem 
      leadingActions={leadingActions()}
      trailingActions={trailingActions()}>
    <div className="gasto sombra">
        <div className="contenido-gasto">
            <img src={diccionaroIconos[gasto.categoria]} alt="" />
            <div className="descripcion-gasto">
                <p className="categoria">{gasto.categoria}</p>
                <p className="nombre-gasto">{gasto.nombre}</p>
                <p className="fecha-gasto">Agregado el: {" "}
                <span>{formatearFecha(gasto.fecha)}</span></p>
            </div>
        </div>
        <p className="cantidad-gasto">${gasto.cantidad}</p>
    </div>
    </SwipeableListItem>
    </SwipeableList>
  )
}
