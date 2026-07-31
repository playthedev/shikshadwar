"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ContactForm } from "@/components/forms/contact-form";

const DISMISSED_KEY = "shikshadwar-enquiry-popup-dismissed";
const OPEN_DELAY_MS = 1300;

/**
 * A one-time "Enquire Now" prompt, shortly after the homepage loads —
 * mirrors the live site's page-load popup. Reuses the existing contact form
 * and action rather than a separate lead-capture pipeline, so an enquiry
 * submitted here lands in the same inbox as the Contact Us page.
 *
 * Shown once per browser (sessionStorage), not once per navigation — a
 * visitor who's already dismissed it or come back from another page
 * shouldn't see it again in the same visit.
 */
export function EnquiryPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(DISMISSED_KEY)) return;

    const timer = setTimeout(() => setOpen(true), OPEN_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      sessionStorage.setItem(DISMISSED_KEY, "1");
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg gap-0 p-0 sm:max-w-lg">
        <div className="border-b border-border p-6">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 shrink-0 bg-rust" />
              <p className="text-eyebrow text-rust uppercase">Get in touch</p>
            </div>
            <DialogTitle className="mt-3 font-heading text-h4 text-ink">
              Enquire Now
            </DialogTitle>
            <DialogDescription className="mt-1">
              Questions about volunteering, partnering or sponsoring a child? Leave your details
              and we&apos;ll get back to you.
            </DialogDescription>
          </DialogHeader>
        </div>
        <div className="max-h-[70vh] overflow-y-auto p-6">
          <ContactForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
