
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect, memo } from "react";
import { useTranslation } from "react-i18next";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export const SearchBar = memo(({ 
  value, 
  onChange, 
  className = "", 
  placeholder
}: SearchBarProps) => {
  const [localValue, setLocalValue] = useState(value);
  const { t } = useTranslation();
  const defaultPlaceholder = t('common.search');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [localValue, onChange, value]);

  return (
    <div 
      className={`relative w-full max-w-[90%] md:max-w-md mx-auto mb-6 md:mb-8 ${className}`}
      role="search"
    >
      <Search 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
        aria-hidden="true"
      />
      <Input
        type="search"
        placeholder={placeholder || defaultPlaceholder}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="pl-10 w-full text-base md:text-sm transition-all duration-300 focus:ring-2 focus:ring-primary"
        aria-label={placeholder || defaultPlaceholder}
      />
    </div>
  );
});

SearchBar.displayName = "SearchBar";
