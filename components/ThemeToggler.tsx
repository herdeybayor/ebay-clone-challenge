import React from "react";
import { useTheme } from "next-themes";
import { HiSun, HiMoon } from "react-icons/hi";

function ThemeToggler() {
    const { theme, setTheme, systemTheme } = useTheme();
    const currentTheme = theme === "system" ? systemTheme : theme;
    const toggleTheme = () => {
        if (currentTheme === "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    };

    const togglerRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        const currentTheme = theme === "system" ? systemTheme : theme;
        if (togglerRef.current && currentTheme) {
            togglerRef.current.checked = currentTheme === "dark";
            setTheme(currentTheme);
        }
    }, [theme, systemTheme]);
    return (
        <label
            htmlFor="large-toggle"
            className="inline-flex relative items-center cursor-pointer"
        >
            <input
                ref={togglerRef}
                type="checkbox"
                value=""
                id="large-toggle"
                className="sr-only peer"
                onChange={toggleTheme}
            />
            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-gray-800 rounded-full peer dark:bg-gray-700 dark:border-gray-600 peer-checked:bg-gray-600"></div>

            <div className="peer-checked:translate-x-full peer-checked:border-white absolute top-0.5 left-[4px] bg-white border-gray-300 border rounded-full h-6 w-6 transition-all flex justify-center items-center">
                {(theme === "system" ? systemTheme : theme) === "dark" ? (
                    <HiSun className="text-black dark:text-gray-600" />
                ) : (
                    <HiMoon className="text-black dark:text-gray-600" />
                )}
            </div>
        </label>
    );
}

export default ThemeToggler;
