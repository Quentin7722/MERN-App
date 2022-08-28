import React, { useEffect, useState } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import * as actionType from "../../constants/actionTypes";
import decode from "jwt-decode";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["lobster", "cursive"].join(","),
  },
});

function Navbar() {
  const classes = useStyles(); // Add material-ui JS styles
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate("/auth");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <ThemeProvider theme={theme}>
        <Link to="/" className={classes.heading}>
          <Typography className={classes.heading} variant="h2" align="center">
            Artworks Hub
          </Typography>
        </Link>
      </ThemeProvider>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              src={user?.result.imageUrl}
            >
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link to="/auth" className={classes.signIn}>
            <Button variant="contained" color="primary">
              Sign In
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
