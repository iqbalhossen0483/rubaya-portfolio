import Typography from "./utils/Typography";

export default function Footer() {
  return (
    <footer className="bg-background-dark p-[1.8rem_5rem] flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
      <Typography
        variant="caption"
        component="p"
        className="text-accent-muted font-normal"
      >
        © {new Date().getFullYear()} Rubaya Nasrin Shejuti — Climate &
        Development Professional
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
