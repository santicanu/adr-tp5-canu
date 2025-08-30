import { Box, Typography, Button, Divider } from "@mui/material";

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
  maxWidth: 400,
  textAlign: "center",
  zIndex: 1001
};

const ConfirmDeleteModal = ({ onClose, onConfirm }) => {
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
          Confirmar Eliminación
        </Typography>

        <Divider sx={{ mb: 2 }} />
        
        <Typography 
          variant="h6" 
          sx={{ mb: 3, color: "#666" }}
        >
          ¿Desea eliminar la tarea?
        </Typography>
        
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            variant="contained"
            color="error"
            onClick={onConfirm}
            sx={{ borderRadius: 2, minWidth: "100px" }}
          >
            Sí
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            onClick={onClose}
            sx={{ borderRadius: 2, minWidth: "100px" }}
          >
            No
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ConfirmDeleteModal;