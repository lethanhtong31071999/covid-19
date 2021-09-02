import React from "react";
import PropTypes from "prop-types";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { useState } from "react";
import { useEffect } from "react";
import moment from "moment";
import { Button, ButtonGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

LineChart.propTypes = {
  data: PropTypes.array,
};

LineChart.defaultProps = {
  data: [],
};

const useStyles = makeStyles({
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "1rem",
  },
});

const generateOptions = (data, typeChart = "line") => {
  const name = data[0]?.Country || "";
  const categories =
    data.map((item) => moment(item.Date).format("DD/MM/YY")) || [];
  return {
    chart: {
      height: 500,
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "Tổng số ca nhiễm",
      style: {
        color: "#333",
        fontSize: "18px",
      },
    },
    colors: ["tomato"],
    xAxis: {
      categories: categories,
      crosshair: true,
      title: {
        text: "Ngày nhiễm",
        style: {
          color: "black",
          fontSize: "1rem",
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Số ca nhiễm",
        style: {
          color: "black",
          fontSize: "1rem",
        },
      },
    },
    tooltip: {
      shared: true,
      useHTML: true,
      formatter() {
        return `
          <p style="text-align: center; font-size: 1rem margin:0">Ngày ${this.x}</p>
          <span style="font-size: 0.8rem">Tổng cộng: <b>${this.y} </b>ca</span>
        `;
      },
    },
    series: [
      {
        name: name,
        type: typeChart,
        color: "blue",
        data: data.map((item) => item.Confirmed) || [],
      },
    ],
  };
};

function LineChart(props) {
  const { data } = props;
  const [options, setOptions] = useState({});
  const classes = useStyles();
  const [selectedReportType, setSelectedReportType] = useState("all");

  useEffect(() => {
    let filteredData = [...data];
    let typeChart = "line";

    switch (selectedReportType) {
      case "all": {
        typeChart = "line";
        break;
      }
      case "30days": {
        filteredData = filteredData.slice(filteredData.length - 30);
        break;
      }
      case "7days": {
        filteredData = filteredData.slice(filteredData.length - 7);
        break;
      }
      default:
        break;
    }

    setOptions(generateOptions(filteredData, typeChart));
  }, [data, selectedReportType]);

  return (
    <div>
      <ButtonGroup
        className={classes.buttonGroup}
        size="large"
        color="primary"
        variant="outlined"
        disableElevation
      >
        <Button
          variant={selectedReportType === "all" ? "contained" : "outlined"}
          onClick={() => setSelectedReportType("all")}
        >
          Tất cả
        </Button>
        <Button
          variant={selectedReportType === "30days" ? "contained" : "outlined"}
          onClick={() => setSelectedReportType("30days")}
        >
          30 ngày
        </Button>
        <Button
          variant={selectedReportType === "7days" ? "contained" : "outlined"}
          onClick={() => setSelectedReportType("7days")}
        >
          7 ngày
        </Button>
      </ButtonGroup>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default LineChart;
