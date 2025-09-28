export default function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#f15A24] via-orange-500 to-red-500 text-white text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-6">Ready to Grow Your Network?</h2>
        <p className="mb-8 text-lg">
          Join thousands of professionals already using our app.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="#"
            className="px-6 py-3 bg-white text-[#f15A24] rounded-xl font-semibold shadow hover:scale-105 transition"
          >
            App Store
          </a>
          <a
            href="#"
            className="px-6 py-3 bg-white text-[#f15A24] rounded-xl font-semibold shadow hover:scale-105 transition"
          >
            Google Play
          </a>
        </div>
      </div>
    </section>
  );
}
