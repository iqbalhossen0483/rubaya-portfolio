"use client";

import SectionDescriptionForm from "@/components/admin/SectionDescriptionForm";
import Button from "@/components/utils/Button";
import Card from "@/components/utils/Card";
import NoDataFound from "@/components/utils/NoDataFound";
import Spinner from "@/components/utils/Spinner";
import Typography from "@/components/utils/Typography";
import { Event } from "@/src/generated/prisma/client";
import {
  useDeleteEventMutation,
  useGetEventsQuery,
} from "@/store/api/eventApi";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import EventForm from "./EventForm";

export default function EventPage() {
  const { data: events, isLoading } = useGetEventsQuery();
  const [deleteEvent] = useDeleteEventMutation();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | undefined>();

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEvent(id).unwrap();
        toast.success("Event deleted successfully");
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to delete event");
      }
    }
  };

  const openForm = (event?: Event) => {
    setEditingEvent(event || undefined);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setEditingEvent(undefined);
    setIsFormOpen(false);
  };

  if (isLoading) {
    return <Spinner text="Loading events..." />;
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-border-custom pb-4 mb-6">
        <Typography variant="h3" className="text-text-head">
          Manage Event Section
        </Typography>
        <Typography variant="body2" className="text-text-light mt-1">
          Update the event information on your portfolio homepage.
        </Typography>
      </div>

      <Card className="p-6 mb-6">
        <Typography variant="h5" className="mb-6">
          Section Description
        </Typography>
        <SectionDescriptionForm
          section="event_section_description"
          title="Section description"
        />
      </Card>
      <div className="flex justify-between items-center">
        <Typography variant="h3" className="mb-0 text-text-head">
          Event Management
        </Typography>
        {!isFormOpen && (
          <Button
            onClick={() => openForm()}
            icon={<Plus className="w-4 h-4" />}
          >
            Add Event
          </Button>
        )}
      </div>

      {isFormOpen ? (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Typography variant="h5" className="mb-6">
            {editingEvent ? "Edit Event" : "Add New Event"}
          </Typography>
          <EventForm
            initialData={editingEvent}
            onSuccess={closeForm}
            onCancel={closeForm}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events?.map((event) => (
            <div
              key={event.id}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col"
            >
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <Typography variant="h6" className="line-clamp-2">
                    {event.title}
                  </Typography>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openForm(event)}
                      className="p-1 text-gray-500 hover:text-accent transition-colors"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(Number(event.id))}
                      className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <Typography variant="subtitle2" className="mb-2">
                  {event.role}
                </Typography>
                <Typography variant="body2" className="mb-2">
                  {new Date(event.date).toLocaleDateString()} • {event.location}
                </Typography>
                <Typography variant="body2" className="line-clamp-3 mt-4">
                  {event.description}
                </Typography>
              </div>
            </div>
          ))}
          {(!events || events.length === 0) && (
            <NoDataFound
              message={`No events found. Click "Add Event" to create one.`}
            />
          )}
        </div>
      )}
    </div>
  );
}
