import React, { useState, useRef } from "react";
import { withRouter, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import AuthService from "../modules/auth.api";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Join() {
  const form = useRef();
  const history = useHistory();
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AuthService.join(
        username,
        email,
        password,
        passwordConfirm
      );
      history.push("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangePasswordConfirm = (e) => {
    const passwordConfirm = e.target.value;
    setPasswordConfirm(passwordConfirm);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="username"
                required
                name="username"
                variant="outlined"
                fullWidth
                id="username"
                label="?????????"
                autoFocus
                value={username}
                onChange={onChangeUsername}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="?????????(???????????? ???????????????)"
                name="email"
                autoComplete="email"
                value={email}
                onChange={onChangeEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="????????????"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={onChangePassword}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordConfirm"
                label="???????????? ??????"
                type="password"
                id="passwordConfirm"
                autoComplete="current-password-confirm"
                value={passwordConfirm}
                onChange={onChangePasswordConfirm}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            <span>????????????</span>
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                onClick={() => {
                  history.push("/login");
                }}
                variant="body2"
              >
                ????????? ???????????????? ?????????!
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
export default withRouter(Join);
