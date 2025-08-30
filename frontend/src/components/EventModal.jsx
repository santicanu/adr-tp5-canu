import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Divider,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { BasicDatePicker } from "./BasicDatePicker";
import BasicTimePicker from "./BasicTimePicker";

const overlayStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000
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

const EventModal = ({ onClose, onSave }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    status: true,
    recurrent: false,
    repeatCount: 1,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  

  const handleTimeChange = (name, value) => {
    setForm({ ...form, [name]: value ? value.format("HH:mm") : "" });
  };

  const handleSubmit = () => {
    let eventsToSave = [form];

    if (form.recurrent && form.repeatCount > 1) {
      for (let i = 1; i < form.repeatCount; i++) {
        const newStart = new Date(form.startDate);
        newStart.setDate(newStart.getDate() + 7 * i);

        const newEnd = new Date(form.endDate);
        newEnd.setDate(newEnd.getDate() + 7 * i);

        eventsToSave.push({
          ...form,
          startDate: newStart.toISOString().slice(0, 10),
          endDate: newEnd.toISOString().slice(0, 10),
        });
      }
    }

    onSave(eventsToSave);
  };

  return (
    <>
      <div style={overlayStyles} onClick={onClose}></div>
      <Box sx={modalStyles} onClick={(e) => e.stopPropagation()}>
        {/* Título */}
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#363636", textAlign: "center" }}
        >
          Nuevo Evento
        </Typography>

        <Divider sx={{ mb: 2 }} />

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
          {/* Fecha y hora de inicio - En la misma fila */}
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

          {/* Fecha y hora de fin - En la misma fila */}
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

        {/* Sección de repetición */}
        <Typography 
          variant="subtitle1" 
          sx={{ fontWeight: 600, color: "#555", mb: 1, mt: 3 }}
        >
          🔄 Repetición
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Box sx={{ p: 2, bgcolor: "#f8f9fa", borderRadius: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={form.recurrent}
                name="recurrent"
                onChange={handleChange}
                color="primary"
              />
            }
            label="Evento recurrente (semanal)"
            sx={{ mb: form.recurrent ? 2 : 0 }}
          />
          {form.recurrent && (
            <TextField
              type="number"
              name="repeatCount"
              label="Número de semanas a repetir"
              value={form.repeatCount}
              onChange={handleChange}
              inputProps={{ min: 1, max: 52 }}
              size="small"
              sx={{ maxWidth: 250 }}
            />
          )}
        </Box>

        {/* Botones */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 3,
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            color="error"
            onClick={onClose}
            fullWidth
            sx={{ borderRadius: 2 }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            sx={{ borderRadius: 2 }}
          >
            Guardar
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default EventModal;