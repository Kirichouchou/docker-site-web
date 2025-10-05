"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  MessageCircle,
  Video,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import ContactForm from "./ContactForm";
import { useLanguage } from "../contexts/LanguageContext";
import { DEFAULT_LANGUAGE, TRANSLATIONS, type Language } from "../locales/translations";

type OverlayType = "contact" | "booking";

type ContactOverlayContextValue = {
  open: () => void;
  openContact: () => void;
  openBooking: () => void;
  close: () => void;
  isOpen: boolean;
};

type OverlayContactCopy = {
  closeAria: string;
  closeLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  summaryTitle: string;
  summaryHint: string;
  bookingTitle: string;
  bookingDescription: string;
  bookingButton: string;
  bookingQuickMessage: string;
  formTitle: string;
  formSubtitle: string;
};

type OverlayBookingCopy = {
  eyebrow: string;
  title: string;
  description: string;
  back: string;
  confirm: string;
  monthPrevious: string;
  monthNext: string;
  timeHeading: string;
  format24: string;
  format12: string;
  availabilityTag: string;
  selectedTitle: string;
  selectedDescription: string;
  selectPrompt: string;
  selectionSeparator: string;
  prefer12Hour: boolean;
};

type OverlayCalendarCopy = {
  days: string[];
  locale: string;
};

type OverlayCopy = {
  contact: OverlayContactCopy;
  booking: OverlayBookingCopy;
  calendar: OverlayCalendarCopy;
};

const FALLBACK_OVERLAY: OverlayCopy = (TRANSLATIONS[DEFAULT_LANGUAGE] as { overlays: OverlayCopy }).overlays;

const ContactOverlayContext = createContext<ContactOverlayContextValue | undefined>(
  undefined,
);

export function useContactOverlay() {
  const ctx = useContext(ContactOverlayContext);
  if (!ctx) {
    throw new Error("useContactOverlay must be used within ContactOverlayProvider");
  }
  return ctx;
}

const TIME_SLOTS = generateTimeSlots(8, 18, 15);

export default function ContactOverlayProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { language, dictionary } = useLanguage();
  const overlays: OverlayCopy = useMemo(() => {
    const lang = language as Language;
    const fromDictionary = (dictionary as { overlays?: OverlayCopy })?.overlays;
    if (fromDictionary) {
      return fromDictionary;
    }
    const translation = TRANSLATIONS[lang as keyof typeof TRANSLATIONS];
    return (translation?.overlays as OverlayCopy) ?? FALLBACK_OVERLAY;
  }, [language, dictionary]);

  const [overlay, setOverlay] = useState<OverlayType | null>(null);
  const [bookingSummary, setBookingSummary] = useState<string | null>(null);

  const openContact = useCallback(() => setOverlay("contact"), []);
  const openBooking = useCallback(() => setOverlay("booking"), []);
  const close = useCallback(() => {
    setOverlay(null);
    setBookingSummary(null);
  }, []);

  useEffect(() => {
    if (!overlay) {
      return;
    }
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [overlay]);

  useEffect(() => {
    if (!overlay) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [overlay, close]);

  const value = useMemo(
    () => ({
      open: openContact,
      openContact,
      openBooking,
      close,
      isOpen: overlay !== null,
    }),
    [openBooking, openContact, close, overlay],
  );

  return (
    <ContactOverlayContext.Provider value={value}>
      {children}
      {overlay === "contact" && (
        <OverlayRoot onClose={close} copy={overlays.contact}>
          <ContactOverlayContent
            copy={overlays}
            onShowBooking={openBooking}
            bookingSummary={bookingSummary}
          />
        </OverlayRoot>
      )}
      {overlay === "booking" && (
        <OverlayRoot onClose={close} copy={overlays.contact}>
          <BookingOverlayContent
            copy={overlays}
            onBack={openContact}
            onConfirm={(summary) => {
              setBookingSummary(summary);
              openContact();
            }}
          />
        </OverlayRoot>
      )}
    </ContactOverlayContext.Provider>
  );
}

type OverlayRootProps = {
  onClose: () => void;
  children: React.ReactNode;
  copy: OverlayContactCopy;
};

function OverlayRoot({ onClose, children, copy }: OverlayRootProps) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[rgba(8,15,26,0.76)] px-4 py-10 backdrop-blur-xl">
      <button type="button" className="fixed inset-0 h-full w-full cursor-auto" onClick={onClose} aria-hidden="true" />
      <button
        type="button"
        onClick={onClose}
        className="fixed right-4 top-4 z-[210] inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/15 px-5 py-2 text-sm font-medium text-white transition hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-label={copy.closeAria}
      >
        <span className="hidden sm:inline">{copy.closeLabel}</span>
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
      <div className="relative z-[205] flex w-full max-w-[1280px] max-h-[92vh] flex-col overflow-hidden rounded-[36px] border border-white/25 bg-[linear-gradient(135deg,_rgba(42,56,76,0.85)_0%,_rgba(96,118,150,0.72)_100%)] text-white/90 shadow-[0_55px_170px_-60px_rgba(7,17,29,0.65)] backdrop-blur-[42px] sm:max-h-[88vh]">
        {children}
      </div>
    </div>
  );
}

