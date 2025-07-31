import React, { useState, useCallback, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';

import Header from './components/Header';
import UploadArea from './components/UploadArea';
import PreviewCard from './components/PreviewCard';
import QualityControl from './components/QualityControl';

const ImageCompressor = () => {
  const [originalFile, setOriginalFile] = useState(null);
  const [compressedBlob, setCompressedBlob] = useState(null);
  const [quality, setQuality] = useState(80);
  const [isDragging, setIsDragging] = useState(false);
  const [originalImageUrl, setOriginalImageUrl] = useState('');
  const [compressedImageUrl, setCompressedImageUrl] = useState('');

  // Cleanup blob URL when component unmounts or URL changes
  useEffect(() => {
    return () => {
      if (compressedImageUrl) {
        URL.revokeObjectURL(compressedImageUrl);
      }
    };
  }, [compressedImageUrl]);

  // Compress image function (async)
  const compressImage = useCallback(async (file, compressionQuality) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      const img = new Image();

      img.onload = async () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const blob = await new Promise((resolve) =>
          canvas.toBlob(
            (b) => resolve(b),
            'image/jpeg',
            compressionQuality / 100
          )
        );

        if (!blob) {
          console.error('Compression failed: blob is null');
          return;
        }

        console.log(' Compressed blob created:', blob);

        setCompressedBlob(blob);
        setCompressedImageUrl(URL.createObjectURL(blob));
      };

      img.onerror = (err) => {
        console.error('Image load error:', err);
      };

      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  }, []);

  // Handle file processing
  const processFile = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return;

    setOriginalFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImageUrl(e.target.result);
    };
    reader.readAsDataURL(file);

    compressImage(file, quality);
  }, [quality, compressImage]);

  // Event handlers
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleQualityChange = (e) => {
    const newQuality = parseInt(e.target.value);
    setQuality(newQuality);
    if (originalFile) {
      compressImage(originalFile, newQuality);
    }
  };

  const handleDownload = () => {
    if (compressedBlob && originalFile) {
      const url = URL.createObjectURL(compressedBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `compressed_${originalFile.name.split('.')[0]}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleReset = () => {
    setOriginalFile(null);
    setCompressedBlob(null);
    setQuality(80);
    setOriginalImageUrl('');
    setCompressedImageUrl('');
  };

  return (
    <div className="min-h-screen p-5">
      <Header />
      <div className="max-w-6xl mx-auto bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden"
        style={{
      backgroundImage: `
        linear-gradient(to right, #e5e7eb 1px, transparent 1px),
        linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
      `,
      backgroundSize: "40px 40px",
    }}
      >

        <div className="p-10">
          <UploadArea
            onFileSelect={handleFileSelect}
            isDragging={isDragging}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          />

          {originalFile && (
            <>
              <div className="mt-8">
                <QualityControl
                  quality={quality}
                  onQualityChange={handleQualityChange}
                />
              </div>

              <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <PreviewCard
                  title="Original Image"
                  imageSrc={originalImageUrl}
                  file={originalFile}
                  showDownload={false}
                />

                {compressedBlob && (
                  <PreviewCard
                    title="Compressed Image"
                    imageSrc={compressedImageUrl}
                    file={new File([compressedBlob], originalFile.name, {
                      type: 'image/jpeg',
                      lastModified: Date.now(),
                    })}
                    originalSize={originalFile.size}
                    showDownload={true}
                    onDownload={handleDownload}
                  />
                )}
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={handleReset}
                  className="bg-black text-white 
                             py-3 px-8 rounded-full font-semibold
                             flex items-center gap-2 mx-auto cursor-pointer
                             "
                >
                  <RotateCcw size={20} />
                  Process Another Image
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageCompressor;
