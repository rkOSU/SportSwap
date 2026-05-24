import { CheckCircle2, Send } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { isSupabaseConfigured } from "../lib/supabase";
import { submitBookingRequest } from "../services/bookingService";
import type { BookingRequest, GearListing } from "../types";
import {
  calculateEstimatedTotal,
  calculateRentalDays,
  calculateRentalSubtotal,
  formatCurrency,
} from "../utils/pricing";
import { isValidEmail, validateDateRange } from "../utils/validation";
import { Button } from "./Button";
import { PriceBreakdown } from "./PriceBreakdown";

type FormState = {
  startDate: string;
  endDate: string;
  renterName: string;
  renterEmail: string;
  note: string;
};

type FormErrors = Partial<Record<keyof FormState | "dateRange", string>>;

const initialState: FormState = {
  startDate: "",
  endDate: "",
  renterName: "",
  renterEmail: "",
  note: "",
};

export function BookingRequestForm({ listing }: { listing: GearListing }) {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedRequest, setSubmittedRequest] = useState<BookingRequest | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const rentalDays = useMemo(
    () => calculateRentalDays(form.startDate, form.endDate),
    [form.startDate, form.endDate],
  );
  const rentalSubtotal = calculateRentalSubtotal(listing.pricePerDay, rentalDays);
  const estimatedTotal = calculateEstimatedTotal(rentalSubtotal, listing.depositAmount);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined, dateRange: undefined }));
    setSubmitError(null);
  }

  function validateForm(): FormErrors {
    const nextErrors: FormErrors = {};
    const dateError = validateDateRange(form.startDate, form.endDate);

    if (dateError) {
      nextErrors.dateRange = dateError;
    }

    if (!form.renterName.trim()) {
      nextErrors.renterName = "Name is required.";
    }

    if (!form.renterEmail.trim()) {
      nextErrors.renterEmail = "Email is required.";
    } else if (!isValidEmail(form.renterEmail)) {
      nextErrors.renterEmail = "Enter a valid email address.";
    }

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

    const request: BookingRequest = {
      listingId: listing.id,
      startDate: form.startDate,
      endDate: form.endDate,
      renterName: form.renterName.trim(),
      renterEmail: form.renterEmail.trim(),
      note: form.note.trim() || undefined,
      estimatedRentalSubtotal: rentalSubtotal,
      depositAmount: listing.depositAmount,
      estimatedTotal,
      status: "pending",
    };

    setIsSubmitting(true);
    try {
      await submitBookingRequest(request);
      setSubmittedRequest(request);
    } catch (nextError) {
      setSubmitError(
        nextError instanceof Error ? nextError.message : "Unable to send rental request.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submittedRequest) {
    return (
      <div className="rounded-lg border border-forest-200 bg-forest-50 p-5 shadow-card">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-forest-700" aria-hidden="true" />
          <div>
            <h3 className="text-lg font-bold text-forest-900">Rental request sent.</h3>
            <p className="mt-2 text-sm leading-6 text-forest-900/80">
              The shop or owner would review and confirm availability.
              {isSupabaseConfigured
                ? " This request has been saved in Supabase."
                : " Add Supabase env vars to persist requests beyond this browser session."}
            </p>
            <div className="mt-4 rounded-lg bg-white p-4 text-sm text-slate-700">
              <p>
                <span className="font-semibold text-slate-950">Dates:</span>{" "}
                {submittedRequest.startDate} to {submittedRequest.endDate}
              </p>
              <p className="mt-1">
                <span className="font-semibold text-slate-950">Estimated total:</span>{" "}
                {formatCurrency(submittedRequest.estimatedTotal)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-card">
        <h3 className="text-lg font-bold text-slate-950">Request Rental</h3>
        {submitError ? (
          <div className="mt-4 rounded-lg border border-red-300/30 bg-red-500/10 p-3 text-sm font-semibold text-red-100">
            {submitError}
          </div>
        ) : null}
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-slate-800">Start date</span>
            <input
              type="date"
              value={form.startDate}
              onChange={(event) => updateField("startDate", event.target.value)}
              className="focus-ring mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-800">End date</span>
            <input
              type="date"
              value={form.endDate}
              onChange={(event) => updateField("endDate", event.target.value)}
              className="focus-ring mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 text-sm"
            />
          </label>
        </div>
        {errors.dateRange ? <p className="mt-2 text-sm text-red-600">{errors.dateRange}</p> : null}

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-slate-800">Renter name</span>
            <input
              value={form.renterName}
              onChange={(event) => updateField("renterName", event.target.value)}
              placeholder="Your name"
              className="focus-ring mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 text-sm"
            />
            {errors.renterName ? (
              <p className="mt-1 text-sm text-red-600">{errors.renterName}</p>
            ) : null}
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-800">Renter email</span>
            <input
              type="email"
              value={form.renterEmail}
              onChange={(event) => updateField("renterEmail", event.target.value)}
              placeholder="you@example.com"
              className="focus-ring mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 text-sm"
            />
            {errors.renterEmail ? (
              <p className="mt-1 text-sm text-red-600">{errors.renterEmail}</p>
            ) : null}
          </label>
        </div>

        <label className="mt-4 block">
          <span className="text-sm font-semibold text-slate-800">
            Optional note to shop or owner
          </span>
          <textarea
            value={form.note}
            onChange={(event) => updateField("note", event.target.value)}
            rows={4}
            placeholder="Share rider height, boot size, pickup timing, or route plans."
            className="focus-ring mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <Button type="submit" fullWidth className="mt-5" disabled={isSubmitting}>
          <Send className="h-4 w-4" aria-hidden="true" />
          {isSubmitting ? "Sending request..." : "Request Rental"}
        </Button>
      </div>

      <PriceBreakdown
        pricePerDay={listing.pricePerDay}
        depositAmount={listing.depositAmount}
        rentalDays={rentalDays}
      />
    </form>
  );
}
