import { useState, useEffect, Suspense, lazy } from "react";
import { useInView } from "react-intersection-observer";
import { Loader } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CharacterProvider, useCharacters } from "@/contexts/CharacterContext";
import { SearchBar } from "@/components/organisms/SearchBar";
import { CharacterGrid } from "@/components/organisms/CharacterGrid";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { LanguageToggle } from "@/components/atoms/LanguageToggle";

const ErrorMessage = lazy(() => import("@/components/atoms/ErrorMessage"));

const CharacterGridContainer = () => {
  const { 
    characters, 
    isLoading, 
    isError, 
    isFetchingNextPage, 
    hasNextPage, 
    fetchNextPage 
  } = useCharacters();
  
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '200px',
  });
  
  const { t } = useTranslation();

  useEffect(() => {
    if (inView && hasNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isLoading]);

  if (isError) {
    return (
      <Suspense fallback={<div aria-live="polite">{t("common.loading")}</div>}>
        <ErrorMessage message={t("common.error")} />
      </Suspense>
    );
  }

  return (
    <>
      <CharacterGrid characters={characters} isLoading={isLoading} />
      
      {isFetchingNextPage && (
        <div 
          className="flex justify-center mt-6 md:mt-8"
          aria-live="polite"
          role="status"
        >
          <Loader className="w-8 h-8 animate-spin text-primary" aria-hidden="true" />
          <span className="sr-only">{t('common.loadMore')}</span>
        </div>
      )}

      <div ref={ref} className="h-10" aria-hidden="true" />
    </>
  );
};

export const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  
  return (
    <div className="min-h-[600px] min-w-[320px] h-screen p-4 md:p-8 bg-background">
      <div className="max-w-[1440px] mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 md:mb-8" role="banner">
          <div className="flex gap-2 order-1 sm:order-none" role="toolbar" aria-label="Theme and language controls">
            <ThemeToggle />
            <LanguageToggle />
          </div>
          <h1 
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-center bg-gradient-to-r from-green-400 to-purple-600 text-transparent bg-clip-text transition-all duration-300"
            tabIndex={0}
          >
            {t('common.appName')}
          </h1>
          {/* Empty div to balance the flex layout on larger screens */}
          <div className="hidden sm:block w-[88px]"></div>
        </header>
        
        <main>
          <SearchBar 
            value={searchTerm} 
            onChange={setSearchTerm}
            placeholder={t('common.search')}
            className="max-w-2xl mx-auto"
          />

          <CharacterProvider searchTerm={searchTerm}>
            <CharacterGridContainer />
          </CharacterProvider>
        </main>
      </div>
    </div>
  );
};

export default Index;