import { Character } from "@/types/character";
import { useTranslation } from "react-i18next";

interface StatusIndicatorProps {
  status: Character["status"];
  className?: string;
}

export const StatusIndicator = ({ status, className }: StatusIndicatorProps) => {
  const { t } = useTranslation();
  
  const statusColors = {
    Alive: "bg-green-500",
    Dead: "bg-red-500",
    unknown: "bg-gray-500",
  };

  const statusKey = status.toLowerCase() as 'alive' | 'dead' | 'unknown';
  const translatedStatus = t(`character.status.${statusKey}`);

  return (
    <span 
      className={`flex items-center gap-2 ${className}`} 
      aria-label={`${t('character.statusLabel')}: ${translatedStatus}`}
    >
      <span
        className={`w-2 h-2 rounded-full ${statusColors[status]}`}
        aria-hidden="true"
      />
      <span>{translatedStatus}</span>
    </span>
  );
};
