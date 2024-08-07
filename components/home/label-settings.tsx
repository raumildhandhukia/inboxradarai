"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { TagSchema } from "@/schemas"; // Ensure this path is correct
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import SearchBarLabels from "@/components/home/search-bar-labels";
import { Label, Plan } from "@/types";
import CreateLabelInputs from "@/components/home/inbox/create-label-inputs";
import LabelList from "./label-list";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AILabel } from "@/components/home/inbox/email-detail/email";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import FancyButton from "@/components/ui/fancy-button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { getUserPlan } from "@/actions/plan";

interface ConfProps {
  existingLabels: Label[];
  plan: Plan;
}

const Conf: React.FC<ConfProps> = ({ existingLabels, plan }) => {
  const { toast } = useToast();
  const user = useCurrentUser();
  const router = useRouter();
  const [customLabels, setCustomLabels] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [labels, setLabels] = useState<Label[]>(existingLabels);
  const planMaxedOut =
    plan?.totalTags === labels.length || plan?.customTag === customLabels;
  const [currentTab, setCurrentTab] = useState<string>("select-label");
  const [newLabel, setNewLabel] = useState<Label>({
    id: "9999999",
    label: "",
    description: "",
    color: `rgba(200, 150, 35, 0.5)`,
    isActive: true,
  });

  // Learn This Syntax
  const updateLabel = (
    id: number,
    key: keyof Omit<Label, "id">,
    value: string
  ) => {
    setLabels((prev) =>
      prev.map((label) =>
        label.id === id.toString() ? { ...label, [key]: value } : label
      )
    );
  };

  const deleteLabel = (id: string) => {
    setLabels((prev) => prev.filter((label) => label.id !== id.toString()));
  };

  const handleAddLabel = () => {
    if (customLabels >= plan!.customTag!) {
      toast({
        title: "Upgrade Plan",
        description: `You can only create up to ${
          plan!.customTag
        } custom labels in ${plan!.name} Plan`,
        action: <ToastAction altText="upgrade-now">Upgrade</ToastAction>,
      });
      return;
    }
    if (labels.length >= plan!.totalTags!) {
      toast({
        title: "Upgrade Plan",
        description: `You can only select up to ${
          plan!.totalTags
        } custom labels in ${plan!.name} Plan`,
        action: <ToastAction altText="upgrade-now">Upgrade</ToastAction>,
      });
      return;
    }
    const result = TagSchema.safeParse({
      label: newLabel.label,
      description: newLabel.description,
    });
    if (result.success) {
      setLabels((prev) => [
        ...prev,
        {
          ...newLabel,
        },
      ]);
      setNewLabel({
        id: newLabel.id + 1,
        label: "",
        description: "",
        color: `rgba(200, 150, 35, 0.5)`,
        isActive: true,
      });
      setError("");
      setCustomLabels((prev) => prev + 1);
    } else {
      setError(result.error.errors.map((err) => err.message).join(" "));
    }
  };

  const handleNext = async () => {
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
      setError("Failed to Create Labels");
    }
  };

  const selectLabel = (label: Label, callback: () => void) => {
    if (labels.length >= plan!.totalTags!) {
      toast({
        title: "Upgrade Plan",
        description: `You can only select up to ${
          plan!.totalTags
        } custom labels in ${plan!.name} Plan`,
        action: <ToastAction altText="upgrade-now">Upgrade</ToastAction>,
      });
      return;
    }
    setLabels((prev) => [...prev, label]);
    callback();
  };

  return (
    <div className="flex justify-evenly items-center w-full h-full">
      <Tabs
        value={currentTab}
        onValueChange={setCurrentTab}
        defaultValue={currentTab}
        className="w-[40%] bg-white dark:bg-neutral-950 z-[1]"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="select-label">Select</TabsTrigger>
          <TabsTrigger value="create-label">Create</TabsTrigger>
        </TabsList>
        <TabsContent value="select-label">
          <Card>
            <CardHeader>
              <CardTitle>Choose from popular labels</CardTitle>
              <CardDescription>
                Click on Save Changes to save your label selection when
                you&apos;re done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <SearchBarLabels
                labels={labels}
                setLabels={selectLabel}
                setCurrentTab={setCurrentTab}
                setNewLabel={setNewLabel}
                plan={plan}
              />
              {/* <div className="flex flex-wrap gap-1">
                {labels.length > 0 ? (
                  labels.map((label) => (
                    <AILabel
                      key={label.id}
                      bgColor={label.color || "rgba(200, 150, 35, 0.5)"}
                      deleteLabel={() => {
                        deleteLabel(label.id);
                      }}
                      isActive={false}
                    >
                      {label.label}
                    </AILabel>
                  ))
                ) : (
                  <span>No Labels Selected</span>
                )}
              </div> */}
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="flex justify-between w-full">
                {planMaxedOut && <FancyButton>Upgrade Plan</FancyButton>}
                <Button className="bg-indigo-500" onClick={handleNext}>
                  Save
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="create-label">
          <Card>
            <CardHeader>
              <CardTitle>Let&apos;s create personolized AI labels</CardTitle>
              <CardDescription>
                Don&apos;t worry, you can always change these later.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* <div className="flex justify-start flex-wrap gap-1">
                {labels.map((label) => (
                  <AILabel
                    key={label.id}
                    bgColor={label.color || "rgba(200, 150, 35, 0.5)"}
                    deleteLabel={() => {
                      deleteLabel(label.id);
                    }}
                    isActive={label.isActive}
                  >
                    {label.label}
                  </AILabel>
                ))}
              </div> */}
              {!planMaxedOut && (
                <CreateLabelInputs
                  labelData={newLabel}
                  updateLabelData={setNewLabel}
                  deleteLabel={deleteLabel}
                />
              )}
            </CardContent>
            <CardFooter className="flex flex-col">
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <div className="flex justify-between w-full mt-2">
                {planMaxedOut && <FancyButton>Upgrade Plan</FancyButton>}
                <div className="flex gap-3 justify-end">
                  {!planMaxedOut && (
                    <Button variant="destructive" onClick={handleAddLabel}>
                      Add
                    </Button>
                  )}
                  <Button className="bg-indigo-500" onClick={handleNext}>
                    Save
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="flex flex-col justify-center gap-5 h-full w-[40%] z-[1]">
        <div className="">
          <LabelList
            predefined
            labels={labels.filter((label) => label.predefinedId)}
            setLabels={setLabels}
          />
        </div>
        <div className="">
          <LabelList
            labels={labels.filter((label) => !label.predefinedId)}
            setLabels={setLabels}
          />
        </div>
      </div>
    </div>
  );
};

export default Conf;
