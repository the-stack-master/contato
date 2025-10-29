import { IconComponent } from "@/components/ui/IconComponent";
import { ContentFeature } from "@/types/homeTypes";
import { motion, useCycle } from "framer-motion";
import { Check } from "lucide-react";
import { useEffect } from "react";

// Primary blob backgrounds (main shape, red/orange gradient)
const mainBlobPaths = [
  "M390,175Q405,264,311,312Q217,360,113,330Q9,300,49,193Q89,86,194,72Q299,58,374,116Q390,175,390,175Z",
  "M374,202Q368,294,293,342Q218,390,121,371Q24,352,66,251Q108,150,205,111Q302,72,357,134Q374,202,374,202Z",
  "M387,170Q408,271,328,320Q248,369,136,336Q24,303,71,185Q118,67,229,72Q340,77,373,123Q387,170,387,170Z",
];

// Accent blob backgrounds (yellow/pale accent, smaller shape)
const accentBlobPaths = [
  "M313,260Q316,309,263,319Q210,329,135,297Q60,265,96,204Q132,143,204,127Q276,111,297,173Q313,220,313,260Z",
  "M310,268Q325,309,265,322Q205,335,153,297Q101,259,119,199Q137,139,214,144Q291,149,306,209Q310,238,310,268Z",
  "M301,256Q312,312,255,306Q198,300,157,262Q116,224,148,167Q180,110,235,124Q290,138,298,197Q301,226,301,256Z",
];

interface FeatureBlobCardProps {
  feature: ContentFeature;
  index: number;
}

const FeatureBlobCard = ({ feature, index }: FeatureBlobCardProps) => {
  return (
    <motion.div
      key={feature.featureTitle + index}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="relative flex items-center justify-center text-center p-12 cursor-pointer"
    >
      {/* Static blob background that morphs on hover */}
      <motion.div
        className="absolute inset-0"
        initial={{
          borderRadius: "60% 40% 30% 70% / 50% 60% 40% 50%",
        }}
        whileHover={{
          borderRadius: "45% 55% 70% 30% / 60% 40% 70% 50%",
          rotate: 2,
          scale: 1.05,
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
        }}
        style={{
          background:
            "linear-gradient(145deg, rgba(241,90,36,0.95) 0%, rgba(255,160,90,0.9) 40%, rgba(255,210,150,0.8) 100%)",
          filter: "blur(0.5px)",
          boxShadow:
            "0 10px 30px rgba(241,90,36,0.25), inset 0 0 30px rgba(255,255,255,0.2)",
        }}
      />

      {/* Content Layer */}
      <motion.div
        className="relative z-10 max-w-sm transition-transform duration-500"
        whileHover={{ y: -5 }}
      >
        <div className="mb-5 flex justify-center">
          <IconComponent
            name={feature.iconName}
            className="w-10 h-10 text-white drop-shadow-lg"
          />
        </div>

        <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-md">
          {feature.featureTitle}
        </h3>

        <p className="text-white/90 mb-6 leading-relaxed text-sm">
          {feature.description}
        </p>

        <ul className="space-y-2 text-left text-white/90">
          {feature.featurePoints.map((benefit, idx) => (
            <li key={idx} className="flex items-center text-sm">
              <Check className="w-4 h-4 mr-2 flex-shrink-0 text-white" />
              {benefit}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default FeatureBlobCard;
