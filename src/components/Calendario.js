import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Calendario = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    sede: '',
    descripcion: '',
    start: '',
    end: '',
    jornada: '',
    taller: '',
    capacitador: '',
    ficha: '',
    allDay: false
  });

  const handleDateClick = (info) => {
    setNewEvent({ ...newEvent, start: info.dateStr });
    setShowModal(true); // abre el modal cuando se hace clic en una fecha
  };

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setNewEvent({
      title: info.event.title,
      sede: info.event.extendedProps.sede,
      descripcion: info.event.extendedProps.descripcion,
      start: info.event.startStr,
      end: info.event.endStr || '',
      jornada: info.event.extendedProps.jornada,
      taller: info.event.extendedProps.taller,
      capacitador: info.event.extendedProps.capacitador,
      ficha: info.event.extendedProps.ficha,
      allDay: info.event.allDay
    });
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleEventSubmit = () => {
    if (isEditMode && selectedEvent) {
      const updatedEvents = events.map(event =>
        event.id === selectedEvent.id
          ? { ...event, ...newEvent }
          : event
      );
      setEvents(updatedEvents);
    } else {
      setEvents([...events, { ...newEvent }]);
    }
    setShowModal(false);
    setIsEditMode(false);
    setSelectedEvent(null);
    setNewEvent({ title: '', sede: '', descripcion: '', start: '', end: '', jornada: '', taller: '', capacitador: '', ficha: '', allDay: false });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const getEventBackgroundColor = (event) => {
    switch (event.extendedProps.jornada) {
      case 'mañana':
        return '#8ED973';
      case 'tarde':
        return '#44B3E0';
      case 'noche':
        return '#8ED973';
      default:
        return '#3788d8';
    }
  };

  return (
    <>
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events.map(event => ({
            ...event,
            backgroundColor: getEventBackgroundColor(event),
            extendedProps: {
              sede: event.sede,
              descripcion: event.descripcion,
              jornada: event.jornada,
              taller: event.taller,
              capacitador: event.capacitador,
              ficha: event.ficha
            }
          }))}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          editable={true} // Permite arrastrar eventos
        />
      </div>

      {/* Modal para agregar/editar eventos */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? 'Editar Evento' : 'Agregar Evento'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="eventTitle">
              <Form.Label>Título del Evento</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newEvent.title}
                onChange={handleInputChange}
                placeholder="Ingrese el título del evento"
              />
            </Form.Group>
            <Form.Group controlId="eventSede">
              <Form.Label>Sede</Form.Label>
              <Form.Control as="select" name="sede" value={newEvent.sede} onChange={handleInputChange}>
                <option value="52">Sede 52</option>
                <option value="63">Sede 63</option>
                <option value="Fontibón">Fontibón</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="eventDescripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                name="descripcion"
                value={newEvent.descripcion}
                onChange={handleInputChange}
                placeholder="Descripción del evento"
              />
            </Form.Group>
            <Form.Group controlId="eventStart">
              <Form.Label>Hora de inicio</Form.Label>
              <Form.Control
                type="datetime-local"
                name="start"
                value={newEvent.start}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="eventEnd">
              <Form.Label>Hora de finalización</Form.Label>
              <Form.Control
                type="datetime-local"
                name="end"
                value={newEvent.end}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="eventJornada">
              <Form.Label>Jornada</Form.Label>
              <Form.Control as="select" name="jornada" value={newEvent.jornada} onChange={handleInputChange}>
                <option value="mañana">Mañana</option>
                <option value="tarde">Tarde</option>
                <option value="noche">Noche</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="eventTaller">
              <Form.Label>Taller</Form.Label>
              <Form.Control
                type="text"
                name="taller"
                value={newEvent.taller}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="eventCapacitador">
              <Form.Label>Capacitador</Form.Label>
              <Form.Control
                type="text"
                name="capacitador"
                value={newEvent.capacitador}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="eventFicha">
              <Form.Label>Ficha</Form.Label>
              <Form.Control
                type="text"
                name="ficha"
                value={newEvent.ficha}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleEventSubmit}>
            {isEditMode ? 'Guardar Cambios' : 'Agregar Evento'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Calendario;
