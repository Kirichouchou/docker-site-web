export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { isEmail } from "@/lib/validation";
import { createCalendarEvent } from "@/lib/google-calendar";
import { parseBookingSummary, generateICS } from "@/lib/ics-generator";

type CommandePayload = {
  name: string;
  email: string;
  message: string;
  options?: {
    bookingSummary?: string;
    [key: string]: unknown;
  };
};

function formatOptions(options: unknown): string {
  if (options == null) return "(aucune)";
  if (Array.isArray(options)) {
    return options.map((o) => `- ${String(o)}`).join("\n");
  }
  if (typeof options === "object") {
    return Object.entries(options as Record<string, unknown>)
      .map(([k, v]) => `- ${k}: ${typeof v === "string" ? v : JSON.stringify(v)}`)
      .join("\n");
  }
  return String(options);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<CommandePayload> | null;
    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const message = String(body?.message ?? "").trim();
    const options = body?.options as unknown;

    if (!name || !isEmail(email) || !message) {
      return NextResponse.json({ error: "Champs invalides" }, { status: 400 });
    }

    const hasSMTP = !!(
      process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
    );
    if (!hasSMTP) {
      console.warn("⚠️ SMTP non configuré → pas d'envoi d'email");
      return new Response(
        JSON.stringify({ ok: true, mail: false, error: "SMTP non configuré" }),
        { status: 200 }
      );
    }

    const to = process.env.COMMANDE_TO || process.env.SMTP_USER;
    if (!to) {
      return NextResponse.json({ error: "Configuration email manquante" }, { status: 500 });
    }

    const fromAddr = process.env.SMTP_USER || "no-reply@example.com";
    const optionsSummary = formatOptions(options);

    const text = [
      `Nouvelle commande`,
      `Nom: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
      "",
      "Options:",
      optionsSummary,
    ].join("\n");

    const host = process.env.SMTP_HOST!;
    const port = Number(process.env.SMTP_PORT!);
    const user = process.env.SMTP_USER!;
    const pass = process.env.SMTP_PASS!;
    const secure = port === 465;

    // Créer l'événement Google Calendar et le fichier .ics si un créneau est réservé
    let calendarResult = null;
    let icsAttachment = null;
    
    if (options && typeof options === 'object' && 'bookingSummary' in options) {
      const bookingSummary = options.bookingSummary as string;

      if (bookingSummary) {
        console.log('📅 BookingSummary reçu:', bookingSummary);
        try {
          // Parser le créneau de réservation
          const parsedDates = parseBookingSummary(bookingSummary);
          console.log('📅 Dates parsées:', parsedDates);
          
          if (parsedDates) {
            const { startDate, endDate } = parsedDates;
            
            // Créer l'événement dans Google Calendar
            calendarResult = await createCalendarEvent({
              summary: `Appel avec ${name}`,
              description: `${message}\n\n---\nEmail: ${email}\nTéléphone: ${text.match(/Téléphone\s*:\s*(.+)/)?.[1] || 'N/A'}\n\nCréneau: ${bookingSummary}\n\nOptions:\n${optionsSummary}`,
              startDateTime: startDate.toISOString(),
              endDateTime: endDate.toISOString(),
              attendeeEmail: email,
              attendeeName: name,
            });

            if (calendarResult.success) {
              console.log('✅ Événement Google Calendar créé:', calendarResult.eventLink);
            } else {
              console.error('❌ Échec de création de l\'événement Google Calendar:', calendarResult.error);
            }
            
            // Générer le fichier .ics pour le client
            const icsContent = generateICS({
              summary: `Appel avec Fynora`,
              description: `Rendez-vous téléphonique avec l'équipe Fynora pour discuter de votre projet.\n\n${message}`,
              startDateTime: startDate,
              endDateTime: endDate,
              organizerName: 'Fynora',
              organizerEmail: to,
              attendeeName: name,
              attendeeEmail: email,
            });
            
            icsAttachment = {
              filename: 'invitation-fynora.ics',
              content: icsContent,
              contentType: 'text/calendar; charset=utf-8; method=REQUEST',
            };
            
          } else {
            console.error('❌ Impossible de parser le bookingSummary:', bookingSummary);
          }
        } catch (calError) {
          console.error('❌ Erreur lors de la création de l\'événement:', calError);
          // On ne fait pas échouer la requête si le calendrier échoue
        }
      }
    }

    // Envoyer l'email
    const nm = await import("nodemailer");
    const transporter = nm.default.createTransport({ host, port, secure, auth: { user, pass } });
    
    // Email pour vous (notification)
    await transporter.sendMail({
      from: `Site Web <${fromAddr}>`,
      to,
      replyTo: email,
      subject: `Commande - ${name}`,
      text,
    });
    
    // Email pour le client (avec fichier .ics si disponible)
    if (icsAttachment) {
      await transporter.sendMail({
        from: `Fynora <${fromAddr}>`,
        to: email,
        subject: `Confirmation de votre rendez-vous avec Fynora`,
        text: `Bonjour ${name},\n\nVotre rendez-vous avec Fynora a bien été confirmé.\n\nCréneau: ${(options && typeof options === 'object' && 'bookingSummary' in options ? options.bookingSummary : 'À définir')}\n\nVous trouverez en pièce jointe une invitation à ajouter à votre calendrier.\n\nÀ très bientôt !\n\nL'équipe Fynora`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0A304E;">Bonjour ${name},</h2>
            <p>Votre rendez-vous avec Fynora a bien été confirmé.</p>
            <p><strong>Créneau:</strong> ${(options && typeof options === 'object' && 'bookingSummary' in options ? options.bookingSummary : 'À définir')}</p>
            <p>Vous trouverez en pièce jointe une invitation à ajouter à votre calendrier.</p>
            <p>À très bientôt !</p>
            <p style="color: #666; font-size: 14px;">L'équipe Fynora</p>
          </div>
        `,
        attachments: [icsAttachment],
      });
      
      console.log('✅ Email de confirmation avec .ics envoyé au client:', email);
    }

    return NextResponse.json({ 
      success: true,
      calendarEvent: calendarResult?.success ? {
        created: true,
        eventLink: calendarResult.eventLink
      } : null
    });
  } catch (err) {
    console.error('❌ Erreur dans /api/commande:', err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
