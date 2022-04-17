import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const StyledInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
    fontFamily: "Inter",
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

interface CustomTextFieldProps {
  label?: string;
  defaultValue?: any;
  handleOnChange: (event: any) => void;
}

export const CustomTextField = ({ label, defaultValue, handleOnChange }: CustomTextFieldProps) => {
  return (
    <FormControl variant="standard">
      {label && (
        <InputLabel shrink sx={{ color: "#24354f", fontSize: "18px", fontWeight: 500, textTransform: "uppercase" }}>
          {label}
        </InputLabel>
      )}
      <StyledInput defaultValue={defaultValue ?? defaultValue} onChange={e => handleOnChange(e)} />
    </FormControl>
  );
};
