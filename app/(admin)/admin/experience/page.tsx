"use client";

import Button from "@/components/utils/Button";
import NoDataFound from "@/components/utils/NoDataFound";
import Spinner from "@/components/utils/Spinner";
import Typography from "@/components/utils/Typography";
import {
  Experience,
  useDeleteExperienceMutation,
  useGetExperiencesQuery,
} from "@/store/api/experienceApi";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import ExperienceForm from "./ExperienceForm";

export default function ExperienceAdminPage() {
  const { data: experiences, isLoading } = useGetExperiencesQuery();
  const [deleteExperience, { isLoading: isDeleting }] =
    useDeleteExperienceMutation();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<
    Experience | undefined
  >();

  const handleEdit = (exp: Experience) => {
    setEditingExperience(exp);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this experience?")) {
      try {
        await deleteExperience(id).unwrap();
        toast.success("Experience deleted successfully!");
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to delete experience");
      }
    }
  };

  const handleAddNew = () => {
    setEditingExperience(undefined);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingExperience(undefined);
  };

  if (isLoading) {
    return <Spinner text="Loading experiences..." />;
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h3" className="text-text-head">
          Manage Experience
        </Typography>
        {!isFormOpen && (
          <Button onClick={handleAddNew} icon={<Plus size={18} />}>
            Add New
          </Button>
        )}
      </div>

      {isFormOpen ? (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h3">
              {editingExperience ? "Edit Experience" : "Add Experience"}
            </Typography>
            <Button variant="secondary" size="sm" onClick={handleCloseForm}>
              Cancel
            </Button>
          </div>
          <ExperienceForm
            initialData={editingExperience}
            onSuccess={handleCloseForm}
          />
        </div>
      ) : (
        <div className="space-y-4">
          {experiences?.length === 0 && (
            <NoDataFound message="No experience found" />
          )}
          {experiences?.map((exp) => (
            <div
              key={exp.id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row justify-between sm:items-center gap-4"
            >
              <div>
                <Typography variant="h4" className="font-semibold text-accent">
                  {exp.role}
                </Typography>
                <p className="text-gray-700 font-medium">{exp.company}</p>
                <p className="text-sm text-gray-500">
                  {new Date(exp.startDate).toLocaleDateString()} -{" "}
                  {exp.isCurrent || !exp.endDate
                    ? "Present"
                    : new Date(exp.endDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleEdit(exp)}
                >
                  Edit
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="text-red-500! border-red-500! hover:bg-red-50!"
                  onClick={() => handleDelete(exp.id)}
                  disabled={isDeleting}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
