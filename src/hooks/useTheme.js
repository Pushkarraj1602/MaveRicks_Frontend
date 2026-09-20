import React, {
    createContext,
    useContext,
    useState,
    useEffect
} from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({
    children
}) => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("MaveRicks-theme") || "light";
    });

    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("MaveRicks-theme", theme);
    }, [theme]);

    const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

    return ( <
        ThemeContext.Provider value = {
            {
                theme,
                setTheme,
                toggleTheme
            }
        } > {
            children
        } <
        /ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);