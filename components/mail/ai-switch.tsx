import React from "react";
import { Switch, VisuallyHidden, useSwitch } from "@nextui-org/react";
import { BotOff, Bot } from "lucide-react";

const ThemeSwitch = ({ isSelected }: { isSelected: boolean }) => {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="w-8 h-8
              flex items-center justify-center
              rounded-lg bg-default-100 hover:bg-default-200"
      >
        {isSelected ? <Bot /> : <BotOff />}
      </div>

      <p className="text-default-500 select-none">
        Lights: {isSelected ? "on" : "off"}
      </p>
    </div>
  );
};

export default ThemeSwitch;
