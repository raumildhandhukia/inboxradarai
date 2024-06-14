import { RgbaColor } from "react-colorful";

export interface Label {
  id: number;
  label: string;
  description: string;
  color: RgbaColor;
  error: string;
}
