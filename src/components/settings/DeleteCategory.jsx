import {
  Button,
  Paper,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { tokens } from "../../theme";
import { CategoryIcons } from "../utils";
import { deleteCategory } from "../../api/categoriesApi";

const DeleteCategory = ({ onClose, icon, id, color, name, refresh }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const Icon = CategoryIcons[icon];
  const handleDelete = async () => {
    console.log(`Deleting category ${name}`);
    await deleteCategory(id);
    refresh();
    onClose();
  };
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallest = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Paper
      sx={{
        width: isSmallScreen ? "90vw" : "686px",
        gap: theme.spacing(3),
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        padding: isSmallScreen ? "33px 28px" : "32px 112px",
      }}
    >
      {/* Title  */}
      <Stack direction={"row"} gap={1}>
        <Typography
          variant={isSmallest ? "h6" : "h4"}
          sx={{ color: colors.extra.red_accent }}
        >
          DELETE
        </Typography>
        <Typography variant={isSmallest ? "h6" : "h4"}>Category?</Typography>
      </Stack>

      {/* Main  */}
      <Stack direction="row" alignItems="center" spacing={2}>
        <Icon
          sx={{
            width: "40px",
            height: "40px",
            color: "white",
            backgroundColor: color,
            borderRadius: "50%",
            padding: "4px",
          }}
        />
        <Typography variant={isSmallest ? "h6" : "h4"}>{name}</Typography>
      </Stack>
      {/* Text  */}
      <Stack direction={"row"} alignItems={"baseline"} gap={1}>
        <Typography variant="body1" align="center">
          Do you really want to delete category{" "}
          <Typography display={"inline"} variant="h6">
            <b>{name}</b>?
          </Typography>
        </Typography>
      </Stack>

      {/* button  */}

      <Stack
        gap={1}
        direction={isSmallest ? "column" : "row"}
        justifyContent={"space-between"}
      >
        <Button
          onClick={handleDelete}
          sx={{
            width: isSmallScreen ? "134px" : "208px",
            height: isSmallScreen ? "44px" : "40px",
            backgroundColor: colors.purple[600],
            textTransform: "none",
            color: "white",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: colors.purple[200],
            },
          }}
        >
          <Typography variant="body2">Yes</Typography>
        </Button>
        <Button
          onClick={onClose}
          sx={{
            width: isSmallScreen ? "134px" : "208px",
            height: isSmallScreen ? "44px" : "40px",
            backgroundColor: colors.purple[200],
            "&:hover": {
              backgroundColor: colors.purple[100],
            },
            textTransform: "none",
            borderRadius: "8px",
          }}
        >
          <Typography variant="body2">No</Typography>
        </Button>
      </Stack>
    </Paper>
  );
};

export default DeleteCategory;
