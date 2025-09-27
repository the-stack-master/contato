import Image from "next/image";

interface HeroImage {
  url: string;
  caption?: string;
}

interface PhoneUiProps {
  image: HeroImage;
  rotation?: number;
  cropHeight?: number; // pixels cropped from bottom
  scale?: number; // optional scaling factor, 1 = full size
}

const PhoneUiSmall = ({
  image,
  rotation = 0,
  cropHeight = 0,
  scale = 0.8,
}: PhoneUiProps) => {
  const baseHeight = 640 * scale;
  const baseWidth = 320 * scale; // Adjust width proportionally if needed

  return (
    <div
      style={{
        height: `${baseHeight - cropHeight * scale}px`,
        width: `${baseWidth}px`,
        transform: `rotate(${rotation}deg) scale(${scale})`,
        overflow: "hidden",
      }}
    >
      <div
        className="relative bg-gray-900 rounded-[3rem] p-2 shadow-2xl"
        style={{
          height: `${baseHeight}px`,
          width: `${baseWidth}px`,
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
              className="object-cover transition-opacity duration-700 opacity-100"
              priority={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneUiSmall;
