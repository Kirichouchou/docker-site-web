import { google } from 'googleapis';

// Configuration Google Calendar
export function getCalendarClient() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!clientEmail || !privateKey || !calendarId) {
    throw new Error('Configuration Google Calendar manquante. Vérifiez vos variables d\'environnement.');
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  const calendar = google.calendar({ version: 'v3', auth });

  return { calendar, calendarId };
}

export type CalendarEventData = {
  summary: string;
  description: string;
  startDateTime: string; // Format ISO 8601: "2025-10-20T10:00:00+02:00"
  endDateTime: string;   // Format ISO 8601: "2025-10-20T11:00:00+02:00"
  attendeeEmail?: string;
  attendeeName?: string;
};

export async function createCalendarEvent(eventData: CalendarEventData) {
  try {
    const { calendar, calendarId } = getCalendarClient();

    // Note: Les comptes de service ne peuvent pas inviter des participants
    // sans Domain-Wide Delegation. On crée l'événement sans participants.
    const event = {
      summary: eventData.summary,
      description: eventData.description,
      start: {
        dateTime: eventData.startDateTime,
        timeZone: 'Europe/Paris',
      },
      end: {
        dateTime: eventData.endDateTime,
        timeZone: 'Europe/Paris',
      },
      // Pas d'attendees pour éviter l'erreur de permission
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 jour avant
          { method: 'popup', minutes: 30 },       // 30 min avant
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId,
      requestBody: event,
      sendUpdates: 'none', // Pas d'envoi d'invitation
    });

    return {
      success: true,
      eventId: response.data.id,
      eventLink: response.data.htmlLink,
    };
  } catch (error) {
    console.error('❌ Erreur lors de la création de l\'événement Google Calendar:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    };
  }
}

// Fonction pour parser une date de formulaire et créer les dates de début/fin
export function createEventDates(date: string, time: string, durationMinutes: number = 60) {
  // Format attendu: date = "2025-10-20", time = "10:00"
  const startDateTime = new Date(`${date}T${time}:00+02:00`);
  const endDateTime = new Date(startDateTime.getTime() + durationMinutes * 60 * 1000);

  return {
    startDateTime: startDateTime.toISOString(),
    endDateTime: endDateTime.toISOString(),
  };
}

