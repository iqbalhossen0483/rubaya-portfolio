import { getSettings } from "@/lib/directDatabaseAccess";
import Typography from "./utils/Typography";

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
