"use client";

import Button from "@/components/utils/Button";
import NoDataFound from "@/components/utils/NoDataFound";
import Spinner from "@/components/utils/Spinner";
import Typography from "@/components/utils/Typography";
import { Award } from "@/src/generated/prisma/client";
import {
  useDeleteAwardMutation,
  useGetAwardsQuery,
} from "@/store/api/awardApi";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import AwardForm from "./AwardForm";

export default function AwardPage() {
  const { data: awards, isLoading } = useGetAwardsQuery();
  const [deleteAward] = useDeleteAwardMutation();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAward, setEditingAward] = useState<Award | undefined>();

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this award item?")) {
      try {
        await deleteAward(id).unwrap();
        toast.success("Award item deleted successfully");
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to delete award item");
      }
    }
  };

  const openForm = (award?: Award) => {
    setEditingAward(award || undefined);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setEditingAward(undefined);
    setIsFormOpen(false);
  };

  if (isLoading) {
    return <Spinner text="Loading award items..." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Typography variant="h3" className="mb-0 text-text-head">
          Award Management
        </Typography>
        {!isFormOpen && (
          <Button
            onClick={() => openForm()}
            icon={<Plus className="w-4 h-4" />}
          >
            Add Award
          </Button>
        )}
      </div>

      {isFormOpen ? (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Typography variant="h5" className="mb-6">
            {editingAward ? "Edit Award Item" : "Add New Award Item"}
          </Typography>
          <AwardForm
            initialData={editingAward}
            onSuccess={closeForm}
            onCancel={closeForm}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards?.map((award) => (
            <div
              key={award.id}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col"
            >
              {award.image && (
                <div className="relative w-full h-48">
                  <Image
                    src={award.image}
                    alt={award.title}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <div className="flex-1 px-3 py-2">
                <div className="flex justify-between items-center">
                  <Typography variant="h6" className="line-clamp-1">
                    {award.title}
                  </Typography>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openForm(award)}
                      className="p-1 text-gray-500 hover:text-accent transition-colors"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(Number(award.id))}
                      className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <Typography variant="subtitle2">
                  {award.time_to_receipt}
                </Typography>
                <Typography variant="body2" className="line-clamp-3">
                  {award.description}
                </Typography>
              </div>
            </div>
          ))}
          {(!awards || awards.length === 0) && (
            <NoDataFound
              message={`No award items found. Click "Add Award" to create one.`}
            />
          )}
        </div>
      )}
    </div>
  );
}
