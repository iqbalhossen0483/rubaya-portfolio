"use client";

import SectionDescriptionForm from "@/components/admin/SectionDescriptionForm";
import Button from "@/components/utils/Button";
import Card from "@/components/utils/Card";
import NoDataFound from "@/components/utils/NoDataFound";
import Spinner from "@/components/utils/Spinner";
import Typography from "@/components/utils/Typography";
import { Impact } from "@/src/generated/prisma/client";
import {
  useDeleteImpactMutation,
  useGetImpactsQuery,
} from "@/store/api/impactApi";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import ImpactForm from "./ImpactForm";

export default function ImpactPage() {
  const { data: impacts, isLoading } = useGetImpactsQuery();
  const [deleteImpact] = useDeleteImpactMutation();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingImpact, setEditingImpact] = useState<Impact | undefined>();

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this impact item?")) {
      try {
        await deleteImpact(id).unwrap();
        toast.success("Impact item deleted successfully");
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to delete impact item");
      }
    }
  };

  const openForm = (impact?: Impact) => {
    setEditingImpact(impact || undefined);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setEditingImpact(undefined);
    setIsFormOpen(false);
  };

  if (isLoading) {
    return <Spinner text="Loading impact items..." />;
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-border-custom pb-4 mb-6">
        <Typography variant="h3" className="text-text-head">
          Manage Impact Section
        </Typography>
        <Typography variant="body2" className="text-text-light mt-1">
          Update the impact information on your portfolio homepage.
        </Typography>
      </div>

      <Card className="p-6 mb-6">
        <Typography variant="h5" className="mb-6">
          Section Description
        </Typography>
        <SectionDescriptionForm
          section="impact_section_description"
          title="Section description"
        />
      </Card>
      <div className="flex justify-between items-center">
        <Typography variant="h3" className="mb-0 text-text-head">
          Impact Management
        </Typography>
        {!isFormOpen && (
          <Button
            onClick={() => openForm()}
            icon={<Plus className="w-4 h-4" />}
          >
            Add Impact
          </Button>
        )}
      </div>

      {isFormOpen ? (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Typography variant="h5" className="mb-6">
            {editingImpact ? "Edit Impact Item" : "Add New Impact Item"}
          </Typography>
          <ImpactForm
            initialData={editingImpact}
            onSuccess={closeForm}
            onCancel={closeForm}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {impacts?.map((impact) => (
            <div
              key={impact.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col"
            >
              {impact.image && (
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={impact.image}
                    alt={impact.title}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <div className="flex-1 px-3 py-2">
                <div className="flex justify-between items-center">
                  <Typography variant="h6" className="line-clamp-1">
                    {impact.title}
                  </Typography>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openForm(impact)}
                      className="p-1 text-gray-500 hover:text-accent transition-colors"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(Number(impact.id))}
                      className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <Typography variant="body2" className="line-clamp-3">
                  {impact.description}
                </Typography>
              </div>
            </div>
          ))}
          {(!impacts || impacts.length === 0) && (
            <NoDataFound
              message={`No impact items found. Click "Add Impact" to create one.`}
            />
          )}
        </div>
      )}
    </div>
  );
}
