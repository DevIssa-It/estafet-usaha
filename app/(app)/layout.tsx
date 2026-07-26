import { createClient } from "@/lib/supabase/server";
import { getUserProfile } from "@/lib/supabase/getProfile";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/shared/Sidebar";
import { Header } from "@/components/shared/Header";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth");

  const profile = await getUserProfile(supabase, user.id);

  const businessName = (profile as any)?.businesses?.name;

  return (
    <div style={{ display: "flex", minHeight: "100dvh", backgroundColor: "var(--color-canvas-dark)" }}>
      <Sidebar profile={profile} businessName={businessName} />

      {/* Main content */}
      <div style={{
        flex: 1,
        marginLeft: 240,
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--color-canvas-dark)",
        overflowX: "hidden",
      }}>
        <Header profile={profile} businessName={businessName} />
        <main style={{ flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
