import * as React from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function ComboBox(props) {
  const [categoryList, setCategoryList] = React.useState([]);
  React.useEffect(() => {
    axios
      .get("http://localhost:5000/api/category")
      .then((response) => {
        console.log(response);
        if (response.data) {
          debugger;
          let updatedList = [];
          response.data?.map((r) => {
            updatedList.push({
              label: r.title,
            });
          });
          console.log(updatedList);
          setCategoryList(updatedList);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleChangeComboBox = (value) => {
    console.log(value);
    props.handleType(value.label);
  };
  return (
    <Autocomplete
      disablePortal
      onChange={(event, value) => handleChangeComboBox(value)}
      id="combo-box-demo"
      options={categoryList}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Movie" />}
    />
  );
}

export default ComboBox;
