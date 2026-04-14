import { useTheme } from "../hooks/useTheme";

function Header() {
  const [isDark, setIsDark] = useTheme();

  const toggleTheme = () => {
    setIsDark(!isDark);
    localStorage.setItem("isDarkMode", JSON.stringify(!isDark));
  };

  return (
    <header className={`header-container ${isDark ? "dark" : ""}`}>
      <div className="header-content">
        <h2 className="title">
          <a href="/">Where in the world?</a>
        </h2>
        <p className="theme-changer" onClick={toggleTheme}>
          <i className={isDark ? "fa-regular fa-sun" : "fa-regular fa-moon"} />
          &nbsp; &nbsp; {isDark ? "Light Mode" : "Dark Mode"}
        </p>
      </div>
    </header>
  );
}

export default Header;
