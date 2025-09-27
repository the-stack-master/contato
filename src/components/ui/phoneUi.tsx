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
  const baseHeight = 640; // base height in pixels

  return (
    <div
      style={{
        height: `${baseHeight - cropHeight}px`,
        transform: `rotate(${rotation}deg)`,
        overflow: "hidden",
      }}
    >
      <div
        className="relative w-80 max-w-full bg-gray-900 rounded-[3rem] p-2 shadow-2xl"
        style={{
          //   transform: `rotate(${rotation}deg)`,
          height: `${baseHeight}px`,
        }}
      >
        <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
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
              className={`object-cover transition-opacity duration-700 opacity-100`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneUi;
