import React, { useEffect, useState } from "react";
import "./CountryDetail.css";
import { Link, useParams, useLocation } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

function CountryDetails() {
  const params = useParams();
  const countryName = params.country;

  const { state } = useLocation();

  const [countryData, setCountryData] = useState(null);
  const [countryNotFound, setCountryNotFound] = useState(false);
  const [isDark] = useTheme();

  function updateCountryData(data) {
    setCountryData({
      name: data.name.common || data.name,
      nativeName: Object.values(data.name.nativeName || {})[0]?.common,
      population: data.population,
      region: data.region,
      subregion: data.subregion,
      capital: data.capital,
      tld: data.tld,
      currencies: Object.values(data.currencies || {})
        .map((currency) => currency.name)
        .join(", "),
      flag: data.flags.svg,
      languages: Object.values(data.languages || {}).join(", "),
      borders: [],
    });

    if (!data.borders) {
      data.borders = [];
    }

    Promise.all(
      data.borders.map((border) => {
        return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderData]) => borderData.name.common);
      }),
    ).then((borders) => {
      setTimeout(() => {
        setCountryData((prevData) => ({
          ...prevData,
          borders,
        }));
      }, 0);
    });
  }

  useEffect(() => {
    if (state) {
      // console.log("inside if STATE: ", state.data);
      updateCountryData(state.data);
      return;
    }
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        console.log("DATA: ", data);
        updateCountryData(data);
      })
      .catch((error) => {
        // console.log(error);
        setCountryNotFound(true);
      });
  }, [countryName]);

  if (countryNotFound) {
    return <div>Country Not Found</div>;
  }

  return countryData === null ? (
    <div>Loading...</div>
  ) : (
    <main className={`${isDark ? "dark" : ""}`}>
      <div className="country-details-container">
        <span className="back-button" onClick={() => history.back()}>
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>
        <div className="country-details">
          <img src={countryData.flag} alt={`${countryData.name} flag`} />
          <div className="details-text-container">
            <h1>{countryData.name}</h1>
            <div className="details-text">
              <p>
                <b>Native Name: {countryData.nativeName}</b>
                <span className="native-name"></span>
              </p>
              <p>
                <b>
                  Population: {countryData.population.toLocaleString("en-IN")}
                </b>
                <span className="population"></span>
              </p>
              <p>
                <b>Region: {countryData.region}</b>
                <span className="region"></span>
              </p>
              <p>
                <b>Sub Region: {countryData.subregion}</b>
                <span className="sub-region"></span>
              </p>
              <p>
                <b>Capital: {countryData.capital.join(", ")}</b>
                <span className="capital"></span>
              </p>
              <p>
                <b>Top Level Domain: {countryData.tld}</b>
                <span className="top-level-domain"></span>
              </p>
              <p>
                <b>Currencies: {countryData.currencies}</b>
                <span className="currencies"></span>
              </p>
              <p>
                <b>Languages: {countryData?.languages}</b>
                <span className="languages"></span>
              </p>
            </div>
            {countryData.borders.length > 0 && (
              <div className="border-countries">
                <b>Border Countries: </b>&nbsp;
                {countryData.borders.map((border) => (
                  <Link key={border} to={`/country/${border}`}>
                    {border}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default CountryDetails;
