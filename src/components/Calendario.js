import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Modal, Button, Form } from 'react-bootstrap';
import Select from 'react-select'; // Importa react-select
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
    date: '',
    startTime: '',
    endTime: '',
    taller: '',
    capacitador: '',
    ficha: '',
    allDay: false
  });

  const sedes = [
    { value: '52', label: 'Sede 52' },
    { value: '64', label: 'Sede 64' },
    { value: 'Fontibón', label: 'Fontibón' }
  ];

  const talleres = [
    { value: 'taller1', label: 'Taller 1' },
    { value: 'taller2', label: 'Taller 2' },
    { value: 'taller3', label: 'Taller 3' }
  ];

  const capacitadores = [
    { value: 'capacitador1', label: 'Capacitador 1' },
    { value: 'capacitador2', label: 'Capacitador 2' },
    { value: 'capacitador3', label: 'Capacitador 3' }
  ];

  const fichas = [
    { value: 'ficha1', label: 'Ficha 1' },
    { value: 'ficha2', label: 'Ficha 2' },
    { value: 'ficha3', label: 'Ficha 3' }
  ];

  const handleDateClick = (info) => {
    setNewEvent({
      ...newEvent,
      date: info.dateStr,
      startTime: '',
      endTime: ''
    });
    setShowModal(true);
  };

  const handleEventClick = (info) => {
    const eventProps = info.event.extendedProps;
    setSelectedEvent(info.event);
    setNewEvent({
      title: info.event.title || '',
      sede: sedes.find(sede => sede.value === eventProps.sede) || '',
      descripcion: eventProps.descripcion || '',
      date: info.event.startStr.split('T')[0] || '',
      startTime: info.event.startStr.split('T')[1] || '',
      endTime: info.event.endStr ? info.event.endStr.split('T')[1] || '' : '',
      taller: talleres.find(taller => taller.value === eventProps.taller) || '',
      capacitador: capacitadores.find(capacitador => capacitador.value === eventProps.capacitador) || '',
      ficha: fichas.find(ficha => ficha.value === eventProps.ficha) || '',
      allDay: info.event.allDay || false
    });
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleEventSubmit = () => {
    const start = `${newEvent.date}T${newEvent.startTime}`;
    const end = newEvent.endTime ? `${newEvent.date}T${newEvent.endTime}` : null;
    
    if (isEditMode && selectedEvent) {
      const updatedEvents = events.map(event =>
        event.id === selectedEvent.id
          ? { ...event, ...newEvent, start: start, end: end }
          : event
      );
      setEvents(updatedEvents);
    } else {
      setEvents([...events, { ...newEvent, start: start, end: end }]);
    }
    setShowModal(false);
    setIsEditMode(false);
    setSelectedEvent(null);
    setNewEvent({
      title: '',
      sede: '',
      descripcion: '',
      date: '',
      startTime: '',
      endTime: '',
      taller: '',
      capacitador: '',
      ficha: '',
      allDay: false
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    setNewEvent({ ...newEvent, [actionMeta.name]: selectedOption });
  };

  const getEventBackgroundColor = (event) => {
    const jornada = event.extendedProps.jornada;
    switch (jornada) {
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
          locale='es' // Configura el idioma a español
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
          editable={true}
        />
      </div>

      {/* Modal para agregar/editar eventos */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? 'Editar Evento' : 'Agregar Programación'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="eventTitle">
              <Form.Label>Título de la Programación</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newEvent.title}
                onChange={handleInputChange}
                placeholder="Ingrese el título"
              />
            </Form.Group>
            <Form.Group controlId="eventSede">
              <Form.Label>Sede</Form.Label>
              <Select
                name="sede"
                options={sedes}
                value={newEvent.sede}
                onChange={handleSelectChange}
                placeholder="Selecciona la sede"
              />
            </Form.Group>
            <Form.Group controlId="eventDescripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={newEvent.descripcion}
                onChange={handleInputChange}
                placeholder="Descripción del evento"
              />
            </Form.Group>
            <Form.Group controlId="eventDate">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={newEvent.date}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="eventStartTime">
              <Form.Label>Hora de Inicio</Form.Label>
              <Form.Control
                type="time"
                name="startTime"
                value={newEvent.startTime}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="eventEndTime">
              <Form.Label>Hora de Finalización</Form.Label>
              <Form.Control
                type="time"
                name="endTime"
                value={newEvent.endTime}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="eventTaller">
              <Form.Label>Taller</Form.Label>
              <Select
                name="taller"
                options={talleres}
                value={newEvent.taller}
                onChange={handleSelectChange}
                placeholder="Selecciona el taller"
              />
            </Form.Group>
            <Form.Group controlId="eventCapacitador">
              <Form.Label>Capacitador</Form.Label>
              <Select
                name="capacitador"
                options={capacitadores}
                value={newEvent.capacitador}
                onChange={handleSelectChange}
                placeholder="Selecciona el capacitador"
              />
            </Form.Group>
            <Form.Group controlId="eventFicha">
              <Form.Label>Ficha</Form.Label>
              <Select
                name="ficha"
                options={fichas}
                value={newEvent.ficha}
                onChange={handleSelectChange}
                placeholder="Selecciona la ficha"
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
