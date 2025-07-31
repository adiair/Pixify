import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

const UploadArea = ({ onFileSelect, onDragOver, onDragLeave, onDrop }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`
        border-2 border-dashed border-black rounded-2xl 
        p-6 sm:p-10 lg:p-16 text-center cursor-pointer 
        transition-all duration-300 hover:shadow-md hover:bg-gray-50
      `}
      onClick={handleClick}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      style={{
      background: "#ffffff",
      backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.35) 1px, transparent 0)",
      backgroundSize: "20px 20px",
    }}
    >
      <Upload className="text-blue-500 mx-auto mb-4 sm:mb-6" size={48} />
      
      <div className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">
        Drop your image here or click to browse
      </div>

      <div className="text-sm sm:text-base text-gray-600">
        Supports JPEG, PNG, WebP formats
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default UploadArea;
