import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  border: {
    border: "solid",
  },
  fullHeightCard: {
    height: "100%",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    position: "relative",
    color: "primary",
    padding: "10px",
    border: "solid rgba(0, 0, 0, 0.45) 1px",
    boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
    cursor: "pointer",
    transition: "all 0.7s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  overlay: {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "white",
  },
  overlay2: {
    position: "absolute",
    top: "20px",
    right: "20px",
    color: "white",
  },
  grid: {
    display: "flex",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    margin: "5px",
  },
  title: {
    padding: "0 10px",
    marginBottom: "0",
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
    padding: "5px 8px",
  },
  media: {
    height: "200px",
    backgroundBlendMode: "darken",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  description: {
    padding: "5px 10px",
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    width: "80vw",
    height: "80vh",
    [theme.breakpoints.down("sm")]: {
      height: "40vh",
    },
  },
  modalImg: {
    width: "100%",
    height: "100%",
  },
  btnClose: {
    position: "absolute",
    top: 0,
    right: 0,
    fontSize: "50px",
    color: "white",
    cursor: "pointer",
  },
}));
