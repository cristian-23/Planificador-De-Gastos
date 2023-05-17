import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Filtros } from "./components/Filtros";
import { ListadoGastos } from "./components/ListadoGastos";
import { Modal } from "./components/Modal";
import { generarId } from "./helpers";
import iconoNuevoGasto from "./img/nuevo-gasto.svg";

function App() {
  const [gastos, setGastos] = useState(localStorage.getItem("gastos") ? JSON.parse(localStorage.getItem("gastos")): []);
  const [presupuesto, setPresupuesto] = useState( Number(localStorage.getItem("presupuesto"))?? 0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastoEditar, setGastoEditar] = useState({});
  const [filtro, setFiltro] = useState("")
  const [gastosFiltro, setGastosFiltro] = useState([])


  useEffect(()=>{
    localStorage.setItem("presupuesto", presupuesto ?? 0)

  },[presupuesto])

  useEffect(()=>{
    const presupuestoLs = Number( localStorage.getItem("presupuesto")) ?? 0
    if (presupuestoLs > 0) {
      setIsValidPresupuesto(true)
    }
  },[])

  useEffect(()=>{
    localStorage.setItem("gastos",JSON.stringify(gastos) ?? [])

  },[gastos])

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  }, [gastoEditar]);

  useEffect(()=>{
    if (filtro) {
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro )
      setGastosFiltro(gastosFiltrados)
    }

  }, [filtro])

  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});

    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };
  const guardarGastos = (gasto) => {
    if (gasto.id) {
      const gastosActualizados = gastos.map((gastoState) =>
        gastoState.id == gasto.id ? gasto : gastoState
      );
      setGastos(gastosActualizados);
      setGastoEditar({})
    } else {
      gasto.id = generarId();
      gasto.fecha = Date.now() | setGastos([...gastos, gasto]);
    }

    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };
  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    
    setGastos(gastosActualizados)
  };

  return (
    <>
      <div className={modal ? "fijar" : ""}>
        <Header
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          isValidPresupuesto={isValidPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
          gastos={gastos}
          setGastos={setGastos}
        />

        {isValidPresupuesto && (
          <>
            <main>
              <Filtros 
              filtro={filtro}
              setFiltro={setFiltro}/>
              <ListadoGastos
                gastos={gastos}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
                filtro={filtro}
                gastosFiltro={gastosFiltro}
              />
            </main>
            <div className="nuevo-gasto">
              <img
                src={iconoNuevoGasto}
                alt="icono-nuevo-gasto"
                onClick={handleNuevoGasto}
              />
            </div>
          </>
        )}
        {modal && (
          <Modal
            setModal={setModal}
            animarModal={animarModal}
            setAnimarModal={setAnimarModal}
            guardarGastos={guardarGastos}
            gastoEditar={gastoEditar}
            setGastoEditar={setGastoEditar}
          />
        )}
      </div>
    </>
  );
}

export default App;
