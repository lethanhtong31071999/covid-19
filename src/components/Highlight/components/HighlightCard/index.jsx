import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";

HighlightCard.propTypes = {
  highlight: PropTypes.object,
};

HighlightCard.defaultProps = {
  highlight: {},
};

const useStyles = makeStyles((theme) => {
  return {
    card: {
      borderLeft: (props) => {
        if (props.type === "positive") {
          return "5px solid rgb(201, 48, 44)";
        }
        if (props.type === "negative") {
          return "5px solid rgb(40, 167, 69)";
        }
        return "5px solid gray";
      },
    },
    title: {
      fontSize: 18,
      marginBlock: 5,
    },
    total: {
      fontWeight: "bold",
      fontSize: 18,
    },
  };
});

function HighlightCard(props) {
  const { highlight } = props;
  const classes = useStyles(highlight);
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component="p" variant="body2" className={classes.title}>
          {highlight.title}
        </Typography>
        <Typography component="span" variant="body2" className={classes.total}>
          {highlight.totalCase}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default HighlightCard;
