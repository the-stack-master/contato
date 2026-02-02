import HomePageServer from "@/components/serverComponents/HomePageServer";

export const revalidate = 60;

export default async function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <HomePageServer />
      </main>
    </div>
  );
}
