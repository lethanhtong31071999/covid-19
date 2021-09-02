import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

CountrySelector.propTypes = {
  countries: PropTypes.array,
  handleOnChange: PropTypes.func,
};

CountrySelector.defaultProps = {
  countries: [],
  handleOnChange: null,
};

function CountrySelector(props) {
  const { countries, value, onChange } = props;

  const handleOnChange = (e) => {
    if (!onChange) return;
    const selectedCountry = e.target.value;
    onChange(selectedCountry);
  };

  return (
    <FormControl>
      <InputLabel htmlFor="country-selector" shrink>
        Quốc gia
      </InputLabel>
      <Select
        labelId="country-selector"
        value={value}
        onChange={handleOnChange}
      >
        {countries.map((country) => {
          return (
            <MenuItem key={country.ISO2} value={country.ISO2.toLowerCase()}>
              {country.Country}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText>Chọn quốc gia</FormHelperText>
    </FormControl>
  );
}

export default CountrySelector;
