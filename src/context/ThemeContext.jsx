import React, { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const themeEasingDelay = 500;

    useEffect(() => {
        const userTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        if (!localStorage.getItem("theme")) {
            setTheme(userTheme);
        }
        setTimeout(() => {
            document.body.style.transition = `all ease-in-out ${themeEasingDelay}ms`;
        }, themeEasingDelay);
    }, []);

    useEffect(() => {
        document.body.classList.remove("light", "dark");
        document.body.classList.add(theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export { ThemeContext, ThemeProvider };
