import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const useCategoryColors = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const CategoryColors = [
    colors.category.blue,
    colors.category.light_blue,
    colors.category.light_purple,
    colors.category.purple,
    colors.category.orange,
    colors.category.red,
    colors.category.yellow,
    colors.category.pink,
    colors.category.green,
  ];

  return CategoryColors;
};

export default useCategoryColors;
