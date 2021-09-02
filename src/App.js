import "./App.css";
import Highlight from "./components/Highlight";
import Summary from "./components/Summary";
import CountrySelector from "./components/CountrySelector";
import { useEffect, useState } from "react";
import countriesApi from "./api/countriesApi";
import { Container, Grid, Typography } from "@material-ui/core";
import { sortBy } from "lodash";

function App() {
  const [countries, setCountries] = useState([]);
  const [report, setReport] = useState([]);

  // Set default is in VN
  const [selectedISO2, setSelectedISO2] = useState("vn");

  useEffect(() => {
    const getCountries = async () => {
      let data = await countriesApi.getAll();
      data = sortBy(data, "Country");
      setCountries(data);
    };
    getCountries();
  }, []);

  const handleOnChange = (ISO2) => {
    setSelectedISO2(ISO2);
  };

  // Call api report
  useEffect(() => {
    try {
      const getReportByCountry = async () => {
        const country =
          countries.find(
            (country) => country.ISO2.toLowerCase() === selectedISO2
          ) || {};
        if (!country.Slug) return;
        const countryName = country.Slug;
        const data = await countriesApi.getReportByCountry(countryName);
        data.pop();
        setReport(data);
      };
      getReportByCountry();
    } catch (error) {
      console.log(error);
    }
  }, [selectedISO2, countries]);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography variant="h2" component="h1">
            Số liệu COVID-19
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <CountrySelector
            value={selectedISO2}
            countries={countries}
            onChange={handleOnChange}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Highlight report={report} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Summary report={report} selectedISO2={selectedISO2} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
