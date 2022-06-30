import React from "react";
import "./ResultsModal.scss";
import { Modal, Box, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ResultsModal = (props) => {
  if (!props.show) return null;

  const { show, recipe, close } = props;

  return (
    <div className="results-modal">
      <h1>recipe modal</h1>
      <Modal
        open={show}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {recipe.recipe.label}
          </Typography>
          {recipe.recipe?.ingredientLines.map((ingredient) => {
            return (
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {ingredient}
              </Typography>
            );
          })}
        </Box>
      </Modal>
    </div>
  );
};

export default ResultsModal;
