import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle({ variant = "sidebar" }: { variant?: "sidebar" | "bar" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  if (variant === "bar") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className="grid size-9 place-items-center rounded-lg border border-border text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex w-full items-center justify-between gap-3 rounded-lg border border-sidebar-border/70 px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
    >
      <span className="flex items-center gap-3">
        {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        {isDark ? "Light mode" : "Dark mode"}
      </span>
      <span
        className="relative h-5 w-9 rounded-full bg-sidebar-border transition-colors data-[on=true]:bg-sidebar-primary"
        data-on={isDark}
      >
        <span
          className="absolute top-0.5 left-0.5 size-4 rounded-full bg-sidebar-accent-foreground transition-transform data-[on=true]:translate-x-4"
          data-on={isDark}
        />
      </span>
    </button>
  );
}