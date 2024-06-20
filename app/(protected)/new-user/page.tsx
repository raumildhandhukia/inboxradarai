"use client";
import { RgbaColorPicker, RgbaColor } from "react-colorful";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { MdDeleteOutline } from "react-icons/md";
import { TagSchema } from "@/schemas"; // Ensure this path is correct
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

interface Label {
  id: number;
  label: string;
  description: string;
  color: RgbaColor;
  error: string;
}

interface CreateLabelInputsProps {
  labelData: Label;
  updateLabel: (
    id: number,
    key: keyof Omit<Label, "id">,
    value: string | RgbaColor
  ) => void;
  deleteLabel: (id: number) => void;
}

const CreateLabelInputs: React.FC<CreateLabelInputsProps> = ({
  labelData,
  updateLabel,
  deleteLabel,
}) => {
  const { id, label, description, color, error } = labelData;

  const [showPicker, setShowPicker] = useState(false);

  const handleButtonClick = () => {
    setShowPicker(!showPicker);
  };

  return (
    <div className="border p-5 rounded-2xl flex flex-col gap-y-3 w-full">
      <div className="flex flex-col md:flex-row gap-y-5 gap-x-2 w-full items-center justify-start">
        <Input
          type="text"
          className="w-[50%] h-12 bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white"
          value={label}
          onChange={(e) => updateLabel(id, "label", e.target.value)}
          placeholder="Label"
        />
        <Badge
          onClick={handleButtonClick}
          style={{
            backgroundColor: `rgba(${color.r},${color.g},${color.b},${color.a})`,
          }}
          className="h-12 w-[50%] flex items-center justify-center rounded-md cursor-pointer"
        >
          {showPicker ? (
            <RgbaColorPicker
              color={color}
              onChange={(newColor) => updateLabel(id, "color", newColor)}
            />
          ) : (
            label
          )}
        </Badge>
        <Button
          className="bg-red-400 w-12 h-12"
          onClick={() => deleteLabel(id)}
        >
          <MdDeleteOutline className="scale-[1.5]" />
        </Button>
      </div>
      <Textarea
        className="h-12 bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white"
        value={description}
        onChange={(e) => updateLabel(id, "description", e.target.value)}
        placeholder="Description"
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

const Conf: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [labels, setLabels] = useState<Label[]>([
    {
      id: 0,
      label: "",
      description: "",
      color: { r: 200, g: 150, b: 35, a: 0.5 },
      error: "",
    },
  ]);

  const updateLabel = (
    id: number,
    key: keyof Omit<Label, "id">,
    value: string | RgbaColor
  ) => {
    setLabels((prev) =>
      prev.map((label) =>
        label.id === id ? { ...label, [key]: value } : label
      )
    );
  };

  const deleteLabel = (id: number) => {
    if (labels.length === 1) {
      return;
    }
    setLabels((prev) => prev.filter((label) => label.id !== id));
  };

  const handleAddLabel = () => {
    if (labels.length >= 3) {
      return;
    }
    setLabels((prev) => [
      ...prev,
      {
        id: prev.length,
        label: "",
        description: "",
        color: { r: 200, g: 150, b: 35, a: 0.5 },
        error: "",
      },
    ]);
  };

  const handleNext = async () => {
    let isValid = true;
    setLabels((prev) =>
      prev.map((label) => {
        const result = TagSchema.safeParse({
          label: label.label,
          description: label.description,
        });
        let error = "";
        if (!result.success) {
          error = result.error.errors.map((err) => err.message).join(" ");
          isValid = false;
        }
        return { ...label, error };
      })
    );
    if (isValid) {
      const res = await fetch("/api/tag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tags: labels }),
      });
      if (res.ok) {
        router.push(DEFAULT_LOGIN_REDIRECT);
      } else {
        setError("Failed to create labels");
      }
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
      <div className="relative shadow-xl bg-gray-900 border border-gray-800 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
        <div className="flex flex-col gap-y-5 min-w-[50vw] items-center">
          <p className="ThemeText text-3xl">Create Labels</p>
          {labels.map((labelData) => (
            <CreateLabelInputs
              key={labelData.id}
              labelData={labelData}
              updateLabel={updateLabel}
              deleteLabel={deleteLabel}
            />
          ))}
          <div className="flex gap-x-5">
            {labels.length < 3 && (
              <Button
                variant="outline"
                className="z-20 w-max h-max bg-gradient-to-br from-[rgba(103,162,178,0.67)] to-[rgba(110,93,237,0.2)]"
                onClick={handleAddLabel}
              >
                Add
              </Button>
            )}
            <Button
              variant="outline"
              className="z-20 w-max h-max bg-gradient-to-br from-[rgba(103,162,178,0.67)] to-[rgba(110,93,237,0.2)]"
              onClick={handleNext}
            >
              Next
            </Button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Conf;
