import Image from "next/image";
import React from "react";

const getFilePreviewUrl = (
  value: File | FileList | string | null,
): string | null => {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (value instanceof File) return URL.createObjectURL(value);
  if (value instanceof FileList && value.length > 0)
    return URL.createObjectURL(value[0]);
  return null;
};

type Props = {
  url: string | File | FileList | null;
};

const ImageViewer = ({ url }: Props) => {
  const previewUrl = getFilePreviewUrl(url);
  if (!url || !previewUrl) return null;
  return (
    <div className="flex justify-center">
      <Image
        src={previewUrl}
        alt="Profile"
        width={200}
        height={200}
        className="object-cover"
      />
    </div>
  );
};

export default ImageViewer;
