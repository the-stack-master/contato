const features = [
  {
    title: "Smart Profiles",
    desc: "Showcase your skills and interests clearly.",
  },
  {
    title: "Instant Messaging",
    desc: "Chat seamlessly with your connections.",
  },
  {
    title: "Event Networking",
    desc: "Find people before, during, and after events.",
  },
  {
    title: "Analytics Dashboard",
    desc: "Track your networking growth easily.",
  },
  { title: "Privacy Controls", desc: "Decide who can see and contact you." },
  { title: "Cross-Platform Sync", desc: "Access your network on any device." },
];

export default function FeaturesList() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">All Features</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
