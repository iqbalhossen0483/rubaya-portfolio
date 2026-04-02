import ShareModalWrapper from "@/components/eventDetails/Sharemodalwrapper";
import Button from "@/components/utils/Button";
import Typography from "@/components/utils/Typography";
import prisma from "@/lib/prisma";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Share2,
  UserRound,
} from "lucide-react";
import Image from "next/image";

type Props = {
  params: Promise<{ id: string }>;
};

async function EventDetailPage({ params }: Props) {
  const { id } = await params;

  const [event, relatedEvents] = await Promise.all([
    prisma.event.findUnique({ where: { id: parseInt(id) } }),
    prisma.event.findMany({
      where: { id: { not: parseInt(id) } },
      take: 2,
      orderBy: { date: "desc" },
    }),
  ]);

  if (!event) throw new Error("Event not found");

  return (
    <div className="min-h-screen bg-background-main">
      {/* Hero */}
      <div className="relative w-full h-80 overflow-hidden bg-text-head">
        {event.coverImage && (
          <Image
            src={event.coverImage}
            alt={event.title}
            fill
            className="w-full h-full object-cover opacity-40"
          />
        )}
        <div className="absolute inset-0 bg-[gradient-to-t] from-text-head/95 via-text-head/30 to-transparent flex flex-col justify-end px-10 pb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase text-accent-pale bg-white/10 border border-accent-pale/30 w-fit mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-soft" />
            {event.role}
          </span>
          <Typography
            variant="h1"
            className="text-white text-3xl font-serif leading-tight mb-2"
          >
            {event.title}
          </Typography>
          <div className="flex flex-wrap gap-4 text-white/70 text-sm">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4 opacity-70" />
              {event.date.toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 opacity-70" />
              {event.location}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-16">
        {/* Summary card */}
        <div className="bg-background-alt border border-border-custom rounded-2xl px-8 py-6 -mt-12 relative z-10 grid grid-cols-3 divide-x divide-border-custom">
          {[
            { label: "Date", value: event.date.toLocaleDateString() },
            { label: "Location", value: event.location },
            { label: "Role", value: event.role, isRole: true },
          ].map(({ label, value, isRole }) => (
            <div key={label} className="px-6 first:pl-0 last:pr-0">
              <Typography
                variant="overline"
                className="text-accent-muted mb-1.5 block"
              >
                {label}
              </Typography>
              {isRole ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-background-deep text-accent">
                  <UserRound className="w-3.5 h-3.5" /> {value}
                </span>
              ) : (
                <Typography
                  variant="subtitle2"
                  className="text-[15px] font-medium text-text-mid"
                >
                  {value}
                </Typography>
              )}
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="mt-10">
          <Typography
            variant="overline"
            className="text-accent-muted mb-4 flex items-center gap-3 after:flex-1 after:h-px after:bg-border-custom after:content-['']"
          >
            About this event
          </Typography>
          <Typography
            variant="body1"
            className="text-[15.5px] leading-relaxed text-text-body"
          >
            {event.description}
          </Typography>
        </div>

        {/* Actions */}
        <div className="mt-10 flex items-center justify-between flex-wrap gap-3">
          <Button
            variant="secondary"
            href="/"
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            Back to Events
          </Button>
          <ShareModalWrapper title={event.title} />
        </div>

        {/* Related events */}
        {relatedEvents.length > 0 && (
          <div className="mt-12">
            <Typography
              variant="overline"
              className="text-accent-muted mb-4 flex items-center gap-3 after:flex-1 after:h-px after:bg-border-custom after:content-['']"
            >
              More Engagements
            </Typography>
            <div className="grid grid-cols-2 gap-3">
              {relatedEvents.map((rel) => (
                <Button
                  key={rel.id}
                  variant="nav"
                  href={`/events/${rel.id}`}
                  className="bg-background-alt border border-border-custom rounded-2xl p-4 hover:border-accent-pale transition-colors flex-col items-start normal-case tracking-normal font-normal"
                >
                  <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-background-deep text-accent mb-2">
                    {rel.role}
                  </span>
                  <Typography
                    variant="body2"
                    className="font-medium text-text-head leading-snug mb-1"
                  >
                    {rel.title}
                  </Typography>
                  <Typography variant="caption" className="text-accent-muted">
                    {rel.location} · {rel.date.toLocaleDateString()}
                  </Typography>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventDetailPage;