type ContactOverlayContentProps = {
  onShowBooking: () => void;
  bookingSummary: string | null;
  copy: OverlayCopy;
};

function ContactOverlayContent({
  onShowBooking,
  bookingSummary,
  copy,
}: ContactOverlayContentProps) {
  const { contact } = copy;

  return (
    <div className="grid flex-1 overflow-y-auto gap-4 p-4 sm:p-5 lg:p-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div className="flex flex-col gap-5 sm:gap-6">
        <section className="rounded-[32px] border border-white/30 bg-[linear-gradient(150deg,_rgba(130,148,178,0.4)_0%,_rgba(182,202,230,0.25)_100%)] p-5 text-white shadow-[0_32px_100px_-48px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:p-6 lg:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/70">{contact.eyebrow}</p>
          <h2 className="mt-4 text-[2.2rem] font-extrabold leading-tight text-white sm:text-[2.4rem] lg:text-3xl">
            {contact.title}
          </h2>
          <p className="mt-3 text-sm text-white/75">{contact.description}</p>
          {bookingSummary && (
            <div className="mt-3 rounded-2xl border border-white/30 bg-[rgba(255,255,255,0.16)] p-3 text-sm text-white/85 shadow-[0_24px_80px_-50px_rgba(0,0,0,0.55)]">
              <p className="font-semibold text-white">{contact.summaryTitle}</p>
              <p className="mt-1 text-white/80">{bookingSummary}</p>
              <p className="mt-2 text-xs text-white/60">{contact.summaryHint}</p>
            </div>
          )}
        </section>

        <section className="flex flex-1 flex-col gap-4 sm:gap-5 rounded-[36px] border border-white/25 bg-[linear-gradient(150deg,_rgba(120,138,168,0.45)_0%,_rgba(170,192,220,0.28)_100%)] p-4 text-white shadow-[0_40px_130px_-60px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:p-6 lg:p-8">
          <div className="flex items-start gap-4 text-white">
            <Video className="h-5 w-5 text-white/70" aria-hidden="true" />
            <div className="space-y-2">
              <h3 className="text-xl font-semibold tracking-tight text-white/90">{contact.bookingTitle}</h3>
              <p className="text-sm text-white/65">{contact.bookingDescription}</p>
            </div>
          </div>
          <div className="mt-auto flex flex-col gap-2 pt-1.5">
            <button
              type="button"
              onClick={onShowBooking}
              className="inline-flex w-full items-center justify-center rounded-full border border-white/30 bg-[linear-gradient(130deg,_rgba(255,255,255,0.35)_0%,_rgba(214,226,240,0.24)_100%)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-base"
            >
              {contact.bookingButton}
            </button>
            <p className="text-xs text-white/60">{contact.bookingQuickMessage}</p>
          </div>
        </section>
      </div>

      <section className="rounded-[32px] border border-white/30 bg-[linear-gradient(150deg,_rgba(140,158,190,0.38)_0%,_rgba(192,212,238,0.24)_100%)] p-4 text-white shadow-[0_36px_120px_-60px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:p-5 lg:p-6">
        <div className="flex items-center gap-3 text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{contact.formTitle}</h3>
            <p className="text-sm text-white/70">{contact.formSubtitle}</p>
          </div>
        </div>
        <div className="mt-4">
          <ContactForm variant="overlay" />
        </div>
      </section>
    </div>
  );
}

type BookingOverlayContentProps = {
  onBack: () => void;
  onConfirm: (summary: string) => void;
  copy: OverlayCopy;
};

