import { useState } from "react";
import { BasicDatePicker } from "./BasicDatePicker";
import BasicTimePicker from "./BasicTimePicker";
import {
  Box,
  Typography,
  Divider,
  TextField,
  Button,
  Grid,
} from "@mui/material";

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  zIndex: 1000,
};

const modalStyles = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  borderRadius: 2,
  boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
  p: 3,
  width: "90%",
  maxWidth: 550,
  zIndex: 1001
};

const EventDetailModal = ({ event, onClose, onUpdate, onDelete }) => {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    title: event.title,
    description: event.description,
    startDate: event.start.toISOString().slice(0, 10),
    startTime: event.start.toTimeString().slice(0, 5),
    endDate: event.end.toISOString().slice(0, 10),
    endTime: event.end.toTimeString().slice(0, 5),
    status: event.status,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleTimeChange = (name, value) => {
    setForm({ ...form, [name]: value ? value.format("HH:mm") : "" });
  };
  const handleSave = () => {
    onUpdate(event.id, form);
  };

  return (
    <>
      <div style={overlayStyle} onClick={onClose}></div>
      <Box sx={modalStyles} onClick={(e) => e.stopPropagation()}>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#363636", textAlign: "center" }}
        >
          {editMode ? "Editar Evento" : "Detalle del Evento"}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {editMode ? (
          <>
            {/* Título - Campo principal */}
            <TextField
              fullWidth
              label="Título del evento"
              name="title"
              value={form.title}
              onChange={handleChange}
              variant="outlined"
              sx={{ mb: 3 }}
            />

            {/* Descripción - Ocupa todo el ancho */}
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Descripción (opcional)"
              name="description"
              value={form.description}
              onChange={handleChange}
              variant="outlined"
              sx={{ mb: 3 }}
            />

            {/* Sección de fechas */}
            <Typography 
              variant="subtitle1" 
              sx={{ fontWeight: 600, color: "#555", mb: 1 }}
            >
              📅 Fechas y horarios
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <BasicDatePicker
                  label="Fecha inicio"
                  date={form.startDate}
                  onChange={(value) => handleDateChange("startDate", value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <BasicTimePicker
                  label="Hora inicio"
                  time={form.startTime}
                  onChange={(value) => handleTimeChange("startTime", value)}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <BasicDatePicker
                  label="Fecha fin"
                  date={form.endDate}
                  onChange={(value) => handleDateChange("endDate", value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <BasicTimePicker
                  label="Hora fin"
                  time={form.endTime}
                  onChange={(value) => handleTimeChange("endTime", value)}
                />
              </Grid>
            </Grid>
          </>
        ) : (
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "#363636" }}>
              {event.title}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: "#666" }}>
              {event.description}
            </Typography>
            <Typography variant="body2" sx={{ color: "#888" }}>
              {event.start.toLocaleString()} - {event.end.toLocaleString()}
            </Typography>
          </Box>
        )}

        <Box sx={{ display: "flex", gap: 1, mt: 3, flexWrap: "wrap" }}>
          <Button
            variant="outlined"
            onClick={() => setEditMode(!editMode)}
            sx={{ borderRadius: 2, flex: 1, minWidth: "120px" }}
          >
            {editMode ? "Cancelar edición" : "✏️ Editar"}
          </Button>
          
          {editMode && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{ borderRadius: 2, flex: 1, minWidth: "120px" }}
            >
              💾 Guardar
            </Button>
          )}
          
          <Button
            variant="contained"
            color="error"
            onClick={onDelete}
            sx={{ borderRadius: 2, flex: 1, minWidth: "120px" }}
          >
            🗑️ Eliminar
          </Button>
          
          <Button
            variant="outlined"
            color="inherit"
            onClick={onClose}
            sx={{ borderRadius: 2, flex: 1, minWidth: "120px" }}
          >
            ❌ Cerrar
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default EventDetailModal;