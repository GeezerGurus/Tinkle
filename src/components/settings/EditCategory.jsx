import {
  Paper,
  Typography,
  Stack,
  Button,
  TextField,
  useTheme,
  Box,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { CategoryIcons, useCategoryColors } from "../../components/utils";
import { tokens } from "../../theme";
import { patchCategory } from "../../api/categoriesApi";

const EditCategory = ({
  onClose,
  username,
  categoryicon,
  bgcolor,
  refresh,
  id,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const CategoryColors = useCategoryColors();

  const [icon, setIcon] = useState(categoryicon || "");
  const [color, setColor] = useState(bgcolor || "");
  const [name, setName] = useState(username || "");

  const handleChange = async () => {
    const newStatus = {
      icon: icon,
      color: color,
      name: name,
    };

    await patchCategory(id, newStatus);
    refresh();
    onClose(); // Close the modal after handling the change
  };

  const handleIconChange = (e) => {
    setIcon(e.target.value);
  };

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
        backgroundColor: colors.backGround,
        border: `1px solid ${colors.panel.panelBorder}`,
      }}
    >
      {/* Title  */}
      <Typography variant="h4" sx={{ color: colors.text.text1 }}>
        Edit Category
      </Typography>

      <TextField
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          gap: "40px",
          alignItems: "flex-end",
        }}
      >
        <Stack gap={1} width={"20%"}>
          <Typography variant="body2">Icon</Typography>
          <TextField
            select
            value={icon}
            placeholder="Select Icon"
            onChange={handleIconChange}
            displayEmpty
          >
            {Object.keys(CategoryIcons).map((key) => {
              const IconComponent = CategoryIcons[key]; // Get the icon component
              return (
                <MenuItem key={key} value={key}>
                  <IconComponent /> {/* Render the icon component */}
                </MenuItem>
              );
            })}
          </TextField>
        </Stack>

        <Stack gap={1} width={"70%"}>
          <Typography variant="body2">Color</Typography>
          <TextField
            select
            sx={{
              backgroundColor: color,
            }}
            value={color}
            onChange={(e) => setColor(e.target.value)}
            displayEmpty
            placeholder="Choose your color"
          >
            {CategoryColors.map((color) => (
              <MenuItem
                key={color}
                value={color}
                sx={{ backgroundColor: color, height: "30px" }}
              />
            ))}
          </TextField>
        </Stack>
      </Box>

      {/* button  */}
      <Stack
        gap={1}
        direction={isSmallScreen ? "column" : "row"}
        justifyContent={"space-between"}
      >
        <Button
          onClick={handleChange}
          sx={{
            width: "208px",
            height: "40px",
            backgroundColor: colors.purple[600],
            textTransform: "none",
            color: "white",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: colors.purple[200],
            },
          }}
        >
          <Typography variant="body2">Save</Typography>
        </Button>

        <Button
          onClick={onClose}
          sx={{
            width: "208px",
            height: "40px",
            backgroundColor: colors.purple[200],
            "&:hover": {
              backgroundColor: colors.purple[100],
            },
            textTransform: "none",
            borderRadius: "8px",
          }}
        >
          <Typography variant="body2">Cancel</Typography>
        </Button>
      </Stack>
    </Paper>
  );
};

export default EditCategory; // Ensure this is present
