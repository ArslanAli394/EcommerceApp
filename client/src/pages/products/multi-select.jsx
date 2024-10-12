import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(label, value, theme) {
  return {
    fontWeight: theme.typography.fontWeightRegular,
  };
}

export default function MultipleSelect({ colors, handleSelectedColors }) {
  const theme = useTheme();
  const [selectedColors, setSelectedColors] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedColors(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

    handleSelectedColors(value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={selectedColors}
          onChange={handleChange}
          input={<OutlinedInput label="label" />}
          MenuProps={MenuProps}
        >
          {colors.map((color) => (
            <MenuItem
              key={color.value}
              value={color.value}
              style={getStyles(color.label, color.value, theme)}
            >
              {color.label}
              <span
                style={{
                  width: "3px",
                  height: "3px,",
                  backgroundColor: `${color.value}`,
                  color: `${color.value}`,
                }}
              ></span>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
