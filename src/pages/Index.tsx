import { useState } from "react";
import SupplierSelectionModal from "@/components/SupplierSelectionModal";
import NeedsQuestionnaire from "@/components/NeedsQuestionnaire";
import ProfileTypeStep from "@/components/ProfileTypeStep";
import MatchingLoader from "@/components/MatchingLoader";
import SearchResultChoice from "@/components/SearchResultChoice";
import SomethingToAddForm from "@/components/SomethingToAddForm";
import ContactFormSimple from "@/components/ContactFormSimple";

type FlowStep = "questionnaire" | "profile" | "matching" | "choice" | "selection" | "something-to-add" | "contact-simple";

interface ProfileData {
  type: "pro_france" | "creation" | "pro_foreign" | "particulier" | null;
  company?: { siren: string; name: string; address: string };
  companyName?: string;
  postalCode?: string;
  city?: string;
  country?: string;
}

const Index = () => {
  const [flowStep, setFlowStep] = useState<FlowStep>("questionnaire");
  const [userAnswers, setUserAnswers] = useState<Record<number, string[]>>({});
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  const handleQuestionnaireComplete = (answers: Record<number, string[]>) => {
    setUserAnswers(answers);
    setFlowStep("profile");
  };

  const handleProfileComplete = (data: ProfileData) => {
    setProfileData(data);
    setFlowStep("matching");
  };

  const handleMatchingComplete = () => {
    // After matching, show choice modal
    setFlowStep("choice");
  };

  const handleChooseSelection = () => {
    setFlowStep("selection");
  };

  const handleChooseSomethingToAdd = () => {
    setFlowStep("something-to-add");
  };

  const handleSomethingToAddNext = () => {
    setFlowStep("contact-simple");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Background pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />

      {/* Demo content behind modal */}
      <div className="relative z-0 p-8 opacity-50">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="h-16 bg-card rounded-lg animate-pulse" />
          <div className="grid grid-cols-3 gap-4">
            <div className="h-40 bg-card rounded-lg animate-pulse" />
            <div className="h-40 bg-card rounded-lg animate-pulse" />
            <div className="h-40 bg-card rounded-lg animate-pulse" />
          </div>
          <div className="h-64 bg-card rounded-lg animate-pulse" />
        </div>
      </div>

      {/* Flow */}
      {flowStep === "questionnaire" && (
        <NeedsQuestionnaire onComplete={handleQuestionnaireComplete} />
      )}

      {flowStep === "profile" && (
        <ProfileTypeStep
          onComplete={handleProfileComplete}
          onBack={() => setFlowStep("questionnaire")}
        />
      )}

      {flowStep === "matching" && (
        <MatchingLoader
          onComplete={handleMatchingComplete}
          duration={5000}
        />
      )}

      {flowStep === "choice" && (
        <SearchResultChoice
          onChooseSelection={handleChooseSelection}
          onChooseSomethingToAdd={handleChooseSomethingToAdd}
        />
      )}

      {flowStep === "selection" && (
        <SupplierSelectionModal
          userAnswers={userAnswers}
          onBackToQuestionnaire={() => setFlowStep("profile")}
        />
      )}

      {flowStep === "something-to-add" && (
        <SomethingToAddForm
          onNext={handleSomethingToAddNext}
          onBack={() => setFlowStep("choice")}
        />
      )}

      {flowStep === "contact-simple" && (
        <ContactFormSimple
          onBack={() => setFlowStep("something-to-add")}
        />
      )}

    </div>
  );
};

export default Index;