function BookingOverlayContent({
  onBack,
  onConfirm,
  copy,
}: BookingOverlayContentProps) {
  const { booking, calendar } = copy;

  const today = useMemo(() => {
    const base = new Date();
    base.setHours(0, 0, 0, 0);
    return base;
  }, []);

  const [viewDate, setViewDate] = useState<Date>(() => today);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [is12HourFormat, setIs12HourFormat] = useState(booking.prefer12Hour);

  const monthFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(calendar.locale, {
        month: "long",
        year: "numeric",
      }),
    [calendar.locale],
  );

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(calendar.locale, {
        weekday: "long",
        day: "numeric",
        month: "long",
      }),
    [calendar.locale],
  );

  const daysLabels = calendar.days;

  const calendarDays = useMemo(
    () => buildCalendar(viewDate, today),
    [viewDate, today],
  );

  const formattedSelection = useMemo(() => {
    if (!selectedDate || !selectedTime) {
      return null;
    }
    const label = dateFormatter.format(selectedDate);
    return `${label} ${booking.selectionSeparator} ${formatTime(selectedTime, is12HourFormat)}`;
  }, [selectedDate, selectedTime, is12HourFormat, booking.selectionSeparator, dateFormatter]);

  const handleConfirm = () => {
    if (!formattedSelection) {
      return;
    }
    onConfirm(formattedSelection);
  };

  return (
    <div className="grid flex-1 overflow-y-auto gap-4 p-4 sm:p-5 lg:p-7 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.38fr)] lg:gap-8">
      <aside className="flex flex-col gap-6 rounded-[32px] border border-white/30 bg-[linear-gradient(150deg,_rgba(130,148,178,0.4)_0%,_rgba(182,202,230,0.25)_100%)] p-4 text-white shadow-[0_32px_110px_-60px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:p-5 lg:p-6">
        <div className="space-y-2.5">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">{booking.eyebrow}</p>
          <h2 className="text-2xl font-bold text-white sm:text-[2.2rem] lg:text-3xl">{booking.title}</h2>
          <p className="text-sm text-white/70">{booking.description}</p>
        </div>
        <div className="mt-auto flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex flex-1 items-center justify-center rounded-full border border-white/25 bg-[rgba(255,255,255,0.18)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {booking.back}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!formattedSelection}
            className="inline-flex flex-1 items-center justify-center rounded-full border border-white/40 bg-[linear-gradient(130deg,_rgba(255,255,255,0.34)_0%,_rgba(214,228,244,0.26)_100%)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-[rgba(255,255,255,0.16)] disabled:text-white/50"
          >
            {booking.confirm}
          </button>
        </div>
      </aside>

      <section className="rounded-[32px] border border-white/30 bg-[linear-gradient(150deg,_rgba(130,148,178,0.4)_0%,_rgba(182,202,230,0.25)_100%)] p-4 text-white shadow-[0_34px_120px_-60px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:p-5 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex-1 space-y-4">
            <header className="flex items-center justify-between text-white">
              <button
                type="button"
                onClick={() => setViewDate((prev) => offsetMonth(prev, -1))}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-[rgba(255,255,255,0.18)] text-white transition hover:bg-white/28"
                aria-label={booking.monthPrevious}
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <div className="text-lg font-semibold capitalize text-white/90">{monthFormatter.format(viewDate)}</div>
              <button
                type="button"
                onClick={() => setViewDate((prev) => offsetMonth(prev, 1))}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-[rgba(255,255,255,0.18)] text-white transition hover:bg-white/28"
                aria-label={booking.monthNext}
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </header>

            <div className="grid grid-cols-7 gap-3 text-center text-xs font-semibold uppercase tracking-[0.24em] text-white/60 sm:gap-3.5">
              {daysLabels.map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-3 text-sm sm:gap-3.5">
              {calendarDays.map((day) => {
                const isSelected = selectedDate && isSameDay(selectedDate, day.date);
                const isDisabled = !day.isCurrentMonth || day.date < today;
                return (
                  <button
                    key={day.date.toISOString()}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => {
                      if (isDisabled) return;
                      setSelectedDate(day.date);
                      setSelectedTime(null);
                    }}
                    className={`flex h-10 items-center justify-center rounded-xl border transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                      isSelected
                        ? "border-white/80 bg-white text-[#142134] shadow-[0_20px_40px_-30px_rgba(255,255,255,0.75)]"
                        : isDisabled
                        ? "border-transparent bg-white/5 text-white/30"
                        : day.isToday
                        ? "border-white/35 bg-white/20 text-white"
                        : "border-transparent bg-white/12 text-white/80 hover:border-white/40 hover:bg-white/20"
                    } ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    {day.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex-1 space-y-4 lg:mt-0">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.26em] text-white/60">
              <span>{booking.timeHeading}</span>
              <div className="flex items-center gap-3">
                <span className={!is12HourFormat ? "text-white" : "text-white/40"}>{booking.format24}</span>
                <button
                  type="button"
                  onClick={() => setIs12HourFormat((prev) => !prev)}
                  className="relative inline-flex h-7 w-14 items-center rounded-full border border-white/30 bg-white/15 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  aria-pressed={is12HourFormat}
                >
                  <span
                    className={`absolute h-5 w-5 transform rounded-full bg-white shadow transition ${
                      is12HourFormat ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
                <span className={is12HourFormat ? "text-white" : "text-white/40"}>{booking.format12}</span>
              </div>
            </div>

            <div className="max-h-[320px] space-y-2 overflow-y-auto pr-1">
              {TIME_SLOTS.map((slot) => {
                const disabled = isSlotDisabled(slot, selectedDate, today);
                const isSelected = selectedTime === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={disabled}
                    onClick={() => {
                      if (disabled) return;
                      setSelectedTime(slot);
                    }}
                    className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                      isSelected
                        ? "border-white bg-white text-[#142134]"
                        : disabled
                        ? "border-transparent bg-white/5 text-white/30"
                        : "border-transparent bg-white/12 text-white/80 hover:border-white/40 hover:bg-white/20"
                    } ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <span>{formatTime(slot, is12HourFormat)}</span>
                    {!disabled && !isSelected && (
                      <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/40">
                        {booking.availabilityTag}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/12 p-4 text-sm text-white/80">
              {formattedSelection ? (
                <>
                  <p className="font-semibold text-white">{booking.selectedTitle}</p>
                  <p className="mt-1">{formattedSelection}</p>
                  <p className="mt-2 text-xs text-white/60">{booking.selectedDescription}</p>
                </>
              ) : (
                <p>{booking.selectPrompt}</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

type CalendarDay = {
  date: Date;
  label: number;
  isCurrentMonth: boolean;
  isToday: boolean;
};

function buildCalendar(viewDate: Date, today: Date): CalendarDay[] {
  const startOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const endOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0);
  const startOffset = (startOfMonth.getDay() + 6) % 7; // Monday-first
  const daysInMonth = endOfMonth.getDate();
  const totalCells = Math.max(35, Math.ceil((startOffset + daysInMonth) / 7) * 7);

  return Array.from({ length: totalCells }, (_, index) => {
    const dayOffset = index - startOffset;
    const date = new Date(
      viewDate.getFullYear(),
      viewDate.getMonth(),
      dayOffset + 1,
    );
    date.setHours(0, 0, 0, 0);
    return {
      date,
      label: date.getDate(),
      isCurrentMonth: dayOffset >= 0 && dayOffset < daysInMonth,
      isToday: isSameDay(date, today),
    };
  });
}

function offsetMonth(date: Date, offset: number) {
  const next = new Date(date.getFullYear(), date.getMonth() + offset, 1);
  next.setHours(0, 0, 0, 0);
  return next;
}

function isSameDay(a: Date | null, b: Date | null) {
  if (!a || !b) {
    return false;
  }
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isSlotDisabled(slot: string, selectedDate: Date | null, today: Date) {
  if (!selectedDate) {
    return true;
  }
  if (!isSameDay(selectedDate, today)) {
    return false;
  }
  const now = new Date();
  const [hours, minutes] = slot.split(":").map(Number);
  const slotMinutes = hours * 60 + minutes;
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  return slotMinutes <= currentMinutes;
}

function generateTimeSlots(startHour: number, endHour: number, stepMinutes: number) {
  const slots: string[] = [];
  for (let minutes = startHour * 60; minutes <= endHour * 60; minutes += stepMinutes) {
    const hours = Math.floor(minutes / 60)
      .toString()
      .padStart(2, "0");
    const mins = (minutes % 60).toString().padStart(2, "0");
    slots.push(`${hours}:${mins}`);
  }
  return slots;
}

function formatTime(time: string, use12Hour: boolean) {
  if (!use12Hour) {
    return time;
  }
  const [hoursPart, minutesPart] = time.split(":");
  const hours = parseInt(hoursPart, 10);
  const suffix = hours >= 12 ? "PM" : "AM";
  const normalized = hours % 12 || 12;
  return `${normalized}:${minutesPart} ${suffix}`;
}
