import Typography from "./utils/Typography";

async function getSettings() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/settings`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch settings");
  }

  return res.json();
}

export default async function Footer() {
  let settings;
  try {
    const data = await getSettings();
    settings = data.data;
  } catch (error) {
    console.error(error);
  }

  return (
    <footer className="bg-background-dark p-[1.8rem_5rem] flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
      <Typography
        variant="caption"
        component="p"
        className="text-accent-muted font-normal"
      >
        {settings?.copyright_text || `Rubaya Nasrin Shejuti `}
      </Typography>
      <Typography
        variant="caption"
        component="p"
        className="text-accent-muted font-normal"
      >
        Built with purpose · For the planet 🌿
      </Typography>
    </footer>
  );
}
