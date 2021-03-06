import React, { useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { AuthContext } from "../Context/context";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import FaceIcon from "@material-ui/icons/Face";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import FormDialog from "../Components/FormDialog";


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
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: "20px",
  },
}));

const Profile = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const classes = useStyles();

  return authContext.isLoggedIn ? (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FaceIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          style={{ marginBottom: "100px" }}
        >
          {authContext.username}님의 프로필
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            닉네임
          </Grid>
          <Grid item xs={9}>
            {authContext.username}
          </Grid>
          <Grid item xs={3}>
            이메일
          </Grid>
          <Grid item xs={9}>
            {authContext.email}
          </Grid>
          <Grid item xs={3}>
            비밀번호
          </Grid>
          <Grid item xs={6}>
            ************
          </Grid>
          <Grid item xs={3}>
            <FormDialog />
          </Grid>
        </Grid>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={async (e) => {
            e.preventDefault();
            await authContext.logout();
            history.push("/login");
          }}
        >
          로그아웃 하기!
        </Button>
      </div>
    </Container>
  ) : (
    <Redirect
      to={{
        pathname: "/login",
      }}
    />
  );
};

export default Profile;
