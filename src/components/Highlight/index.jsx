import { Grid } from "@material-ui/core";
import React from "react";
import HighlightCard from "./components/HighlightCard";
import PropTypes from "prop-types";

Highlight.propTypes = {
  report: PropTypes.array,
};

Highlight.defaultProps = {
  report: [],
};

function Highlight(props) {
  const { report } = props;
  const lastestReport = report.length > 0 ? report[report.length - 1] : [];
  const highlightList = [
    {
      title: "Tổng số ca mắc",
      totalCase: lastestReport.Confirmed || 0,
      type: "positive",
    },
    {
      title: "Tổng số ca khỏi",
      totalCase: lastestReport.Recovered || "-",
      type: "negative",
    },
    {
      title: "Tổng số ca tử vong",
      totalCase: lastestReport.Deaths || 0,
      type: "dead",
    },
  ];

  return (
    <Grid container spacing={3}>
      {highlightList.map((highlight) => (
        <Grid item sm={6} xs={12} lg={3} md={4} key={highlight.type}>
          <HighlightCard highlight={highlight} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Highlight;
