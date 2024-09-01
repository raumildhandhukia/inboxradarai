"use client";
import { useEffect, useState } from "react";
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
import { FullPageLoaderLayout } from "./inbox/skeleton";
import { BeatLoader } from "react-spinners";
import GridPattern from "@/components/ui/grid";
import { cn } from "@/lib/utils";
import DotPattern from "@/components/ui/dot";
import { getAILabels } from "@/data/AIOperations";

interface ConfProps {
  plan: Plan;
}

const Conf: React.FC<ConfProps> = ({ plan }) => {
  const [loading, startLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const user = useCurrentUser();
  const router = useRouter();
  const [customLabels, setCustomLabels] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [labels, setLabels] = useState<Label[]>([]);
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

  useEffect(() => {
    const fetchLabels = async () => {
      const labels = await getAILabels(user?.id!);
      setLabels(labels);
    };
    fetchLabels();
  }, [user?.id]);

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
    const isUnique = labels.every(
      (label) => label.label !== newLabel.label.trim()
    );
    if (!isUnique) {
      setError("Label name must be unique");
      return;
    }
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
      startLoading(true);
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

  if (loading) {
    return (
      <FullPageLoaderLayout>
        <BeatLoader color="#6366F1" />
      </FullPageLoaderLayout>
    );
  }

  return (
    <div className="flex justify-between gap-20 items-center w-full h-full">
      <GridPattern
        width={20}
        height={20}
        x={-1}
        y={-1}
        className={cn(
          "!z-0",
          "[mask-image:linear-gradient(to_bottom,white,transparent,transparent)] "
        )}
      />
      <DotPattern
        width={20}
        height={20}
        x={-1}
        y={-1}
        className={cn(
          "[mask-image:linear-gradient(to_top,white,transparent,transparent)] "
        )}
      />
      <Tabs
        value="create-label"
        onValueChange={setCurrentTab}
        defaultValue="create-label"
        className="w-[70%] bg-white dark:bg-neutral-950 z-[1]"
      >
        <TabsList className="w-max">
          <TabsTrigger value="create-label" className="w-max">
            Create Customizable AI Labels in your own words
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create-label">
          <Card>
            <CardHeader>
              <CardTitle>Let&apos;s create personolized AI labels</CardTitle>
              <CardDescription>
                Label name must be unique and cannot be change once its
                assigned.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
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
                {/* {planMaxedOut && <FancyButton>Upgrade Plan</FancyButton>} */}
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
            labels={labels.filter((label) => !label.predefinedId)}
            setLabels={setLabels}
          />
        </div>
      </div>
    </div>
  );
};

export default Conf;
