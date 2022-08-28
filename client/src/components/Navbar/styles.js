import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  appBar: {
    marginBottom: "6vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 50px",
    border: "solid 2px black",
    backgroundColor: "black",
    color: "white",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  heading: {
    textDecoration: "none",
    color: "white",
  },
  image: {
    marginLeft: "15px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "fit-content",
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "fit-content",
  },
  userName: {
    display: "flex",
    alignItems: "center",
    padding: "0 25px",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    border: "solid 2px white",
  },
  signIn: {
    textDecoration: "none",
  },
}));
