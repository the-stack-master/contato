/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Icons from "lucide-react";
import { Globe } from "lucide-react";

type LucideIconByNameProps = {
  name: string;
  [key: string]: any;
};

// Convert "file-text" → "FileText"
function toPascalCase(str: string) {
  return str
    ?.split(/[-_]/)
    ?.map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    ?.join("");
}

export function IconComponent({
  name = "globe",
  ...props
}: LucideIconByNameProps) {
  const iconName = toPascalCase(name);
  const LucideIcon = (Icons as any)[iconName];

  if (LucideIcon) {
    return <LucideIcon {...props} />;
  } else {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        `[lucide-react]: Invalid icon name "${name}". Using "Globe" fallback.`
      );
    }
    return <Globe {...props} />;
  }
}
