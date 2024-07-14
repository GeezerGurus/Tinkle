import React, { useState, useEffect } from "react";
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
  useMediaQuery,
} from "@mui/material";
import Category from "../../components/settings/Category";
import { enqueueSnackbar } from "notistack";
import { CategoryIcons, useCategoryColors } from "../../components/utils";
import { tokens } from "../../theme";
import { getCategories, postCategory } from "../../api/categoriesApi";
import { Loader } from "../../components/utils";

const CategorySettings = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const CategoryColors = useCategoryColors();

  const [errors, setErrors] = useState({});
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState("");
  const [name, setName] = useState("");
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) {
      errors.name = "Name is required";
    }
    if (!color) {
      errors.color = "Select a color";
    }
    if (!icon) {
      errors.icon = "Select an icon";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      console.log({
        name: name,
        icon: icon,
        color: color,
      });
      const newList = {
        name: name,
        icon: icon,
        color: color,
      };
      const createdList = await postCategory(newList);
      console.log("New Category created:", createdList);
      enqueueSnackbar("Category created!", { variant: "success" });
      fetchCategories();
    } catch (error) {
      console.error("Error creating new Category:", error);
    }
  };

  const fetchCategories = async () => {
    setIsLoading(true);
    const res = await getCategories();
    setLists(res || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  const handleIconChange = (e) => {
    setIcon(e.target.value);
  };

  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Loader isLoading={isLoading} />
      <Paper
        sx={{
          mt: "20px",
          width: isSmallScreen ? "80vw" : "70%",
          borderRadius: "12px",
          padding: "34px",
          height: isSmallScreen ? "1000px" : "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: colors.backGround,
          alignItems: "center",
        }}
      >
        <Stack
          width={"100%"}
          gap={1}
          pb={6}
          sx={{
            borderBottom: `2px solid`,
            borderColor: colors.extra.underLine,
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              borderBottom: `2px solid ${colors.extra.underLine}`,
              alignSelf: "flex-start",
            }}
          >
            Create a Category
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: "40px",
              alignItems: "flex-end",
              flexWrap: isLargeScreen ? "wrap" : undefined,
            }}
          >
            <Stack
              gap={2}
              direction="row"
              alignItems="flex-end"
              sx={{ width: isLargeScreen ? "100%" : "60%" }}
            >
              <Stack gap={1} width={"30%"}>
                <Typography variant="body2">Icon</Typography>
                <TextField
                  select
                  value={icon}
                  placeholder="Select Icon"
                  onChange={handleIconChange}
                  error={!!errors.icon}
                  helperText={errors.icon}
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
                  placeholder="Choose your color"
                  error={!!errors.color}
                  helperText={errors.color}
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
            </Stack>

            <Stack
              gap={2}
              direction="row"
              alignItems="flex-end"
              sx={{ width: isLargeScreen ? "100%" : "40%" }}
            >
              <Stack gap={1} width={"100%"}>
                <Typography variant="body2">Name</Typography>
                <TextField
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="New category name"
                  required
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Stack>

              <Button
                onClick={handleSave}
                variant="contained"
                sx={{
                  width: "30%",
                  height: "46px",
                  textTransform: "none",
                  backgroundColor: colors.button.button1,
                  color: colors.text.text1,
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
            borderBottom: `2px solid ${colors.extra.underLine}`,
            alignSelf: "flex-start",
          }}
        >
          Your Categories
        </Typography>

        <Box
          sx={{
            width: "100%",
            height: "auto",
            marginTop: "30px",
            overflowY: "auto",
          }}
        >
          <Grid
            container
            rowGap={6}
            // spacing={3}
            sx={{
              display: "flex",

              justifyContent: "space-between",
              flexDirection: isSmallScreen ? "column" : "row",
            }}
          >
            {lists.map((category, index) => (
              <Category
                key={index}
                id={category._id}
                name={category.name}
                icon={category.icon}
                backgroundColor={category.color}
                refresh={fetchCategories}
              />
            ))}
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default CategorySettings;
