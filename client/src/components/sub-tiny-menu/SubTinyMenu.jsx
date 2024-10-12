import React from "react";
import { Select } from "@mui/material";

function SubTinyMenu({ data, type, handleType }) {
  console.log(type);
  let types = ["All", "Hats"];
  return (
    <div className="flex justify-center font-bold pt-5 text-2xl font-sans">
      {/* <Select autoComplete="true" style={{ width: "500px" }}>
        {types.map((t) => (
          <option>{t}</option>
        ))}
      </Select> */}
      {type === "All" ? (
        <span>
          <span
            style={{ cursor: "pointer" }}
            className="border-b-2 rounded-2 border-green-700 drop-shadow-lg shadow-black"
          >
            All
          </span>
          &nbsp;&nbsp;
        </span>
      ) : (
        <span>
          <span onClick={() => handleType("All")} style={{ cursor: "pointer" }}>
            All
          </span>{" "}
          &nbsp;&nbsp;
        </span>
      )}

      {data?.map((collection) =>
        type === collection.title ? (
          <span>
            <span
              style={{ cursor: "pointer" }}
              className="border-b-2 rounded-2 border-green-700 drop-shadow-lg shadow-black"
            >
              {collection.title}
            </span>
            &nbsp;&nbsp;
          </span>
        ) : (
          <span>
            <span
              onClick={() => handleType(collection.title)}
              style={{ cursor: "pointer" }}
            >
              {collection.title}
            </span>
            &nbsp;&nbsp;
          </span>
        )
      )}
    </div>
  );
}

export default SubTinyMenu;
