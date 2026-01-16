import { ArrowLeft, Send, Shield, Clock } from "lucide-react";
import { useState } from "react";

interface Supplier {
  id: string;
  productName: string;
  supplierName: string;
  image: string;
}

interface ContactFormProps {
  selectedSuppliers: Supplier[];
  onBack: () => void;
}

const ContactForm = ({ selectedSuppliers, onBack }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Modifier ma sélection
      </button>

      {/* Centered content container */}
      <div className="mx-auto max-w-xl space-y-6">
        {/* Title */}
        <div>
          <h2 className="text-2xl font-bold text-foreground">Vos coordonnées</h2>
          <p className="mt-1 text-muted-foreground">
            Recevez vos devis personnalisés sous 48h
          </p>
        </div>

      {/* Selected suppliers summary */}
      <div className="rounded-xl bg-secondary p-4">
        <p className="text-sm font-medium text-foreground mb-3">
          Votre demande sera envoyée à :
        </p>
        <div className="flex flex-wrap gap-2">
          {selectedSuppliers.map((supplier) => (
            <div
              key={supplier.id}
              className="flex items-center gap-2 rounded-full bg-card px-3 py-1.5 text-sm"
            >
              <img
                src={supplier.image}
                alt=""
                className="h-5 w-5 rounded-full object-cover"
              />
              <span className="font-medium">{supplier.supplierName}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground mb-1.5"
          >
            Email professionnel *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            placeholder="vous@entreprise.com"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-foreground mb-1.5"
            >
              Prénom *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-foreground mb-1.5"
            >
              Nom *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-foreground mb-1.5"
          >
            Société *
          </label>
          <input
            type="text"
            id="company"
            name="company"
            required
            value={formData.company}
            onChange={handleChange}
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-foreground mb-1.5"
          >
            Téléphone *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            placeholder="06 12 34 56 78"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-foreground mb-1.5"
          >
            Précisions pour les fournisseurs{" "}
            <span className="text-muted-foreground">(optionnel)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            value={formData.message}
            onChange={handleChange}
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
            placeholder="Délais souhaités, contraintes techniques..."
          />
        </div>

        {/* Reassurance */}
        <div className="flex flex-col gap-2 rounded-xl bg-secondary/50 p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" />
            Ces fournisseurs s'engagent à vous répondre sous 48h
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-primary" />
            Vos coordonnées sont uniquement partagées avec les fournisseurs
            choisis
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full rounded-xl bg-accent py-4 text-lg font-semibold text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/25 transition-all flex items-center justify-center gap-2"
        >
          <Send className="h-5 w-5" />
          Envoyer ma demande
        </button>
      </form>
      </div>
    </div>
  );
};

export default ContactForm;
