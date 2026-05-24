import { CheckCircle2, PlusCircle } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { categoryOptions, subcategoryOptions } from "../data/categories";
import { isSupabaseConfigured } from "../lib/supabase";
import { createListing } from "../services/listingService";
import type { GearListing } from "../types";
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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [createdListing, setCreatedListing] = useState<GearListing | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const imagePreviewUrl = useMemo(
    () => (imageFile ? URL.createObjectURL(imageFile) : null),
    [imageFile],
  );

  function updateField<K extends keyof CreateListingInput>(key: K, value: CreateListingInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setCreatedListing(null);
    setSubmitError(null);
  }

  function handleImageChange(file: File | null) {
    setSubmitError(null);
    setCreatedListing(null);

    if (!file) {
      setImageFile(null);
      return;
    }

    if (!file.type.startsWith("image/")) {
      setSubmitError("Upload a JPG, PNG, or WebP image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setSubmitError("Image must be 5MB or smaller for this MVP upload flow.");
      return;
    }

    setImageFile(file);
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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);
    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createListing(form, imageFile);
      setCreatedListing(result.listing);
      setForm(initialForm);
      setImageFile(null);
    } catch (nextError) {
      setSubmitError(
        nextError instanceof Error ? nextError.message : "Unable to publish this listing.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-card"
    >
      {!isSupabaseConfigured ? (
        <div className="mb-5 rounded-lg border border-amber-300/30 bg-amber-500/10 p-4">
          <h3 className="text-sm font-bold text-amber-100">Supabase setup required</h3>
          <p className="mt-1 text-sm leading-6 text-amber-100/85">
            Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, run the SQL schema, then restart
            the dev server to publish real listings and upload gear images.
          </p>
        </div>
      ) : null}

      {createdListing ? (
        <div className="mb-5 rounded-lg border border-forest-200 bg-forest-50 p-4">
          <div className="flex gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-forest-700" aria-hidden="true" />
            <div>
              <h3 className="text-sm font-bold text-forest-900">Listing published.</h3>
              <p className="mt-1 text-sm leading-6 text-forest-900/80">
                Your gear is now saved in Supabase and visible in the marketplace.
              </p>
              <Link
                to={`/listings/${createdListing.id}`}
                className="mt-3 inline-flex text-sm font-bold text-forest-100 hover:text-white"
              >
                View published listing
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      {submitError ? (
        <div className="mb-5 rounded-lg border border-red-300/30 bg-red-500/10 p-4 text-sm font-semibold text-red-100">
          {submitError}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Listing title" error={errors.title}>
          <input
            value={form.title}
            onChange={(event) => updateField("title", event.target.value)}
            placeholder="Field-ready gravel bike package"
            className="focus-ring mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 text-sm"
          />
        </Field>

        <Field label="Owner/shop name" error={errors.ownerName}>
          <input
            value={form.ownerName}
            onChange={(event) => updateField("ownerName", event.target.value)}
            placeholder="Your shop, club, or owner profile"
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

      <div className="mt-4">
        <Field label="Gear photo">
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={(event) => handleImageChange(event.target.files?.[0] ?? null)}
            className="focus-ring mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <p className="mt-2 text-xs leading-5 text-slate-500">
            Optional, but recommended. JPG, PNG, or WebP up to 5MB. If omitted, GearLoop uses a
            category image.
          </p>
          {imagePreviewUrl ? (
            <img
              src={imagePreviewUrl}
              alt="Selected gear preview"
              className="mt-3 h-44 w-full rounded-lg border border-slate-200 object-cover"
            />
          ) : null}
        </Field>
      </div>

      <div className="mt-4 grid gap-4">
        <Field label="Description" error={errors.description}>
          <textarea
            value={form.description}
            onChange={(event) => updateField("description", event.target.value)}
            rows={4}
            placeholder="Describe what is included, who it is built for, and how renters should think about fit, terrain, weather, or usage limits."
            className="focus-ring mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </Field>

        <Field label="Pickup instructions" error={errors.pickupInstructions}>
          <textarea
            value={form.pickupInstructions}
            onChange={(event) => updateField("pickupInstructions", event.target.value)}
            rows={3}
            placeholder="Explain where renters pick up, what they should bring, and how inspection or handoff works."
            className="focus-ring mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </Field>

        <Field label="Safety notes" error={errors.safetyNotes}>
          <textarea
            value={form.safetyNotes}
            onChange={(event) => updateField("safetyNotes", event.target.value)}
            rows={3}
            placeholder="Mention fit checks, required safety equipment, weather limits, route boundaries, or damage-sensitive use."
            className="focus-ring mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </Field>
      </div>

      <Button type="submit" className="mt-5" disabled={isSubmitting || !isSupabaseConfigured}>
        <PlusCircle className="h-4 w-4" aria-hidden="true" />
        {isSubmitting ? "Publishing listing..." : "Publish listing"}
      </Button>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-800">{label}</span>
      {children}
      {error ? <p className="mt-1 text-sm text-red-600">{error}</p> : null}
    </label>
  );
}
