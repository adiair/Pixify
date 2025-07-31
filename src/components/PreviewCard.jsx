
import { Download } from 'lucide-react';
import FileInfo from '../components/FileInfo';


const PreviewCard = ({ title, imageSrc, file, originalSize, showDownload, onDownload }) => (
  <div className=" rounded-2xl flex justify-center border-2 border-dashed border-black flex-col items-center p-6 shadow-lg "
    style={{
      background: "#ffffff",
      backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.35) 1px, transparent 0)",
      backgroundSize: "20px 20px",
    }}
  >
    <h3 className="text-xl font-semibold text-center mb-2 text-gray-800">
      {title}
    </h3>

    <div className="mb-2">
      <img
        src={imageSrc}
        alt={title}
        className="bg-gradient-to-br from-gray-100 to-gray-200 max-h-50 object-contain rounded-xl shadow-md"
      />
    </div>

    <FileInfo file={file} originalSize={originalSize} />

    {showDownload && (
      <button
        onClick={onDownload}
        className="w-full sm:w-auto mt-4 text-white py-3 px-6 rounded-xl font-semibold
               hover:-translate-y-1 hover:shadow-lg transition-all duration-300
               flex items-center justify-center gap-2 active:translate-y-0"
        style={{
          backgroundColor: "#0f172a",
          backgroundImage: `
        radial-gradient(circle, rgba(255, 255, 255, 0.6) 1px, transparent 1px),
        radial-gradient(circle, rgba(247, 250, 255, 0.4) 1px, transparent 1px),
        radial-gradient(circle, rgba(236,72,153,0.5) 1px, transparent 1px)
      `,
          backgroundSize: "20px 20px, 40px 40px, 60px 60px",
          backgroundPosition: "0 0, 10px 10px, 30px 30px",
        }}
      >
        <Download size={20} />
        Download
      </button>
    )}

  </div>
);


export default PreviewCard;