import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SelectInput from "./SelectInput";

import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import * as SegmentActions from "../Actions/SegmentActions";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
    width: 200
  },
  button: {
    margin: theme.spacing(1),
    width: 200,
    height: 50
  }
}));

export default function SegmentForm(props) {
  const classes = useStyles();

  const [segmentData, setSegmentData] = React.useState(props.selectedSegment);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = React.useState(false);

  useEffect(() => {
    setSegmentData(props.selectedSegment);
  }, [props.selectedSegment]);

  function handleChange(name, event) {
    setSegmentData({
      ...segmentData,
      [name]: event.target.value
    });
  }

  function handleDialogDiscard() {
    setIsDialogOpen(false);
  }

  function handleDialogConfirm() {
    setIsDialogOpen(false);
    SegmentActions.deleteSegment(segmentData.id);
  }

  function handleSaveButtonClicked(event) {
    if (
      segmentData.points &&
      segmentData.pointsBack &&
      segmentData.id &&
      segmentData.startingPointId &&
      segmentData.endingPointId
    )
      SegmentActions.saveSegment(segmentData);
    else setIsFormDialogOpen(true);
  }

  return (
    <>
      <Dialog
        open={isFormDialogOpen}
        onClose={event => setIsFormDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Proszę wypełnić wszystkie pola
        </DialogTitle>
        <DialogActions>
          <Button onClick={event => setIsFormDialogOpen(false)} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isDialogOpen}
        onClose={handleDialogDiscard}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Usunąć odcinek?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Jesteś pewien, że chcesz usunąć odcinek?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogDiscard} color="primary">
            Anuluj
          </Button>
          <Button onClick={handleDialogConfirm} color="primary">
            Potwierdź
          </Button>
        </DialogActions>
      </Dialog>
      <SelectInput
        data={props.points}
        handleChange={(event, child) => handleChange("startingPointId", event)}
        name="Punkt Początkowy"
        id="startingPoint"
        value={segmentData.startingPointId ?? 0}
      />
      <SelectInput
        data={props.points}
        handleChange={(event, child) => handleChange("endingPointId", event)}
        name="Punkt Końcowy"
        id="endingPoint"
        value={segmentData.endingPointId ?? 0}
      />
      <TextField
        id="standard-number"
        label="Punkty GOT"
        type="number"
        InputLabelProps={{
          shrink: true
        }}
        value={segmentData.points ?? undefined}
        onChange={(event, child) => handleChange("points", event)}
      />
      <TextField
        id="standard-number"
        label="Punkty GOT powrót"
        type="number"
        InputLabelProps={{
          shrink: true
        }}
        value={segmentData.pointsBack ?? undefined}
      />
      <TextField
        id="standard-number"
        label="Długość"
        type="number"
        InputLabelProps={{
          shrink: true
        }}
        value={segmentData.length ?? undefined}
      />
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={handleSaveButtonClicked}
      >
        Zapisz
      </Button>
      <Button variant="contained" color="default" className={classes.button}>
        Anuluj
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon />}
        onClick={() => setIsDialogOpen(true)}
      >
        Usuń Odcinek
      </Button>
    </>
  );
}

SegmentForm.propTypes = {
  //   id: PropTypes.number.isRequired,
  //   startingPoint: PropTypes.string.isRequired,
  //   endingPoint: PropTypes.string.isRequired,
  //   length: PropTypes.number.isRequired,
  //   points: PropTypes.number.isRequired,
  //   pointsBack: PropTypes.number.isRequired
};
