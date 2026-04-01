"use client";

import Button from "@/components/utils/Button";
import NoDataFound from "@/components/utils/NoDataFound";
import Spinner from "@/components/utils/Spinner";
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
        <h1 className="text-2xl font-bold text-text-head">
          Gallery Management
        </h1>
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
          <h2 className="text-xl font-semibold mb-6">
            {editingGallery ? "Edit Gallery Item" : "Add New Gallery Item"}
          </h2>
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
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col"
            >
              <div className="flex-1">
                {gallery.image && (
                  <div className="relative w-full h-48 mb-4">
                    <Image
                      src={gallery.image}
                      alt={gallery.caption}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                )}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-text-head line-clamp-2">
                    {gallery.caption}
                  </h3>
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
