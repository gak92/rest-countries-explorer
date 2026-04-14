import "./CountriesListShimmer.css";

function CountriesListShimmer() {
  // new Array(19).fill(0)

  const shimmerCards = Array.from({ length: 19 }).map((_, index) => (
    <div key={index} className="country-card shimmer-card"></div>
  ));

  return <div className="countries-container">{shimmerCards}</div>;
}

export default CountriesListShimmer;
