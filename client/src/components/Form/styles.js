import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  smallPaper: {
    padding: theme.spacing(2),
    backgroundColor: "red",
    color: "white",
  },
  bold: {
    fontWeight: 600,
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  fileInput: {
    margin: "10px 0",
  },
  buttonSubmit: {
    marginBottom: 10,
  },
  inputFile: {
    margin: "10px 0",
  },
}));
