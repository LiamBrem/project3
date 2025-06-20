import { useState } from "react";
import { BsSun, BsMoon } from "react-icons/bs";
import { useTheme } from "../../ThemeContext";
import "./ThemeToggle.css";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleThemeChange = () => {
    setIsDarkMode((prev) => !prev);
    toggleTheme();
  };

  return (
    <button className="theme-toggle" onClick={handleThemeChange}>
      {isDarkMode ? (
        <BsSun className="theme-icon" />
      ) : (
        <BsMoon className="theme-icon" />
      )}
    </button>
  );
};

export default ThemeToggle;
