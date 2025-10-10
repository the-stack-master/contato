import { TrustStatistics } from "@/types/homeTypes";

interface StatsSectionProps {
  statsData: TrustStatistics | null;
}

const StatsSection = ({ statsData }: StatsSectionProps) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {statsData?.sectionHeading}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {statsData?.sectionDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData?.statistics?.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-gray-50 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="text-4xl md:text-5xl font-bold text-[#f15A24] mb-3 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Logo strip */}
        {/* <div className="mt-20 pt-16 border-t border-gray-300">
          <p className="text-center text-gray-500 mb-8 font-medium">
            Proudly trusted by leading global companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {["Microsoft", "Google", "Amazon", "Apple", "Meta", "Tesla"].map(
              (company, index) => (
                <div
                  key={index}
                  className="px-6 py-3 bg-gray-200 rounded-lg text-gray-700 font-semibold hover:text-[#f15A24] hover:bg-gray-100 transition-colors duration-300 cursor-default"
                >
                  {company}
                </div>
              )
            )}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default StatsSection;
