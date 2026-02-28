import { TextField, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Input = ({
  name,
  handleChange,
  label,
  autoFocus,
  type,
  handleShowPassword,
}) => (
  <TextField
    name={name}
    onChange={handleChange}
    variant="outlined"
    required
    fullWidth
    label={label}
    autoFocus={autoFocus}
    type={type}
    sx={{ mb: 2 }}
    InputProps={
      name === "password"
        ? {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword} edge="end">
                  {type === "password" ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }
        : undefined
    }
  />
);

export default Input;
