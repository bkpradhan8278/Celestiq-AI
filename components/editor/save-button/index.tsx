/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { toast } from "sonner";
import { MdSave } from "react-icons/md";
import { useParams } from "next/navigation";

import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

export function SaveButton({
  html,
  prompts,
}: {
  html: string;
  prompts: string[];
}) {
  // get params from URL
  const { namespace, repoId } = useParams<{
    namespace: string;
    repoId: string;
  }>();
  const [loading, setLoading] = useState(false);

  const updateSpace = async () => {
    setLoading(true);

    try {
      const res = await api.put(`/me/projects/${namespace}/${repoId}`, {
        html,
        prompts,
      });
      if (res.data.ok) {
        toast.success("Your space is updated! 🎉", {
          action: {
            label: "See Space",
            onClick: () => {
              window.open(
                `https://huggingface.co/spaces/${namespace}/${repoId}`,
                "_blank"
              );
            },
          },
        });
      } else {
        toast.error(res?.data?.error || "Failed to update space");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Button
        variant="default"
        className="max-lg:hidden bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-black font-medium px-3 py-2 rounded-lg transition-all duration-200"
        onClick={updateSpace}
        disabled={loading}
      >
        {loading ? (
          <Loading className="size-4 animate-spin" />
        ) : (
          <MdSave className="size-4" />
        )}
        <span className="ml-2">Save</span>
      </Button>
      <Button
        variant="default"
        size="sm"
        className="lg:hidden bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-black font-medium px-3 py-2 rounded-lg"
        onClick={updateSpace}
        disabled={loading}
      >
        {loading ? (
          <Loading className="size-3 animate-spin" />
        ) : (
          <MdSave className="size-3" />
        )}
        <span className="ml-1 text-sm">Save</span>
      </Button>
    </>
  );
}
