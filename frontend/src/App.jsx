import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getEvents, postEvent, putEvent, deleteEvent } from "./utils/Axios";
import EventModal from "./components/EventModal";
import EventDetailModal from "./components/EventDetailModal";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";
import { 
  Button, 
  Box, 
  Typography, 
  Container,
  Paper,
  AppBar,
  Toolbar,
  Fab
} from "@mui/material";
import { Add as AddIcon, CalendarMonth } from "@mui/icons-material";

const localizer = momentLocalizer(moment);

export const App = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Llamada inicial a la API
  const loadEvents = async () => {
    try {
      const response = await getEvents();
      const mappedEvents = response.data.map((ev) => ({
        id: ev.id,
        title: ev.title,
        description: ev.description,
        start: new Date(`${ev.startDate}T${ev.startTime}`),
        end: new Date(`${ev.endDate}T${ev.endTime}`),
        allDay: false,
        status: ev.status,
      }));
      setEvents(mappedEvents);
    } catch (err) {
      console.error("Error al obtener eventos:", err);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  // Crear evento
  const handleCreateEvent = async (eventsData) => {
    try {
      // eventsData puede tener 1 o varios eventos
      for (const ev of eventsData) {
        await postEvent(ev);
      }

      loadEvents(); // refrescar lista
      setShowEventModal(false);
    } catch (err) {
      console.error("Error al crear evento:", err);
    }
  };

  // Actualizar evento
  const handleUpdateEvent = async (id, eventData) => {
    try {
      await putEvent(id, eventData);
      loadEvents();
      setShowDetailModal(false);
    } catch (err) {
      console.error("Error al actualizar evento:", err);
    }
  };

  // Eliminar evento
  const handleDeleteEvent = async () => {
    try {
      if (!selectedEvent) return;
      await deleteEvent(selectedEvent.id);
      loadEvents();
      setShowDeleteModal(false);
      setShowDetailModal(false);
    } catch (err) {
      console.error("Error al eliminar evento:", err);
    }
  };

  return (
    <Box 
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        pb: 4
      }}
    >
      {/* Header/AppBar */}
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)"
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          <CalendarMonth sx={{ mr: 2, fontSize: 32, color: "white" }} />
          <Box>
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                fontWeight: 700, 
                color: "white",
                textShadow: "0 2px 4px rgba(0,0,0,0.3)"
              }}
            >
              To-Do App
            </Typography>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: "rgba(255, 255, 255, 0.8)",
                fontWeight: 300
              }}
            >
              Organiza tu tiempo de manera eficiente
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Contenido principal */}
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Paper 
          elevation={12}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)"
          }}
        >
          {/* Header del calendario */}
          <Box 
            sx={{ 
              p: 3, 
              background: "linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)",
              color: "white"
            }}
          >
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 600,
                textShadow: "0 1px 3px rgba(0,0,0,0.3)"
              }}
            >
              📅 Mi Calendario
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                opacity: 0.9,
                mt: 0.5
              }}
            >
              Haz clic en cualquier evento para ver detalles o editarlo
            </Typography>
          </Box>

          {/* Calendario */}
          <Box sx={{ p: 3 }}>
            <Box 
              sx={{ 
                height: "70vh",
                minHeight: 500,
                "& .rbc-calendar": {
                  fontFamily: "'Roboto', sans-serif"
                },
                "& .rbc-header": {
                  backgroundColor: "#f8f9fa",
                  borderColor: "#e9ecef",
                  fontWeight: 600,
                  color: "#495057"
                },
                "& .rbc-event": {
                  backgroundColor: "#4facfe",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "0.85rem",
                  fontWeight: 500
                },
                "& .rbc-today": {
                  backgroundColor: "rgba(79, 172, 254, 0.1)"
                },
                "& .rbc-toolbar": {
                  marginBottom: "20px"
                },
                "& .rbc-toolbar button": {
                  borderRadius: "6px",
                  border: "1px solid #dee2e6",
                  color: "#495057"
                },
                "& .rbc-toolbar button.rbc-active": {
                  backgroundColor: "#4facfe",
                  borderColor: "#4facfe",
                  color: "white"
                }
              }}
            >
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                views={["month", "week", "day"]}
                defaultView={"month"}
                toolbar={true}
                min={new Date(1970, 1, 1, 6, 0)}
                max={new Date(1970, 1, 1, 23, 0)}
                selectable
                date={currentDate}
                onNavigate={date => setCurrentDate(date)}
                onSelectEvent={(event) => {
                  setSelectedEvent(event);
                  setShowDetailModal(true);
                }}
                style={{ height: "100%" }}
              />
            </Box>
          </Box>
        </Paper>
      </Container>

      {/* Botón flotante para añadir evento */}
      <Fab
        color="primary"
        aria-label="add event"
        onClick={() => setShowEventModal(true)}
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
          background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
          boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
          "&:hover": {
            background: "linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)",
            boxShadow: "0 12px 30px rgba(102, 126, 234, 0.6)",
            transform: "translateY(-2px)"
          },
          transition: "all 0.3s ease"
        }}
      >
        <AddIcon sx={{ fontSize: 28 }} />
      </Fab>

      {/* Modales */}
      {showEventModal && (
        <EventModal
          onClose={() => setShowEventModal(false)}
          onSave={handleCreateEvent}
        />
      )}

      {showDetailModal && selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setShowDetailModal(false)}
          onUpdate={handleUpdateEvent}
          onDelete={() => setShowDeleteModal(true)}
        />
      )}

      {showDeleteModal && (
        <ConfirmDeleteModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteEvent}
        />
      )}
    </Box>
  );
};

export default App;