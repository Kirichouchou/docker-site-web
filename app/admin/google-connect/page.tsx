export const dynamic = "force-dynamic";

type Props = { searchParams: { key?: string } };

export default function GoogleConnectPage({ searchParams }: Props) {
  const key = searchParams.key ?? "";

  if (key !== process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY) {
    return <p>Accès refusé</p>;
  }

  const authUrl =
    "https://accounts.google.com/o/oauth2/v2/auth" +
    `?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}` +
    `&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}` +
    `&response_type=code` +
    `&scope=https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.readonly` +
    `&access_type=offline` +
    `&prompt=consent`;

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Connecter Google Calendar</h2>
      <a
        href={authUrl}
        style={{
          display: "inline-block",
          padding: "12px 24px",
          background: "#4285F4",
          color: "#fff",
          borderRadius: "4px",
          textDecoration: "none",
          marginTop: "1rem",
        }}
      >
        Se connecter à Google
      </a>
    </div>
  );
}
