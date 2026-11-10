import type { ComponentProps } from "react";
import MuiTextField from "@mui/material/TextField";

type TextFieldProps = ComponentProps<typeof MuiTextField>;

export function TextField({ fullWidth = true, ...props }: TextFieldProps) {
  return <MuiTextField variant="outlined" {...props} fullWidth={fullWidth} />;
}
