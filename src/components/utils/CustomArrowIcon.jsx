import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export const CustomArrowIcon = ({ open, onClick }) => (
  <ArrowDropDownIcon
    onClick={onClick}
    style={{ cursor: "pointer" }}
    sx={{
      color: "black",
      transform: open ? "rotate(0deg)" : "rotate(-90deg)",
      transition: "transform 0.3s",
    }}
  />
);

export default CustomArrowIcon;
