import { createContext, useEffect, useState } from "react";


const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isShowSidebar, isSetShowSidebar] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || 'light');

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme == 'dark') {
            root.classList.remove("light");
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
            root.classList.add("light");
        }
        localStorage.setItem("theme", theme)
    }, [theme])
    const toogleTheme = () => setTheme(prevTheme => prevTheme == "light" ? "dark" : "light")
    const sidebarHandler = () => isSetShowSidebar(prev => !prev)
    return (
        <ThemeContext.Provider value={{ theme, toogleTheme,sidebarHandler,isShowSidebar }}>
            {children}
        </ThemeContext.Provider>
    );
};
export { ThemeContext }