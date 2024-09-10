import React, { useState } from "react";
import actividades from "../static/img/actividades.png";
import asesoria_psicologica from "../static/img/asesoria_psicologica.png";
import estudio from "../static/img/estudio.png";
import Calendario from "../components/Calendario.js"; // Importa el componente del calendario
import "bootstrap/dist/css/bootstrap.min.css";

function Iniciosection1() {
  const [showCalendar, setShowCalendar] = useState(false); // Controla la visibilidad del calendario

  const handleLoginClick = () => {
    setShowCalendar(true); // Mostrar el calendario cuando se presiona "Iniciar sesión"
  };

  const handleCloseModal = () => {
    setShowCalendar(false); // Cerrar el calendario cuando se presiona "Volver" o se hace clic fuera del modal
  };
  
  return (
    <div>
      <section className="coffee">
        <div className="coffee-content container">
          <h2>Los diferentes servicios</h2>
          <h3>Asesoría Psicológica</h3>
          <div className="coffee-group" />
          <div className="coffee-1">
            <img src={asesoria_psicologica} alt="asesoria_psicologica" />
            <p className="txt-p ">
              El servicio de asesoría psicológica del SENA ofrece apoyo
              emocional y mental a los estudiantes. Proporciona un espacio
              confidencial para tratar problemas como el estrés académico, la
              ansiedad y la depresión. Los estudiantes pueden acceder a sesiones
              individuales con psicólogos, quienes les ayudan a desarrollar
              estrategias para manejar sus dificultades. Además, se organizan
              talleres sobre técnicas de manejo del estrés y habilidades de
              afrontamiento para mejorar el bienestar emocional y el rendimiento
              académico.
            </p>
            <hr className="linea" />
          </div>
          <br />
          <h3>Actividades Recreativas</h3>
          <div className="coffee-group" />
          <div className="coffee-1">
            <img src={actividades} alt="actividades" />
            <p>
              Las actividades recreativas en el SENA están diseñadas para
              promover el desarrollo integral de los estudiantes fuera del
              ámbito académico. Incluyen eventos deportivos, culturales y
              recreativos que fomentan la participación, el trabajo en equipo y
              el bienestar físico y mental. Estas actividades abarcan desde
              competencias deportivas y talleres artísticos hasta excursiones y
              eventos grupales, ayudando a los estudiantes a integrarse y
              disfrutar de una experiencia educativa más equilibrada.
            </p>
            <hr className="linea" />
            <br />
            <h3>Apoyo Académico</h3>
          </div>
          <div className="coffee-group" />
          <div className="coffee-1">
            <img src={estudio} alt="estudio" />
            <p>
              El apoyo académico del SENA proporciona asistencia para mejorar el
              rendimiento educativo de los estudiantes. Ofrece tutorías
              personalizadas, talleres de técnicas de estudio y asesoría en la
              planificación del tiempo. Los recursos incluyen materiales
              educativos adicionales y acceso a plataformas de aprendizaje,
              todos diseñados para ayudar a los estudiantes a superar
              dificultades académicas, optimizar sus habilidades de estudio y
              gestionar sus responsabilidades educativas de manera más efectiva.
            </p>
          </div>
        </div>
      </section>

      {/* Botón para iniciar sesión */}
      <button onClick={handleLoginClick}>Iniciar sesión</button>

      {showCalendar && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 1000,
          }}
          onClick={handleCloseModal} // Cerrar modal al hacer clic fuera
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
              minWidth: "80%", // Ajusta el tamaño del modal según lo que necesites
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()} // Evitar que el clic en el modal cierre el modal
          >
            {/* Botón para cerrar el modal */}
            <button
              onClick={handleCloseModal}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                backgroundColor: "#f00",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "5px 10px",
                cursor: "pointer"
              }}
            >
              Volver
            </button>

            {/* Calendario */}
            <Calendario />
          </div>
        </div>
      )}
    </div>
  );
}

export default Iniciosection1;
