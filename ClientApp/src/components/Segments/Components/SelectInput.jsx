import React from "react";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
    width: 200
  }
}));

export default function SelectInput(props) {
  const classes = useStyles();

  return (
    <FormControl className={classes.margin}>
      <InputLabel>{props.name}</InputLabel>
      <Select
        name={props.name}
        onChange={props.handleChange}
        inputProps={{ name: props.name, id: props.id }}
        value={props.value}
        width={2000}
      >
        {props.data.map((point, index) => (
          <option value={point.id} key={point.id}>
            {point.name}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}
