import Image from "next/image";

interface HeroImage {
  url: string;
  caption?: string;
}

interface PhoneUiProps {
  image: HeroImage;
  rotation?: number;
  cropHeight?: number; // number of pixels to reduce height (cutoff)
}

const PhoneUi = ({ image, rotation = 0, cropHeight = 0 }: PhoneUiProps) => {
  const baseHeight = 512;
  const baseWidth = 256;

  return (
    <div
      style={{
        height: `${baseHeight - cropHeight}px`,
        width: baseWidth,
        overflow: "hidden",
        transform: `rotate(${rotation}deg)`,
        borderRadius: "3rem",
        position: "relative",
        boxShadow: "0 0 0 4px #1f2937", // to mimic phone border edge - adjust color and size to blend
        backgroundColor: "#1f2937", // same as gray-900 background to cover gaps
      }}
    >
      <div
        className="relative bg-gray-900 rounded-[3rem] p-2 shadow-2xl"
        style={{
          height: baseHeight,
          width: "100%",
          overflow: "hidden",
          boxShadow: "inset 0 0 10px #fff", // soft white inset shadow to mask edges
        }}
      >
        <div className="w-full h-full bg-white rounded-[3rem] overflow-hidden relative">
          {/* Status Bar */}
          <div className="h-12 bg-gray-50 flex items-center justify-between px-6 text-sm font-medium text-gray-900">
            <span>9:41</span>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-2 bg-gray-900 rounded-sm"></div>
              <div className="w-6 h-3 border border-gray-900 rounded-sm">
                <div className="w-4 h-1.5 bg-gray-900 rounded-sm m-0.5"></div>
              </div>
            </div>
          </div>

          {/* Slideshow */}
          <div className="w-full h-[calc(100%-3rem)] relative">
            <Image
              src={image?.url}
              alt={`slide-${image?.caption}`}
              fill
              className="object-cover transition-opacity duration-700 opacity-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneUi;
