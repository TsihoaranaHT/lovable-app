import { useState } from "react";
import { Check, CheckCircle, AlertTriangle, ShieldCheck, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductSpec {
  label: string;
  value: string;
  matches?: boolean;
  expected?: string;
}

interface SupplierCardProps {
  id: string;
  productName: string;
  supplierName: string;
  rating: number;
  distance: number;
  matchScore: number;
  image: string;
  description?: string;
  specs?: ProductSpec[];
  isRecommended?: boolean;
  isCertified?: boolean;
  isSelected: boolean;
  onToggle: (id: string) => void;
  onViewDetails?: (id: string) => void;
  matchGaps?: string[];
  viewMode?: "grid" | "list";
}

const SupplierCard = ({
  id,
  productName,
  distance,
  matchScore,
  image,
  specs = [],
  isRecommended = false,
  isCertified = false,
  isSelected,
  onToggle,
  onViewDetails,
  matchGaps = [],
  viewMode = "grid",
}: SupplierCardProps) => {
  const [showAllGaps, setShowAllGaps] = useState(false);
  const getMatchBadgeStyle = () => {
    if (matchScore >= 80) return "bg-match-high text-white";
    if (matchScore >= 60) return "bg-match-medium text-white";
    return "bg-match-low text-white";
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.checkbox-area')) {
      return;
    }
    onViewDetails?.(id);
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(id);
  };

  const matchingSpecs = specs.filter((spec) => spec.matches === true);
  const nonMatchingSpecs = specs.filter((spec) => spec.matches === false);
  const unknownSpecs = specs.filter((spec) => spec.matches === undefined || spec.matches === null);
  const isMobileList = viewMode === "list";

  // List View for Mobile
  if (isMobileList) {
    return (
      <div
        className={cn(
          "group relative flex rounded-xl border overflow-hidden transition-all duration-200 cursor-pointer sm:hidden",
          isSelected
            ? "border-primary bg-recommended shadow-md ring-2 ring-primary/20"
            : "border-border bg-card hover:border-primary/40 hover:shadow-md",
          isRecommended && !isSelected && "border-recommended-border"
        )}
        onClick={handleCardClick}
      >
        {/* Image */}
        <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden bg-muted">
          <img
            src={image}
            alt={productName}
            className="h-full w-full object-cover"
          />
          {isRecommended && (
            <div className="absolute top-1 left-1">
              <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
                Top
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
          <div>
            <h4 className="font-semibold text-foreground text-sm leading-tight line-clamp-2">
              {productName}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              {matchingSpecs.length > 0 && (
                <div className="flex items-center gap-1 text-xs text-match-high">
                  <CheckCircle className="h-3 w-3" />
                  <span>{matchingSpecs.length}/{specs.length}</span>
                </div>
              )}
              {nonMatchingSpecs.length > 0 && (
                <div className="flex items-center gap-1 text-xs text-amber-700">
                  <AlertTriangle className="h-3 w-3" />
                  <span>{nonMatchingSpecs.length}</span>
                </div>
              )}
              {unknownSpecs.length > 0 && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <HelpCircle className="h-3 w-3" />
                  <span>{unknownSpecs.length}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs font-medium text-primary">
              Voir détails →
            </span>
            <div className={cn(
              "rounded-md px-2 py-0.5 font-bold text-xs",
              getMatchBadgeStyle()
            )}>
              {matchScore}%
            </div>
          </div>
        </div>

        {/* Checkbox */}
        <div
          className="checkbox-area absolute top-2 right-2 z-10"
          onClick={handleCheckboxClick}
        >
          <div
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-lg border-2 transition-all duration-200 shadow-sm",
              isSelected
                ? "border-primary bg-primary"
                : "border-muted-foreground/30 bg-background/90 backdrop-blur-sm"
            )}
          >
            {isSelected && (
              <Check className="h-3.5 w-3.5 text-primary-foreground animate-check-bounce" />
            )}
          </div>
        </div>
      </div>
    );
  }

  // Grid View (default)
  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-xl border overflow-hidden transition-all duration-200 cursor-pointer",
        isSelected
          ? "border-primary bg-recommended shadow-md ring-2 ring-primary/20"
          : "border-border bg-card hover:border-primary/40 hover:shadow-md",
        isRecommended && !isSelected && "border-recommended-border"
      )}
      onClick={handleCardClick}
    >
      {/* Checkbox - positioned top right */}
      <div
        className="checkbox-area absolute top-3 right-3 z-10"
        onClick={handleCheckboxClick}
      >
        <div
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-lg border-2 transition-all duration-200 shadow-sm",
            isSelected
              ? "border-primary bg-primary"
              : "border-muted-foreground/30 bg-background/90 backdrop-blur-sm group-hover:border-primary/50"
          )}
        >
          {isSelected && (
            <Check className="h-4 w-4 text-primary-foreground animate-check-bounce" />
          )}
        </div>
      </div>

      {/* Recommended Badge */}
      {isRecommended && (
        <div className="absolute top-3 left-3 z-10">
          <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground shadow-sm">
            Recommandé
          </span>
        </div>
      )}

      {/* Product Image */}
      <div className="relative h-32 sm:h-48 w-full overflow-hidden bg-muted">
        <img
          src={image}
          alt={productName}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Match Score Overlay */}
        <div className={cn(
          "absolute bottom-2 right-2 sm:bottom-3 sm:right-3 rounded-lg px-2 py-1 sm:px-3 sm:py-1.5 font-bold text-xs sm:text-sm shadow-lg",
          getMatchBadgeStyle()
        )}>
          {matchScore}%
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        {/* Title */}
        <h4 className="font-semibold text-foreground text-sm sm:text-base leading-tight line-clamp-2 mb-3">
          {productName}
        </h4>

        {/* Unified Criteria Section */}
        <div className="space-y-2 flex-1">
          {/* Matching specs - OK */}
          {matchingSpecs.length > 0 && (
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <div className="flex items-center justify-center h-5 w-5 rounded-full bg-match-high/15">
                <CheckCircle className="h-3.5 w-3.5 text-match-high" />
              </div>
              <span className="text-match-high font-medium">
                {matchingSpecs.length}/{specs.length} critères OK
              </span>
            </div>
          )}

          {/* Non-matching specs - Gaps */}
          {nonMatchingSpecs.length > 0 && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <div className="flex items-center justify-center h-5 w-5 rounded-full bg-amber-100">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                </div>
                <span className="text-amber-700 font-medium">
                  {nonMatchingSpecs.length} écart{nonMatchingSpecs.length > 1 ? 's' : ''}
                </span>
              </div>
              
              {/* Detail of gaps - Desktop only */}
              <div className="hidden sm:flex flex-wrap gap-1.5 pl-7">
                {(showAllGaps ? nonMatchingSpecs : nonMatchingSpecs.slice(0, 2)).map((spec, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center rounded-md bg-amber-50 border border-amber-200 px-2 py-0.5 text-xs text-amber-800"
                  >
                    {spec.label}: {spec.value}
                    {spec.expected && (
                      <span className="text-amber-600 ml-1">(→ {spec.expected})</span>
                    )}
                  </span>
                ))}
                {nonMatchingSpecs.length > 2 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowAllGaps(!showAllGaps);
                    }}
                    className="inline-flex items-center gap-0.5 text-xs text-primary hover:text-primary/80 transition-colors"
                  >
                    {showAllGaps ? (
                      <>
                        <ChevronUp className="h-3 w-3" />
                        Moins
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-3 w-3" />
                        +{nonMatchingSpecs.length - 2}
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Unknown specs */}
          {unknownSpecs.length > 0 && (
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <div className="flex items-center justify-center h-5 w-5 rounded-full bg-muted">
                <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <span className="text-muted-foreground">
                {unknownSpecs.length} non renseigné{unknownSpecs.length > 1 ? 's' : ''}
              </span>
            </div>
          )}

          {/* Match Gaps fallback (when no specs but matchGaps exist) */}
          {matchGaps.length > 0 && nonMatchingSpecs.length === 0 && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <div className="flex items-center justify-center h-5 w-5 rounded-full bg-amber-100">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                </div>
                <span className="text-amber-700 font-medium">
                  {matchGaps.length} écart{matchGaps.length > 1 ? 's' : ''}
                </span>
              </div>
              
              {/* Detail of gaps - Desktop only */}
              <div className="hidden sm:flex flex-wrap gap-1.5 pl-7">
                {(showAllGaps ? matchGaps : matchGaps.slice(0, 2)).map((gap, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center rounded-md bg-amber-50 border border-amber-200 px-2 py-0.5 text-xs text-amber-800"
                  >
                    {gap}
                  </span>
                ))}
                {matchGaps.length > 2 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowAllGaps(!showAllGaps);
                    }}
                    className="inline-flex items-center gap-0.5 text-xs text-primary hover:text-primary/80 transition-colors"
                  >
                    {showAllGaps ? (
                      <>
                        <ChevronUp className="h-3 w-3" />
                        Moins
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-3 w-3" />
                        +{matchGaps.length - 2}
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Certified Badge - at bottom */}
        {isCertified && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
              <ShieldCheck className="h-3.5 w-3.5" />
              Fournisseur certifié
            </div>
          </div>
        )}
      </div>

      {/* View Details Footer - more compact on mobile */}
      <div className="border-t border-border px-3 py-2 sm:px-4 sm:py-3 text-center">
        <span className="text-xs sm:text-sm font-medium text-primary group-hover:underline">
          Voir détails →
        </span>
      </div>
    </div>
  );
};

export default SupplierCard;
