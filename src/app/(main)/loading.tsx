export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="flex space-x-3">
        {/* Dot 1 */}
        <span className="w-4 h-4 rounded-full bg-[#f15A24] animate-pulse" />
        {/* Dot 2 */}
        <span className="w-4 h-4 rounded-full bg-[#f15A24] animate-pulse animation-delay-200" />
        {/* Dot 3 */}
        <span className="w-4 h-4 rounded-full bg-[#f15A24] animate-pulse animation-delay-400" />
      </div>
    </div>
  );
}
