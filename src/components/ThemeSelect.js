import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentTheme, themeChanged } from "../features/theme/themeSlice";
import { THEME } from "../features/theme/themeSlice";

const ThemeSelect = () => {
  const theme = useSelector(getCurrentTheme);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(themeChanged(e.target.value));
  };

  useEffect(() => {
    if (theme === "DARK") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  return (
    <select
      name="theme"
      id="theme"
      className="bg-transparent"
      defaultValue={theme}
      onChange={handleChange}
    >
      {Object.entries(THEME).map(([value, text]) => (
        <option key={value} value={value} className="dark:bg-neutral-800">
          {text}
        </option>
      ))}
    </select>
  );
};

export default ThemeSelect;
