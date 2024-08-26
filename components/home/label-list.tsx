import React, { useState } from "react";
import { Label } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MdClose, MdEdit, MdSave } from "react-icons/md";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { TagSchema } from "@/schemas";
import { AILabel } from "./inbox/email-detail/email";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";

interface LabelListProps {
  predefined?: boolean;
  labels: Label[];
  setLabels: React.Dispatch<React.SetStateAction<Label[]>>;
}

const LabelList: React.FC<LabelListProps> = ({
  predefined,
  labels,
  setLabels,
}) => {
  const [editingLabelId, setEditingLabelId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<Partial<Label>>({});
  const [error, setError] = useState<string | null>(null);

  const handleEditLabel = (label: Label) => {
    setEditingLabelId(label.id);
    setEditingData({ ...label });
    setError(null); // Clear any previous errors
  };

  const handleSaveLabel = () => {
    // Validate editingData against TagSchema
    const validationResult = TagSchema.safeParse(editingData);
    if (!validationResult.success) {
      setError(validationResult.error.errors[0].message); // Display the first validation error
      return;
    }

    // Update the labels array with the edited label
    setLabels((prevLabels) =>
      prevLabels.map((label) =>
        label.id === editingLabelId ? { ...label, ...editingData } : label
      )
    );

    // Reset editing state
    setEditingLabelId(null);
    setEditingData({});
    setError(null);
  };

  const handleCancelEdit = () => {
    setEditingLabelId(null);
    setEditingData({});
    setError(null);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          {predefined ? "Selected Labels" : "Personalized Labels"}
        </CardTitle>
        <CardDescription>
          {predefined
            ? "Manage your selected labels"
            : "Manage your personalized labels"}
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <ScrollArea
          className={cn(
            "flex flex-wrap gap-2 p-2 pr-4",
            predefined ? "h-[5vh]" : "h-[25vh]"
          )}
        >
          {predefined ? (
            <div className="flex gap-2 flex-wrap">
              {labels.map((label) => (
                <div
                  key={label.id}
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => {
                    setLabels((prev) =>
                      prev.map((prevLabel) =>
                        prevLabel.id === label.id
                          ? { ...prevLabel, isActive: !prevLabel.isActive }
                          : prevLabel
                      )
                    );
                  }}
                >
                  <AILabel
                    className="p-3"
                    bgColor={label.color || "rgba(200, 150, 35, 0.5)"}
                    isActive={label.isActive}
                    deleteLabel={() => {
                      setLabels((prev) =>
                        prev.filter((prevLabel) => prevLabel.id !== label.id)
                      );
                    }}
                  >
                    {label.label}
                  </AILabel>
                </div>
              ))}
            </div>
          ) : (
            labels.map((label) => (
              <div
                key={label.id}
                className="mb-4 p-2 border rounded-lg flex justify-between items-center w-full "
              >
                <div className="flex-grow cursor-pointer">
                  {editingLabelId === label.id ? (
                    <div className="flex flex-col gap-2">
                      <Input
                        value={editingData.label}
                        placeholder="Label"
                        onChange={(e) =>
                          setEditingData((prev) => ({
                            ...prev,
                            label: e.target.value,
                          }))
                        }
                      />
                      <Input
                        value={editingData.description}
                        placeholder="Description"
                        onChange={(e) =>
                          setEditingData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={editingData.isActive}
                          onChange={(e) =>
                            setEditingData((prev) => ({
                              ...prev,
                              isActive: e.target.checked,
                            }))
                          }
                        />
                        <span>Active</span>
                      </div>

                      {error && <p className="text-red-500">{error}</p>}
                      <div className="flex items-center gap-2">
                        <Button
                          className="ml-2"
                          variant="outline"
                          onClick={handleSaveLabel}
                        >
                          <MdSave /> Save
                        </Button>
                        <Button
                          className="ml-2"
                          variant="outline"
                          onClick={handleCancelEdit}
                        >
                          <MdClose /> Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center w-full">
                      <div className="p-2">
                        <div
                          style={{
                            backgroundColor: label.isActive
                              ? label.color || "rgba(200, 150, 35, 0.5)"
                              : "",
                          }}
                          className="font-bold w-fit px-2 rounded-lg -ml-2"
                        >
                          {label.label}
                        </div>
                        <div className="text-sm text-gray-600">
                          {label.description}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* <Button
                          className="ml-2 bg-green-400"
                          variant="outline"
                          onClick={() => handleEditLabel(label)}
                        >
                          <div className="flex gap-1 leading-3">
                            <MdEdit color="white" />
                          </div>
                        </Button> */}
                        <Button
                          onClick={() =>
                            setLabels((prev) =>
                              prev.filter(
                                (prevLabel) => prevLabel.id !== label.id
                              )
                            )
                          }
                          className="ml-2 bg-red-400"
                          variant="outline"
                        >
                          <MdClose color="white" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default LabelList;
