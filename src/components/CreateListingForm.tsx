import { CheckCircle2, PlusCircle } from "lucide-react";
import { FormEvent, useState } from "react";
import type { ReactNode } from "react";
import { categoryOptions, subcategoryOptions } from "../data/categories";
import type { AvailabilityStatus, CreateListingInput, GearCondition, OwnerType } from "../types";
import { Button } from "./Button";

const initialForm: CreateListingInput = {
  title: "",
  ownerName: "",
  ownerType: "shop",
  category: "Bikes",
  subcategory: "Road bikes",
  description: "",
  location: "",
  pricePerDay: "",
  depositAmount: "",
  replacementValue: "",
  condition: "excellent",
  availabilityStatus: "available",
  pickupInstructions: "",
  safetyNotes: "",
  features: "",
};

type FormErrors = Partial<Record<keyof CreateListingInput, string>>;

const requiredFields: Array<keyof CreateListingInput> = [
  "title",
  "ownerName",
  "category",
  "subcategory",
  "description",
  "location",
  "pricePerDay",
  "depositAmount",
  "replacementValue",
  "pickupInstructions",
  "safetyNotes",
  "features",
];

export function CreateListingForm() {
  const [form, setForm] = useState<CreateListingInput>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  function updateField<K extends keyof CreateListingInput>(key: K, value: CreateListingInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setIsSubmitted(false);
  }

  function validateForm(): FormErrors {
    const nextErrors: FormErrors = {};

    requiredFields.forEach((field) => {
      if (!String(form[field]).trim()) {
        nextErrors[field] = "Required";
      }
    });

    (["pricePerDay", "depositAmount", "replacementValue"] as const).forEach((field) => {
      const value = Number(form[field]);
      if (form[field] && (!Number.isFinite(value) || value < 0)) {
        nextErrors[field] = "Enter a valid amount";
      }
    });

    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const listingPayload = {
      ...form,
      pricePerDay: Number(form.pricePerDay),
      depositAmount: Number(form.depositAmount),
      replacementValue: Number(form.replacementValue),
      features: form.features
        .split(",")
        .map((feature) => feature.trim())
        .filter(Boolean),
    };

    console.info("GearLoop listing intake payload", listingPayload);
    setIsSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-slate-200 bg-white p-5 shadow-card">
      {isSubmitted ? (
        <div className="mb-5 rounded-lg border border-forest-200 bg-forest-50 p-4">
          <div className="flex gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-forest-700" aria-hidden="true" />
            <div>
              <h3 className="text-sm font-bold text-forest-900">Listing intake received.</h3>
              <p className="mt-1 text-sm leading-6 text-forest-900/80">
                In production this payload would be sent to the GearLoop API for review and
                inventory onboarding.
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Listing title" error={errors.title}>
          <input
            value={form.title}
            onChange={(event) => updateField("title", event.target.value)}
            placeholder="Performance gravel bike package"
            className="focus-ring mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 text-sm"
          />
        </Field>

        <Field label="Owner/shop name" error={errors.ownerName}>
          <input
            value={form.ownerName}
            onChange={(event) => updateField("ownerName", event.target.value)}
            placeholder="Your rental shop"
            className="focus-ring mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 text-sm"
          />
        </Field>

        <Field label="Owner type">
          <select
            value={form.ownerType}
            onChange={(event) => updateField("ownerType", event.target.value as OwnerType)}
            className="focus-ring mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 text-sm"
          >
            <option value="shop">Rental shop</option>
            <option value="individual">Individual owner</option>
          </select>
        </Field>

        <Field label="Location" error={errors.location}>
          <input
            value={form.location}
            onChange={(event) => updateField("location", event.target.value)}
            placeholder="Boulder, CO"
            className="focus-ring mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 text-sm"
          />
        </Field>

        <Field label="Category" error={errors.category}>
          <select
            value={form.category}
            onChange={(event) => updateField("category", event.target.value)}
            className="focus-ring mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 text-sm"
          >
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Subcategory" error={errors.subcategory}>
          <select
            value={form.subcategory}
            onChange={(event) => updateField("subcategory", event.target.value)}
            className="focus-ring mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 text-sm"
          >
            {subcategoryOptions.map((subcategory) => (
              <option key={subcategory} value={subcategory}>
                {subcategory}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Price per day" error={errors.pricePerDay}>
          <input
            type="number"
            min="0"
            value={form.pricePerDay}
            onChange={(event) => updateField("pricePerDay", event.target.value)}
            placeholder="65"
            className="focus-ring mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 text-sm"
          />
        </Field>

        <Field label="Deposit amount" error={errors.depositAmount}>
          <input
            type="number"
            min="0"
            value={form.depositAmount}
            onChange={(event) => updateField("depositAmount", event.target.value)}
            placeholder="200"
            className="focus-ring mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 text-sm"
          />
        </Field>

        <Field label="Replacement value" error={errors.replacementValue}>
          <input
            type="number"
            min="0"
            value={form.replacementValue}
            onChange={(event) => updateField("replacementValue", event.target.value)}
            placeholder="2800"
            className="focus-ring mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 text-sm"
          />
        </Field>

        <Field label="Condition">
          <select
            value={form.condition}
            onChange={(event) => updateField("condition", event.target.value as GearCondition)}
            className="focus-ring mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 text-sm"
          >
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
          </select>
        </Field>

        <Field label="Availability status">
          <select
            value={form.availabilityStatus}
            onChange={(event) =>
              updateField("availabilityStatus", event.target.value as AvailabilityStatus)
            }
            className="focus-ring mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 text-sm"
          >
            <option value="available">Available</option>
            <option value="limited">Limited</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </Field>

        <Field label="Features" error={errors.features}>
          <input
            value={form.features}
            onChange={(event) => updateField("features", event.target.value)}
            placeholder="Helmet, flat kit, tuned before pickup"
            className="focus-ring mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 text-sm"
          />
        </Field>
      </div>

      <div className="mt-4 grid gap-4">
        <Field label="Description" error={errors.description}>
          <textarea
            value={form.description}
            onChange={(event) => updateField("description", event.target.value)}
            rows={4}
            placeholder="Describe what is included, who it is best for, and how renters should think about fit or usage."
            className="focus-ring mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </Field>

        <Field label="Pickup instructions" error={errors.pickupInstructions}>
          <textarea
            value={form.pickupInstructions}
            onChange={(event) => updateField("pickupInstructions", event.target.value)}
            rows={3}
            placeholder="Explain where renters pick up, what they should bring, and how handoff works."
            className="focus-ring mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </Field>

        <Field label="Safety notes" error={errors.safetyNotes}>
          <textarea
            value={form.safetyNotes}
            onChange={(event) => updateField("safetyNotes", event.target.value)}
            rows={3}
            placeholder="Mention fit checks, required safety equipment, weather limits, or usage boundaries."
            className="focus-ring mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </Field>
      </div>

      <Button type="submit" className="mt-5">
        <PlusCircle className="h-4 w-4" aria-hidden="true" />
        Submit listing intake
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-800">{label}</span>
      {children}
      {error ? <p className="mt-1 text-sm text-red-600">{error}</p> : null}
    </label>
  );
}
