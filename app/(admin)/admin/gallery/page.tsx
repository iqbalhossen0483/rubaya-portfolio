"use client";

import Button from "@/components/utils/Button";
import NoDataFound from "@/components/utils/NoDataFound";
import Spinner from "@/components/utils/Spinner";
import Typography from "@/components/utils/Typography";
import { Gallery } from "@/src/generated/prisma/client";
import {
  useDeleteGalleryMutation,
  useGetGalleriesQuery,
} from "@/store/api/galleryApi";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import GalleryForm from "./GalleryForm";

export default function GalleryPage() {
  const { data: galleries, isLoading } = useGetGalleriesQuery();
  const [deleteGallery] = useDeleteGalleryMutation();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGallery, setEditingGallery] = useState<Gallery | undefined>();

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this gallery item?")) {
      try {
        await deleteGallery(id).unwrap();
        toast.success("Gallery item deleted successfully");
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to delete gallery item");
      }
    }
  };

  const openForm = (gallery?: Gallery) => {
    setEditingGallery(gallery || undefined);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setEditingGallery(undefined);
    setIsFormOpen(false);
  };

  if (isLoading) {
    return <Spinner text="Loading gallery items..." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Typography variant="h3" className="mb-0 text-text-head">
          Gallery Management
        </Typography>
        {!isFormOpen && (
          <Button
            onClick={() => openForm()}
            icon={<Plus className="w-4 h-4" />}
          >
            Add Image
          </Button>
        )}
      </div>

      {isFormOpen ? (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Typography variant="h5" className="mb-6">
            {editingGallery ? "Edit Gallery Item" : "Add New Gallery Item"}
          </Typography>
          <GalleryForm
            initialData={editingGallery}
            onSuccess={closeForm}
            onCancel={closeForm}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleries?.map((gallery) => (
            <div
              key={gallery.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col"
            >
              {gallery.image && (
                <div className="relative w-full h-48">
                  <Image
                    src={gallery.image}
                    alt={gallery.caption}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              )}
              <div className="flex-1 px-3 py-2">
                <div className="flex justify-between items-center">
                  <Typography variant="h6" className="line-clamp-1">
                    {gallery.caption}
                  </Typography>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openForm(gallery)}
                      className="p-1 text-gray-500 hover:text-accent transition-colors"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(Number(gallery.id))}
                      className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {(!galleries || galleries.length === 0) && (
            <NoDataFound
              message={`No gallery items found. Click "Add Image" to create one.`}
            />
          )}
        </div>
      )}
    </div>
  );
}
