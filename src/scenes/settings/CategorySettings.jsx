import {
  Paper,
  Box,
  Typography,
  Stack,
  Button,
  Select,
  MenuItem,
  TextField,
  Grid,
} from "@mui/material";
import React, { useState } from "react";
import Category from "../../components/settings/Category";
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

const colors = [
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

const CategorySettings = () => {
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState("");
  const [name, setName] = useState("");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Paper
        sx={{
          width: "1269px",
          height: "910px",
          padding: "0 90px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "1089px",
            padding: "0 46px",
            borderBottom: "1px solid black",
            paddingBottom: "77px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          <Typography
            variant="title3"
            sx={{ borderBottom: "1px solid black", pb: 1 }}
          >
            Create new Category
          </Typography>

          <Box sx={{ display: "flex", gap: "43px", alignItems: "flex-end" }}>
            <Stack gap={2}>
              <Typography variant="title">Icon</Typography>
              <Select
                sx={{ width: "120px", height: "56px" }}
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <Typography variant="placeholder">Select Icon</Typography>
                    );
                  }
                  const SelectedIcon = selected;
                  return <SelectedIcon />;
                }}
              >
                {iconsMap.map((Icon, index) => (
                  <MenuItem key={index} value={Icon}>
                    <Icon />
                  </MenuItem>
                ))}
              </Select>
            </Stack>

            <Stack gap={2}>
              <Typography variant="title">Color</Typography>
              <Select
                sx={{
                  width: "255px",
                  height: "56px",
                  backgroundColor: color,
                }}
                value={color}
                onChange={(e) => setColor(e.target.value)}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <Typography variant="placeholder">
                        Choose your color
                      </Typography>
                    );
                  }
                  return (
                    <Box
                      sx={{
                        width: "30px",
                        height: "30px",
                        backgroundColor: selected,
                        borderRadius: "50%",
                      }}
                    />
                  );
                }}
              >
                {colors.map((color) => (
                  <MenuItem
                    key={color}
                    value={color}
                    sx={{ backgroundColor: color, height: "30px" }}
                  />
                ))}
              </Select>
            </Stack>

            <Stack gap={2}>
              <Typography variant="title">Name</Typography>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="New category name"
              />
            </Stack>

            <Button
              variant="contained"
              sx={{
                width: "82px",
                height: "46px",
                backgroundColor: "#2196F3",
                mt: 2,
              }}
            >
              ADD
            </Button>
          </Box>
        </Box>

        <Paper
          sx={{
            width: "1089px",
            height: "573px",
            display: "flex",
            flexDirection: "column",
            mt: 4,
          }}
        >
          <Stack
            sx={{ width: "100%", height: "81px" }}
            justifyContent="center"
            pl={6}
          >
            <Typography variant="title3">Category List</Typography>
          </Stack>

          <Box sx={{ height: "470px", overflowY: "auto" }}>
            <Grid
              container
              columnGap={2}
              sx={{ display: "flex", justifyContent: "space-around" }}
            >
              {categories.map((category, index) => (
                <Category
                  key={index}
                  icon={category.icon}
                  backgroundColor={category.backgroundColor}
                  name={category.name}
                />
              ))}
            </Grid>
          </Box>
        </Paper>
      </Paper>
    </Box>
  );
};

export default CategorySettings;
