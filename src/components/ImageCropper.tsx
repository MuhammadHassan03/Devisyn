'use client';

import { useState, useRef } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { FiCheck, FiX } from 'react-icons/fi';

interface ImageCropperProps {
  image: string;
  onCropComplete: (croppedImage: string) => void;
  onCancel: () => void;
  aspectRatio?: number;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

export default function ImageCropper({ 
  image, 
  onCropComplete, 
  onCancel,
  aspectRatio = 16/9,
  maxWidth = 1920,
  maxHeight = 1080,
  quality = 0.9
}: ImageCropperProps) {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 90,
    height: 90,
    x: 5,
    y: 5,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleCropComplete = (crop: PixelCrop) => {
    setCompletedCrop(crop);
  };

  const handleCrop = async () => {
    if (!imgRef.current || !completedCrop) return;

    const image = imgRef.current;
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Calculate dimensions while maintaining aspect ratio
    let width = completedCrop.width * scaleX;
    let height = completedCrop.height * scaleY;

    // Resize if dimensions exceed maximum
    if (width > maxWidth || height > maxHeight) {
      const ratio = Math.min(maxWidth / width, maxHeight / height);
      width *= ratio;
      height *= ratio;
    }

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    // Use high-quality settings
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      width,
      height
    );

    // Convert to base64 with specified quality
    const croppedImage = canvas.toDataURL('image/jpeg', quality);
    onCropComplete(croppedImage);
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-[#1A1A1A] rounded-lg p-6 max-w-4xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Crop Image</h2>
          <div className="flex space-x-2">
            <button
              onClick={handleCrop}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <FiCheck className="w-5 h-5" />
              <span>Apply</span>
            </button>
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
            >
              <FiX className="w-5 h-5" />
              <span>Cancel</span>
            </button>
          </div>
        </div>
        <div className="relative">
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={handleCropComplete}
            aspect={aspectRatio}
            className="max-h-[70vh]"
          >
            <img
              ref={imgRef}
              src={image}
              alt="Crop me"
              className="max-w-full"
              style={{ maxHeight: '70vh' }}
            />
          </ReactCrop>
        </div>
      </div>
    </div>
  );
} 