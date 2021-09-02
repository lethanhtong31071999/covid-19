import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Grid } from "@material-ui/core";
import LineChart from "../Charts/LineChart";
import MapChart from "../Charts/MapChart";

Summary.propTypes = {
  report: PropTypes.array.isRequired,
  selectedISO2: PropTypes.string,
};

Summary.defaultProps = {
  report: [],
  selectedISO2: "",
};

function Summary({ report, selectedISO2 }) {
  const [mapData, setMapData] = useState({});

  useEffect(() => {
    try {
      const getMapData = async () => {
        if (selectedISO2 !== "") {
          const mapData = await import(
            `@highcharts/map-collection/countries/${selectedISO2}/${selectedISO2}-all.geo.json`
          );
          setMapData(mapData);
        }
      };
      getMapData();
    } catch (error) {
      console.log(error);
    }
  }, [selectedISO2]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={8} md={8} lg={8}>
        <Card elevation={3}>
          <LineChart data={report} />
        </Card>
      </Grid>

      <Grid item xs={12} sm={4} md={4} lg={4}>
        <MapChart mapData={mapData} />
      </Grid>
    </Grid>
  );
}

export default Summary;
