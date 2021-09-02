import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState } from "react";
import { useRef } from "react";

MapChart.propTypes = {
  mapData: PropTypes.object,
};

MapChart.defaultProps = {
  mapData: {},
};

function MapChart(props) {
  const { mapData } = props;
  const initialOptions = {
    chart: {
      height: 500,
    },
    credits: {
      enabled: false,
    },
    title: {
      text: mapData.title,
      style: {
        color: "#333",
        fontSize: "18px",
      },
    },
    mapNavigation: {
      enabled: true,
    },
    colorAxis: {
      min: 0,
      stops: [
        [0.2, "#FFC4AA"],
        [0.4, "#FF8A66"],
        [0.6, "#FF392B"],
        [0.8, "#B71525"],
        [1, "	#7A0826"],
      ],
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "bottom",
    },
    yAxis: {
      min: 0,
      title: {
        text: "",
      },
    },
    series: [
      {
        name: "Dân số",
        joinBy: ["hc-key", "key"],
      },
    ],
  };
  const [options, setOptions] = useState(initialOptions);
  const ref = useRef(null);
  const [configLoaded, setConfigLoaded] = useState(false);

  useEffect(() => {
    if (Object.keys(mapData).length > 0) {
      const fakeData = mapData.features.map((feature, index) => ({
        key: feature.properties["labelrank"],
        value: index,
      }));
      const optionsClone = {
        ...options,
        series: [
          {
            ...options.series[0],
            mapData: mapData,
            data: fakeData || [],
          },
        ],
      };
      setOptions(optionsClone);
      if (!configLoaded) setConfigLoaded(true);
    }
  }, [mapData]);

  useEffect(() => {
    console.log(ref);
    if (ref.current.chart) {
      console.log(ref.current);
      ref.current.chart.series[0].update({
        mapData,
      });
    }
  }, [mapData, options]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      constructorType={"mapChart"}
      ref={ref}
    ></HighchartsReact>
  );
}

export default MapChart;
