import {
  Paper,
  Box,
  Typography,
  Stack,
  Button,
  MenuItem,
  TextField,
  Grid,
  useTheme,
  useMediaQuery
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
import { CategoryIcons as iconsMap } from "../../components/utils";
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

const CategorySettings = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [icon, setIcon] = useState("");
  const [color, setColor] = useState("");
  const [name, setName] = useState("");

  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isLaptop = useMediaQuery(theme.breakpoints.down("laptop"));
  const isSmallest = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        
      }}
    >
      <Paper
        sx={{
          mt: "20px",
          width: isSmallScreen?"80vw":"70%",
          borderRadius: "12px",
          padding: "34px",
          height: isSmallScreen?"1000px":"100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-",
          alignItems: "center",
          backgroundColor: colors.purple[50],
        }}
      >
        <Stack
          width={"100%"}
          gap={1}
          pb={6}
          sx={{
            borderBottom: `2px solid black`,
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              borderBottom: `2px solid ${colors.purple[600]}`,
              alignSelf: "flex-start",
            }}
          >
            Create a Category
          </Typography>
          <Box sx={{ display: "flex", gap: "40px", alignItems: "flex-end", flexWrap:isLargeScreen? "wrap":undefined }}>
            <Stack gap={2} direction="row" alignItems="flex-end" sx={{ width:isLargeScreen?"100%": "60%" }}>
            <Stack gap={1} width={"30%"}>
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
            </Stack>

            <Stack gap={2} direction="row" alignItems="flex-end" sx={{ width:isLargeScreen?"100%": "40%" }}>
              <Stack gap={1} width={"100%"}>
                <Typography variant="body2">Name</Typography>
                <TextField
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="New category name"
                />
              </Stack>

              <Button
                variant="contained"
                sx={{
                  width: "30%",
                  height: "46px",
                  textTransform: "none",
                  backgroundColor: colors.purple[600],
                }}
              >
                Add
              </Button>
            </Stack>
          </Box>

        </Stack>
        <Typography
          marginTop={"20px"}
          variant="h4"
          gutterBottom
          sx={{
            borderBottom: `2px solid ${colors.purple[600]}`,
            alignSelf: "flex-start",
          }}
        >
          Your Categories
        </Typography>

        <Box sx={{ width: "100%", height: "auto", marginTop: "30px", overflowY: "auto" }}>
          <Grid
            container
            rowGap={2}
            sx={{
              display: "flex",
              justifyContent: "space-around",
              flexDirection: isSmallScreen ? "column" : "row"
            }}
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
    </Box>
  );
};

export default CategorySettings;
