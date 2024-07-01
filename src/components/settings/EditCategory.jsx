import {
  Paper,
  Typography,
  Stack,
  Button,
  TextField,
  useTheme,
  Box,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MovieIcon from "@mui/icons-material/Movie";
import { Icons as iconsMap } from "../../components/utils";
import { tokens } from "../../theme";

const categories = [
  { icon: HomeIcon, backgroundColor: "red", name: "Home" },
  { icon: WorkIcon, backgroundColor: "blue", name: "Work" },
  { icon: SchoolIcon, backgroundColor: "green", name: "School" },
  { icon: ShoppingCartIcon, backgroundColor: "purple", name: "Shopping" },
  { icon: FitnessCenterIcon, backgroundColor: "orange", name: "Fitness" },
  { icon: RestaurantIcon, backgroundColor: "brown", name: "Food" },
  { icon: LocalLibraryIcon, backgroundColor: "teal", name: "Library" },
  { icon: DirectionsCarIcon, backgroundColor: "pink", name: "Travel" },
  { icon: LocalHospitalIcon, backgroundColor: "grey", name: "Health" },
  { icon: MovieIcon, backgroundColor: "yellow", name: "Movies" },
  { icon: HomeIcon, backgroundColor: "red", name: "Home" },
  { icon: WorkIcon, backgroundColor: "blue", name: "Work" },
  { icon: SchoolIcon, backgroundColor: "green", name: "School" },
  { icon: ShoppingCartIcon, backgroundColor: "purple", name: "Shopping" },
  { icon: FitnessCenterIcon, backgroundColor: "orange", name: "Fitness" },
  { icon: RestaurantIcon, backgroundColor: "brown", name: "Food" },
  { icon: LocalLibraryIcon, backgroundColor: "teal", name: "Library" },
  { icon: DirectionsCarIcon, backgroundColor: "pink", name: "Travel" },
  { icon: LocalHospitalIcon, backgroundColor: "grey", name: "Health" },
  { icon: MovieIcon, backgroundColor: "yellow", name: "Movies" },
];

const Colors = [
  "red",
  "blue",
  "green",
  "purple",
  "orange",
  "brown",
  "teal",
  "pink",
  "grey",
  "yellow",
];

const EditCategory = ({ onClose, icon: Icon, backgroundColor }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [icon, setIcon] = useState("");
  const [color, setColor] = useState("");
  const [name, setName] = useState("");

  const handleDelete = () => {
    console.log(`Deleting category ${name}`);
    onClose();
  };

  return (
    <Paper
      sx={{
        width: "686px",
        height: "343px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 116px",
      }}
    >
      {/* Title  */}
      <Typography variant="h4" sx={{ color: colors.purple[900] }}>
        Edit Category
      </Typography>

      <TextField
        fullWidth
        label="Name"
        placeholder="Enter a name"
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
            onChange={(e) => setIcon(e.target.value)}
            displayEmpty
          >
            {iconsMap.map((Icon, index) => (
              <MenuItem key={index} value={Icon}>
                <Icon />
              </MenuItem>
            ))}
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
            {Colors.map((color) => (
              <MenuItem
                key={color}
                value={color}
                sx={{ backgroundColor: color, height: "30px" }}
              />
            ))}
          </TextField>
        </Stack>
      </Box>

      {/* Delete button  */}
      <Stack gap={1} direction={"row"} justifyContent={"space-between"}>
        <Button
          onClick={handleDelete}
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

export default EditCategory;
