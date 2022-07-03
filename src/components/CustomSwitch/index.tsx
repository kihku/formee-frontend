import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { Box, Tooltip } from "@mui/material";

const StyledSwitch = styled((props: SwitchProps) => (
  <Tooltip title={String(props["aria-label"])} placement="bottom-end">
    <Box>
      <Switch focusVisibleClassName=".Mui-focusVisible" {...props} />
    </Box>
  </Tooltip>
))(({ theme }) => ({
  width: 48,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(22px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? theme.palette.primary : theme.palette.primary,
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: theme.palette.primary,
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#e2e7ed",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 6,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 4,
    },
  },
}));

interface CustomSwitchProps {
  label?: string;
  value?: boolean;
  defaultChecked?: boolean;
  handleOnChange: (event: any) => void;
  tooltipText?: string;
}

export const CustomSwitch = ({ label, value, defaultChecked, handleOnChange, tooltipText }: CustomSwitchProps) => {
  return (
    <FormControlLabel
      control={
        <StyledSwitch checked={value ?? value} defaultChecked={defaultChecked} aria-label={String(tooltipText)} />
      }
      label={label ? label : ""}
      onChange={e => handleOnChange(e)}
      sx={{ margin: "5px" }}
    />
  );
};
