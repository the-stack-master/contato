import { DynamicIcon, IconName } from "lucide-react/dynamic";

type LucideIconByNameProps = {
  name: IconName; // Icon name as string
  [key: string]: any; // Accept any other props (optional)
};

export function IconComponent({ name, ...props }: LucideIconByNameProps) {
  return <DynamicIcon name={name} {...props} />;
}
