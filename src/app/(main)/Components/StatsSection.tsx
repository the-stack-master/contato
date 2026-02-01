import { TrustStatistics } from "@/types/homeTypes";

interface StatsSectionProps {
  statsData: TrustStatistics | null;
}

const StatsSection = ({ statsData }: StatsSectionProps) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center ">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {statsData?.sectionHeading}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {statsData?.sectionDescription}
          </p>
        </div>


      </div>
    </section>
  );
};

export default StatsSection;
