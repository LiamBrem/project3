import { useState } from "react";
import { BsSun } from "react-icons/bs";
import { BsMoon } from "react-icons/bs";
import "./ThemeToggle.css";
import { useTheme } from '../../ThemeContext';



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
