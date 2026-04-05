export type Hero = {
  id: number;
  title: string;
  subtitle: string | null;
  description: string | null;
  yearsOfExperience: string | null;
  countries: string | null;
  award: string | null;
  profile: string | null;
  updatedAt: Date;
};

export type About = {
  id: number;
  title: string;
  description: string;
  philosophy: string;
  highlightedPositions: HighlightedPosition[];
  updatedAt: Date;
  activities: Activity[];
};

export type HighlightedPosition = {
  id: number;
  title: string;
  company: string;
  aboutId: number | null;
};

export type Activity = {
  id: number;
  label: string;
  icon: string;
  aboutId: number | null;
};

export type Experience = {
  id: number;
  company: string;
  role: string;
  startDate: Date;
  endDate: Date | null;
  isCurrent: boolean;
  description: string | null;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Event = {
  id: number;
  title: string;
  role: string;
  date: Date;
  location: string;
  description: string;
  coverImage: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Gallery = {
  id: number;
  image: string;
  caption: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Impact = {
  id: number;
  image: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Award = {
  id: number;
  image: string;
  title: string;
  description: string;
  time_to_receipt: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Contact = {
  id: number;
  email: string;
  phone: string;
  location: string;
  linkedin_url: string;
  updatedAt: Date;
};

export type Setting = {
  id: number;
  site_brand_name: string;
  copyright_text: string;
  section_description: any;
  updatedAt: Date;
};
