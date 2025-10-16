// Générateur de fichiers .ics pour les invitations calendrier

export type ICSEventData = {
  summary: string;           // Titre de l'événement
  description: string;       // Description
  location?: string;         // Lieu (optionnel)
  startDateTime: Date;       // Date/heure de début
  endDateTime: Date;         // Date/heure de fin
  organizerName: string;     // Nom de l'organisateur
  organizerEmail: string;    // Email de l'organisateur
  attendeeName?: string;     // Nom du participant
  attendeeEmail?: string;    // Email du participant
};

/**
 * Formate une date en format iCalendar (ex: 20251020T140000Z)
 */
function formatICSDate(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  
  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

/**
 * Génère le contenu d'un fichier .ics
 */
export function generateICS(eventData: ICSEventData): string {
  const now = new Date();
  const dtstamp = formatICSDate(now);
  const dtstart = formatICSDate(eventData.startDateTime);
  const dtend = formatICSDate(eventData.endDateTime);
  
  // Génère un UID unique pour l'événement
  const uid = `${Date.now()}-${Math.random().toString(36).substring(7)}@fynora.fr`;
  
  // Escape les caractères spéciaux dans le texte
  const escape = (text: string) => text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
  
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Fynora//Calendar//FR',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${dtstart}`,
    `DTEND:${dtend}`,
    `SUMMARY:${escape(eventData.summary)}`,
    `DESCRIPTION:${escape(eventData.description)}`,
  ];
  
  if (eventData.location) {
    lines.push(`LOCATION:${escape(eventData.location)}`);
  }
  
  // Organisateur
  lines.push(`ORGANIZER;CN="${escape(eventData.organizerName)}":mailto:${eventData.organizerEmail}`);
  
  // Participant (si fourni)
  if (eventData.attendeeEmail && eventData.attendeeName) {
    lines.push(
      `ATTENDEE;CN="${escape(eventData.attendeeName)}";RSVP=TRUE;PARTSTAT=NEEDS-ACTION:mailto:${eventData.attendeeEmail}`
    );
  }
  
  // Rappels
  lines.push(
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    'DESCRIPTION:Rappel',
    'TRIGGER:-PT30M', // 30 minutes avant
    'END:VALARM'
  );
  
  lines.push(
    'END:VEVENT',
    'END:VCALENDAR'
  );
  
  return lines.join('\r\n');
}

/**
 * Parse un bookingSummary du format "lundi 20 octobre à 14:00"
 * et retourne un objet Date
 */
export function parseBookingSummary(bookingSummary: string): { startDate: Date; endDate: Date } | null {
  try {
    console.log('🔍 Parsing bookingSummary:', bookingSummary);
    
    // Format attendu: "lundi 20 janvier à 14:00" ou "Monday, January 20 at 2:00 PM"
    // On va extraire le jour (numéro), mois (nom) et heure
    
    // Mapping des mois français
    const monthsFR: Record<string, number> = {
      'janvier': 0, 'février': 1, 'mars': 2, 'avril': 3, 'mai': 4, 'juin': 5,
      'juillet': 6, 'août': 7, 'septembre': 8, 'octobre': 9, 'novembre': 10, 'décembre': 11
    };
    
    // Mapping des mois anglais
    const monthsEN: Record<string, number> = {
      'january': 0, 'february': 1, 'march': 2, 'april': 3, 'may': 4, 'june': 5,
      'july': 6, 'august': 7, 'september': 8, 'october': 9, 'november': 10, 'december': 11
    };
    
    const allMonths = { ...monthsFR, ...monthsEN };
    
    // Regex modifiée pour capturer : "jour_semaine NUMERO mois à/at HEURE:MINUTE"
    // Exemples: "lundi 20 janvier à 14:00", "Monday, January 20 at 2:00 PM"
    const regex = /\w+[\s,]+(\d{1,2})[\s,]+(\w+)[\s,]+(à|at)[\s,]+(\d{1,2}):(\d{2})/i;
    const match = bookingSummary.match(regex);
    
    if (!match) {
      console.error('❌ Format de bookingSummary non reconnu:', bookingSummary);
      console.error('   Format attendu: "lundi 20 janvier à 14:00"');
      return null;
    }
    
    const day = parseInt(match[1], 10);
    const monthName = match[2].toLowerCase();
    const hour = parseInt(match[4], 10);
    const minute = parseInt(match[5], 10);
    
    console.log('✅ Extraction:', { day, monthName, hour, minute });
    
    const month = allMonths[monthName];
    
    if (month === undefined) {
      console.error('❌ Mois non reconnu:', monthName);
      console.error('   Mois disponibles:', Object.keys(allMonths));
      return null;
    }
    
    // Année courante ou suivante
    const now = new Date();
    let year = now.getFullYear();
    
    // Si le mois/jour est déjà passé cette année, prendre l'année prochaine
    const tempDate = new Date(year, month, day);
    if (tempDate < now) {
      year++;
    }
    
    const startDate = new Date(year, month, day, hour, minute, 0);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // +1 heure
    
    console.log('✅ Dates créées:', { startDate, endDate });
    
    return { startDate, endDate };
  } catch (error) {
    console.error('❌ Erreur lors du parsing du bookingSummary:', error);
    return null;
  }
}

