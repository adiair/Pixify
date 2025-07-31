const QualityControl = ({ quality, onQualityChange }) => (
  <div className="px-4 sm:px-8 md:px-20 lg:px-40 py-4 rounded-2xl w-full">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
      <label className="text-base sm:text-lg font-semibold text-gray-800">
        Compression Quality
      </label>
      <span className="bg-black text-white px-4 py-1 rounded-full font-semibold text-sm sm:text-base text-center">
        {quality}%
      </span>
    </div>

    <input
      type="range"
      min="10"
      max="100"
      value={quality}
      onChange={onQualityChange}
      className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
    />

    {/* Custom styles for range thumb */}
    <style jsx>{`
      .slider::-webkit-slider-thumb {
        appearance: none;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: black;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transition: transform 0.2s ease;
      }
      .slider::-webkit-slider-thumb:hover {
        transform: scale(1.2);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5);
      }

      .slider::-moz-range-thumb {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: black;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transition: transform 0.2s ease;
      }
      .slider::-moz-range-thumb:hover {
        transform: scale(1.2);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5);
      }
    `}</style>
  </div>
);

export default QualityControl;
