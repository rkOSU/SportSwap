import { supabase } from "../lib/supabase";
import type { BookingRequest } from "../types";

export async function submitBookingRequest(request: BookingRequest): Promise<void> {
  if (!supabase) {
    return;
  }

  const { error } = await supabase.from("booking_requests").insert({
    listing_id: request.listingId,
    start_date: request.startDate,
    end_date: request.endDate,
    renter_name: request.renterName,
    renter_email: request.renterEmail,
    note: request.note ?? null,
    estimated_rental_subtotal: request.estimatedRentalSubtotal,
    deposit_amount: request.depositAmount,
    estimated_total: request.estimatedTotal,
    status: request.status,
  });

  if (error) {
    throw new Error(error.message);
  }
}
