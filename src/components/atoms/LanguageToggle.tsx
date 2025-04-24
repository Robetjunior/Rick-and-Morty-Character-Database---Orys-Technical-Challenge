
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from '@/hooks/use-toast';

export const LanguageToggle = () => {
  const { i18n, t } = useTranslation();
  const { toast } = useToast();
  
  const toggleLanguage = () => {
    const currentLang = i18n.language;
    const newLang = currentLang.startsWith('pt') ? 'en' : 'pt';
    
    i18n.changeLanguage(newLang)
      .then(() => {
        localStorage.setItem('language', newLang);
        toast({
          title: newLang === 'en' ? 'Language changed' : 'Idioma alterado',
          description: newLang === 'en' ? 'English selected' : 'Português selecionado',
          duration: 2000,
        });
      })
      .catch((error) => {
        console.error("Language change failed:", error);
        toast({
          title: "Error",
          description: "Failed to change language",
          variant: "destructive",
        });
      });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleLanguage}
            aria-label={t('common.changeDimension')}
          >
            <Languages className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t('common.changeDimension')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
