import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SelectInput from "../../components/common/SelectInput";

import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Grid from "@material-ui/core/Grid";

import * as SegmentActions from "../Actions/SegmentActions";

import styles from "../../css/SegmentForm.css";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
    width: 200
  },
  button: {
    margin: theme.spacing(1),
    width: 200,
    height: 40
  },
  root: {
    flexGrow: 1,
    marginTop: 0,
    marginBottom: 0,
    padding: 0
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
      segmentData.startingPointId &&
      segmentData.endingPointId
    )
      SegmentActions.saveSegment(segmentData);
    else setIsFormDialogOpen(true);
  }

  const spacing = [
    [5, 4, 3],
    [9, 3],
    [3, 3, 3, 3]
  ];
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

      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={spacing[0][0]}>
            <SelectInput
              data={props.points}
              handleChange={(event, child) =>
                handleChange("startingPointId", event)
              }
              name="Punkt Początkowy"
              id="startingPoint"
              value={segmentData.startingPointId ?? ""}
              fullWidth
            />
          </Grid>
          <Grid item xs={spacing[0][1]}>
            <SelectInput
              data={props.points}
              handleChange={(event, child) =>
                handleChange("endingPointId", event)
              }
              name="Punkt Końcowy"
              id="endingPoint"
              value={segmentData.endingPointId ?? ""}
            />
          </Grid>
          <Grid item xs={spacing[0][2]}>
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
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={spacing[1][0]} />
          <Grid item xs={spacing[1][1]}>
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              onClick={() => SegmentActions.segmentSelected(-1)}
            >
              Anuluj
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={spacing[2][0]}>
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
          </Grid>
          <Grid item xs={spacing[2][1]}>
            <TextField
              id="standard-number"
              label="Punkty GOT powrót"
              type="number"
              InputLabelProps={{
                shrink: true
              }}
              value={segmentData.pointsBack ?? undefined}
              onChange={(event, child) => handleChange("pointsBack", event)}
            />
          </Grid>
          <Grid item xs={spacing[2][2]}>
            <TextField
              id="standard-number"
              label="Długość (m)"
              type="number"
              InputLabelProps={{
                shrink: true
              }}
              value={segmentData.length ?? undefined}
              onChange={(event, child) => handleChange("length", event)}
            />
          </Grid>
          <Grid item xs={spacing[2][3]}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<DeleteIcon />}
              onClick={() => setIsDialogOpen(true)}
            >
              Usuń Odcinek
            </Button>
          </Grid>
        </Grid>
      </div>
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
