import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  Typography,
  Box,
  Grid,
  RadioGroup,
} from "@mui/material";

const StyledRadioButtons = ({ options, onSelectionChange ,correctAnswer }) => {
    const [selectedValue, setSelectedValue] = useState("");
  
    const handleChange = (event) => {
      const value = event.target.value;
      setSelectedValue(value);
      if (onSelectionChange) {
        onSelectionChange(value); // Notify the parent about the change
      }
    };
  return (
    <Box
      sx={{
        width: "90%",
        // maxWidth: "800px",
        mx: "auto",
        p: 3,
        mt:5,
        boxShadow: 3,
        borderRadius: 2,
        border:"2px solid #fff"
      }}
    >
      <FormControl component="fieldset" sx={{width:1,justifyContent:"center",justifyItems:"center"}} >
        <RadioGroup value={selectedValue} onChange={handleChange}>
          <Grid container spacing={2} sx={{justifyContent:"center",justifyItems:"center"}} >
            {options.map((option, index) => (
              <Grid item xs={3} key={index}>
                <FormControlLabel
                  value={option}
                  control={
                    <Radio
                      sx={{
                        color: "#fff",
                        "&.Mui-checked": {
                          color: option===correctAnswer? "green":"red",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        fontSize: "16px",
                        color:option===selectedValue? option===correctAnswer?"green":"red": "#fff",
                        fontWeight: selectedValue === option ? "bold" : "normal",
                      }}
                    >
                      {option}
                    </Typography>
                  }
                />
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default StyledRadioButtons;
