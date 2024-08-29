import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label as ShadCNLabel } from "@/components/ui/label";
import { Label } from "@/types";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { RgbaColorPicker } from "react-colorful";

interface CreateLabelInputsProps {
  labelData: Label;
  updateLabelData: React.Dispatch<React.SetStateAction<Label>>;
  deleteLabel: (id: string) => void;
}

const CreateLabelInputs: React.FC<CreateLabelInputsProps> = ({
  labelData,
  deleteLabel,
  updateLabelData,
}) => {
  const { id, label, description, color } = labelData;
  const [showPicker, setShowPicker] = useState(false);

  const handleButtonClick = () => {
    setShowPicker(!showPicker);
  };

  const getRGBA = (color: string) => {
    const rgbaRegex: RegExp = /rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d*\.?\d+)\)/;
    const match: RegExpMatchArray | null = color.match(rgbaRegex);

    if (match) {
      const [, r, g, b, a] = match;
      const red: number = parseInt(r, 10);
      const green: number = parseInt(g, 10);
      const blue: number = parseInt(b, 10);
      const alpha: number = parseFloat(a);

      return { r: red, g: green, b: blue, a: alpha };
    } else {
      return { r: 0, g: 0, b: 0, a: 0.1 };
    }
  };

  return (
    <div className="flex flex-col gap-y-3 w-full">
      <div className="flex flex-col md:flex-row gap-y-5 gap-x-2 w-full items-center justify-start z-50">
        <div className="space-y-1 relative w-full">
          <div>
            <ShadCNLabel htmlFor="label">Label</ShadCNLabel>
            <Input
              className="w-[50%]"
              id="label"
              value={label || ""}
              onChange={(e) =>
                updateLabelData({ ...labelData, label: e.target.value })
              }
            />
          </div>
          <div className="absolute -right-3 top-7 min-w-fit">
            <Badge
              onClick={handleButtonClick}
              style={{
                backgroundColor: `${color}`,
              }}
              className="text-black flex items-center justify-center rounded-md cursor-pointer"
            >
              {showPicker ? (
                <RgbaColorPicker
                  color={getRGBA(color || "rgba(200, 150, 35, 0.5)")}
                  onChange={(newColor) =>
                    updateLabelData({
                      ...labelData,
                      color: `rgba(${newColor.r}, ${newColor.g}, ${newColor.b}, ${newColor.a})`,
                    })
                  }
                />
              ) : (
                <span className="line-clamp-1 min-w-40 max-w-40 text-center overflow-hidden">
                  {label || "your label"}
                </span>
              )}
            </Badge>
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <ShadCNLabel htmlFor="desc">Description</ShadCNLabel>
        <Textarea
          value={description || ""}
          onChange={(e) =>
            updateLabelData({ ...labelData, description: e.target.value })
          }
          placeholder="Description"
        />
      </div>
    </div>
  );
};
export default CreateLabelInputs;
