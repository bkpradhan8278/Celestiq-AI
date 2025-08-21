import classNames from "classnames";
import { PiGearSixFill } from "react-icons/pi";
import { RiCheckboxCircleFill } from "react-icons/ri";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PROVIDERS, MODELS } from "@/lib/providers";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemo } from "react";
import { useUpdateEffect } from "react-use";
import Image from "next/image";

export function Settings({
  open,
  onClose,
  provider,
  model,
  error,
  isFollowUp = false,
  onChange,
  onModelChange,
}: {
  open: boolean;
  provider: string;
  model: string;
  error?: string;
  isFollowUp?: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: (provider: string) => void;
  onModelChange: (model: string) => void;
}) {
  const modelAvailableProviders = useMemo(() => {
    const availableProviders = MODELS.find(
      (m: { value: string }) => m.value === model
    )?.providers;
    if (!availableProviders) return Object.keys(PROVIDERS);
    return Object.keys(PROVIDERS).filter((id) =>
      availableProviders.includes(id)
    );
  }, [model]);

  useUpdateEffect(() => {
    if (provider !== "auto" && !modelAvailableProviders.includes(provider)) {
      onChange("auto");
    }
  }, [model, provider]);

  return (
    <div className="">
      <Popover open={open} onOpenChange={onClose}>
        <PopoverTrigger asChild>
          <Button variant="black" size="sm">
            <PiGearSixFill className="size-4" />
            Settings
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="!rounded-2xl p-0 !w-96 overflow-hidden !bg-neutral-900"
          align="center"
        >
          <header className="flex items-center justify-center text-sm px-4 py-3 border-b gap-2 bg-neutral-950 border-neutral-800 font-semibold text-neutral-200">
            Customize Settings
          </header>
          <main className="px-4 pt-5 pb-6 space-y-5">
            {error !== "" && (
              <p className="text-red-500 text-sm font-medium mb-2 flex items-center justify-between bg-red-500/10 p-2 rounded-md">
                {error}
              </p>
            )}
            <label className="block">
              <p className="text-neutral-300 text-sm mb-2.5 flex items-center gap-2">
                🤖 Choose a Model
                <span className="text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full px-2 py-0.5">
                  Auto-Smart
                </span>
              </p>
              <Select defaultValue={model} onValueChange={onModelChange}>
                <SelectTrigger className="w-full bg-neutral-800 border-neutral-600 text-white hover:bg-neutral-700 transition-colors">
                  <SelectValue placeholder="Select an AI model" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 border-neutral-600">
                  <SelectGroup>
                    <SelectLabel className="text-neutral-400 px-2 py-1.5 text-xs font-medium">
                      🚀 Smart AI Models
                    </SelectLabel>
                    {MODELS.filter(m => 
                      m.value.includes('gemini') || 
                      m.value.includes('gemma')
                    ).map(
                      ({
                        value,
                        label,
                        isNew = false,
                        isThinker = false,
                      }: {
                        value: string;
                        label: string;
                        isNew?: boolean;
                        isThinker?: boolean;
                      }) => (
                        <SelectItem
                          key={value}
                          value={value}
                          className="text-white hover:bg-neutral-700 focus:bg-neutral-700"
                          disabled={isThinker && isFollowUp}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span>{label}</span>
                            <div className="flex gap-1">
                              {value.includes('flash-lite') && (
                                <span className="text-xs bg-green-500 text-white rounded-full px-1.5 py-0.5">
                                  Default
                                </span>
                              )}
                              {value.includes('gemma') && (
                                <span className="text-xs bg-blue-500 text-white rounded-full px-1.5 py-0.5">
                                  Free
                                </span>
                              )}
                              {isNew && (
                                <span className="text-xs bg-gradient-to-br from-sky-400 to-sky-600 text-white rounded-full px-1.5 py-0.5">
                                  New
                                </span>
                              )}
                            </div>
                          </div>
                        </SelectItem>
                      )
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </label>
            {isFollowUp && (
              <div className="bg-amber-500/10 border-amber-500/10 p-3 text-xs text-amber-500 border rounded-lg">
                Note: You can&apos;t use a Thinker model for follow-up requests.
                We automatically switch to the default model for you.
              </div>
            )}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-300 text-sm mb-1.5">
                    Use auto-provider
                  </p>
                  <p className="text-xs text-neutral-400/70">
                    We&apos;ll automatically select the best provider for you
                    based on your prompt.
                  </p>
                </div>
                <div
                  className={classNames(
                    "bg-neutral-700 rounded-full min-w-10 w-10 h-6 flex items-center justify-between p-1 cursor-pointer transition-all duration-200",
                    {
                      "!bg-sky-500": provider === "auto",
                    }
                  )}
                  onClick={() => {
                    const foundModel = MODELS.find(
                      (m: { value: string }) => m.value === model
                    );
                    if (provider === "auto" && foundModel?.autoProvider) {
                      onChange(foundModel.autoProvider);
                    } else {
                      onChange("auto");
                    }
                  }}
                >
                  <div
                    className={classNames(
                      "w-4 h-4 rounded-full shadow-md transition-all duration-200 bg-neutral-200",
                      {
                        "translate-x-4": provider === "auto",
                      }
                    )}
                  />
                </div>
              </div>
              <label className="block">
                <p className="text-neutral-300 text-sm mb-2">
                  Inference Provider
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {modelAvailableProviders.map((id: string) => (
                    <Button
                      key={id}
                      variant={id === provider ? "default" : "secondary"}
                      size="sm"
                      onClick={() => {
                        onChange(id);
                      }}
                    >
                      <Image
                        src={`/providers/${id}.svg`}
                        alt={PROVIDERS[id as keyof typeof PROVIDERS].name}
                        className="size-5 mr-2"
                        width={20}
                        height={20}
                      />
                      {PROVIDERS[id as keyof typeof PROVIDERS].name}
                      {id === provider && (
                        <RiCheckboxCircleFill className="ml-2 size-4 text-blue-500" />
                      )}
                    </Button>
                  ))}
                </div>
              </label>
            </div>
          </main>
        </PopoverContent>
      </Popover>
    </div>
  );
}
