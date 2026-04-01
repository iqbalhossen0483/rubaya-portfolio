import prisma from "./prisma";

export async function getSettings() {
  const settings = await prisma.setting.findUnique({ where: { id: 1 } });
  return { data: settings };
}

export async function getHeroData() {
  const hero = await prisma.hero.findFirst();
  return { success: true, data: hero };
}

export async function getAboutData() {
  const about = await prisma.about.findFirst({
    include: {
      highlightedPositions: true,
      activities: true,
    },
  });
  return { success: true, data: about };
}

export async function getExperienceData() {
  const experiences = await prisma.experience.findMany({
    orderBy: { order: "asc" },
  });
  return experiences;
}

export async function getEventData() {
  const events = await prisma.event.findMany({
    orderBy: { date: "desc" },
  });
  return events;
}

export async function getGalleryData() {
  const galleries = await prisma.gallery.findMany({
    orderBy: { createdAt: "desc" },
  });
  return galleries;
}

export async function getImpactData() {
  const impacts = await prisma.impact.findMany({
    orderBy: { createdAt: "desc" },
  });
  return impacts;
}

export async function getAwardData() {
  const awards = await prisma.award.findMany({
    orderBy: { createdAt: "desc" },
  });
  return awards;
}

export async function getContactData() {
  const contact = await prisma.contact.findUnique({
    where: { id: 1 },
  });
  return { success: true, data: contact };
}
