import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { useTheme } from "./theme-provider";

export default function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="theme-mode">Dark Mode</Label>
      <Switch
        checked={theme === "dark"}
        id="theme-mode"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      />
    </div>
  );
}
