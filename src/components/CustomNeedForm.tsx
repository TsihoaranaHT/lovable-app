import { ArrowLeft, Paperclip, Send, UserCheck, X } from "lucide-react";
import { useState } from "react";

interface CustomNeedFormProps {
  onBack: () => void;
}

const CustomNeedForm = ({ onBack }: CustomNeedFormProps) => {
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="p-6 lg:p-10">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Header with back button */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-lg border-2 border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            <X className="h-4 w-4" />
            Annuler
          </button>
        </div>

        {/* Title */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">
            Décrivez votre besoin
          </h2>
          <p className="mt-1 text-muted-foreground">
            Votre besoin est unique ? Décrivez-le et nos experts trouveront les
            fournisseurs qu'il vous faut.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-foreground mb-1.5"
            >
              Votre besoin *
            </label>
            <textarea
              id="description"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
              placeholder="Ex: Je cherche un pont élévateur pour véhicules utilitaires longs, avec hauteur de levée 2m minimum..."
            />
          </div>

          {/* File upload */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Document complémentaire{" "}
              <span className="text-muted-foreground">(optionnel)</span>
            </label>
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-input bg-background px-4 py-5 text-muted-foreground hover:border-primary/50 hover:bg-secondary/50 transition-all">
              <Paperclip className="h-5 w-5" />
              <span className="text-sm">
                {fileName
                  ? fileName
                  : "Ajouter un document (cahier des charges, photo...)"}
              </span>
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
            </label>
          </div>

          {/* Reassurance */}
          <div className="flex items-start gap-3 rounded-xl bg-primary/5 border border-primary/10 p-4">
            <UserCheck className="h-5 w-5 shrink-0 text-primary mt-0.5" />
            <p className="text-sm text-foreground/80">
              Un expert analysera votre demande et vous proposera les meilleurs
              fournisseurs sous 24h
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={onBack}
              className="order-2 sm:order-1 w-full sm:w-auto rounded-lg border-2 border-border bg-background px-6 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              Annuler
            </button>
            <button
              disabled={!description.trim()}
              className={`order-1 sm:order-2 w-full sm:w-auto flex-1 sm:flex-none rounded-lg px-8 py-3 text-base font-semibold transition-all flex items-center justify-center gap-2 ${
                description.trim()
                  ? "bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/25"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              <Send className="h-5 w-5" />
              Envoyer ma demande
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomNeedForm;
