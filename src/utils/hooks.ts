import { useColorScheme } from "@mui/material";
import { useRecoilState } from "recoil";
import { THEME } from "@/context/store";
import { getSystemTheme } from "./client-utils";

export function useTheme() {
  const [theme, _setTheme] = useRecoilState(THEME);
  const { setMode } = useColorScheme();

  const setTheme = (value: string) => {
    value = value.toLowerCase();
    _setTheme(value);

    if (value === "light" || value === "dark") {
      setMode(value);
    } else {
      setMode(getSystemTheme());
    }
  };

  return { theme, setTheme };
}
