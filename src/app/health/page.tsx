import { env } from "@/lib/env";

export default function HealthPage() {
  const databaseLoaded = Boolean(env.DATABASE_URL);

  return (
    <main className="flex min-h-screen flex-col items-start gap-4 bg-white px-8 py-10 text-black">
      <h1 className="text-2xl font-semibold">OK</h1>
      <p>
        Event window: {env.EVENT_START} to {env.EVENT_END}
      </p>
      <p>Session days: {env.SESSION_DAYS}</p>
      <p>DATABASE_URL loaded: {databaseLoaded ? "yes" : "no"}</p>
    </main>
  );
}
