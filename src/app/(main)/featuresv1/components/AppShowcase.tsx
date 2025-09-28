import AppScreens from "./AppScreens";

export default function AppShowcase() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left - Phone Screens */}
        <div className="flex justify-center">
          <AppScreens />
        </div>

        {/* Right - Highlights */}
        <div>
          <h2 className="text-4xl font-bold mb-6">
            A Powerful Networking Experience
          </h2>
          <ul className="space-y-4 text-gray-700">
            <li>📱 Sleek, modern UI designed for professionals</li>
            <li>🤝 AI-driven suggestions to expand your network</li>
            <li>🔔 Smart notifications so you never miss an opportunity</li>
            <li>🌍 Connect globally with just one tap</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
