import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router";


const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 200,
  },
});

export default function MediaCard({ toon }) {
  const history = useHistory();
  const classes = useStyles();

  const handleClick = () => {
    history.push({
      pathname: `/detail/${toon.webtoon_number}/`,
      state: {
        number: toon.webtoon_number,
      },
    });
  };

  return (
    <Card className={classes.root} onClick={handleClick}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={toon.thumbnail_url}
          title={toon.webtoon_name}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            text-align="center"
          >
            {toon.webtoon_name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
