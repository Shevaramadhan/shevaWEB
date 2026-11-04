import { EditorialPortfolio } from "@/components/EditorialPortfolio";
import { LanguageProvider } from "@/context/LanguageContext";

export default function HomePage() {
  return (
    <LanguageProvider>
      <EditorialPortfolio />
    </LanguageProvider>
  );
}
