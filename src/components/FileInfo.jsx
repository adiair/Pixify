import { Download, File, Maximize, Calendar } from 'lucide-react';

const FileInfo = ({ file, originalSize = null }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const reduction = originalSize
    ? ((originalSize - file.size) / originalSize * 100).toFixed(1)
    : null;
  const savedSpace = originalSize
    ? formatFileSize(originalSize - file.size)
    : null;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-sm p-4 space-y-4 w-full sm:max-w-sm">
      {/* Saved Space Info */}
      {originalSize && (
        <div className="flex flex-wrap items-center justify-between border-b pb-3 mb-2">
          <div className="flex items-center gap-2 text-green-600 font-medium">
            <Download size={16} />
            <span>Saved:</span>
          </div>
          <span className="text-green-700 font-semibold text-sm">
            {savedSpace} 
          </span>
        </div>
      )}

      {/* File Name */}
      <div className="flex flex-wrap items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-gray-500">
          <File size={16} />
          <span className="font-medium">Name:</span>
        </div>
        <span
          className="font-semibold text-gray-700 truncate max-w-[180px] text-right"
          title={file.name}
        >
          {file.name}
        </span>
      </div>

      {/* File Size */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-gray-500">
          <Maximize size={16} />
          <span className="font-medium">Size:</span>
        </div>
        <span className="font-semibold text-gray-700">
          {formatFileSize(file.size)}
        </span>
      </div>

      {/* File Type */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-gray-500">
          <Calendar size={16} />
          <span className="font-medium">Type:</span>
        </div>
        <span className="font-semibold text-gray-700">
          {file.type}
        </span>
      </div>
    </div>
  );
};

export default FileInfo;
