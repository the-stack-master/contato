import Image from "next/image";

interface HeroImage {
  url: string;
  caption?: string;
}

interface PhoneUiProps {
  image: HeroImage;
  rotation?: number;
  cropHeight?: number;
}

const PhoneUi = ({ image, rotation = 0, cropHeight = 0 }: PhoneUiProps) => {
  const baseHeight = 480; // reduced from 512
  const baseWidth = 240; // reduced from 256

  return (
    <div
      style={{
        height: `${baseHeight - cropHeight}px`,
        width: baseWidth,
        overflow: "hidden",
        transform: `rotate(${rotation}deg)`,
        borderRadius: "3rem",
        position: "relative",
        boxShadow: "0 0 0 4px #1f2937",
        backgroundColor: "#1f2937",
      }}
    >
      <div
        className="relative bg-gray-900 rounded-[3rem] p-2 shadow-2xl"
        style={{
          height: baseHeight,
          width: "100%",
          overflow: "hidden",
          boxShadow: "inset 0 0 10px #fff",
        }}
      >
        <div className="w-full h-full bg-white rounded-[3rem] overflow-hidden relative">
          {/* Status Bar */}
          <div className="h-12 bg-gray-50 flex items-center justify-between px-6 text-sm font-medium text-gray-900">
            <span>9:41</span>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-2 bg-gray-900 rounded-sm" />
              <div className="w-6 h-3 border border-gray-900 rounded-sm">
                <div className="w-4 h-1.5 bg-gray-900 rounded-sm m-0.5" />
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="w-full h-[calc(100%-3rem)] relative">
            <Image
              src={image?.url}
              alt={image?.caption || "phone-screen"}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneUi;
