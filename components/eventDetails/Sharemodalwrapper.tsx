"use client";

import Button from "@/components/utils/Button";
import { Share2 } from "lucide-react";
import { useState } from "react";
import ShareModal from "./Sharemodal";

interface ShareModalWrapperProps {
  title: string;
  url?: string;
}

export default function ShareModalWrapper({
  title,
  url,
}: ShareModalWrapperProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="icon"
        icon={<Share2 className="w-4 h-4" />}
        onClick={() => setOpen(true)}
      >
        Share
      </Button>

      <ShareModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={title}
        url={url}
      />
    </>
  );
}
