import { useTheme } from "next-themes";
import React from "react";

function useColorTheme() {
    const { theme, systemTheme } = useTheme();
    const [myTheme, setMyTheme] = React.useState<string>(theme || "light");

    React.useEffect(() => {
        const currentTheme = theme === "system" ? systemTheme : theme;
        setMyTheme(currentTheme || "light");
    }, [theme, systemTheme]);

    return myTheme;
}

export default useColorTheme;
