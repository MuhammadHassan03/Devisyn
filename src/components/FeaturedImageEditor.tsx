'use client';

import { useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { FaImage, FaTrash } from 'react-icons/fa';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface FeaturedImageEditorProps {
  imageUrl?: string;
  onChange: (url: string) => void;
  onRemove: () => void;
}

export default function FeaturedImageEditor({ imageUrl, onChange, onRemove }: FeaturedImageEditorProps) {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 100,
    height: 100,
    x: 0,
    y: 0,
  });
  const [image, setImage] = useState<string | null>(imageUrl || null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setImage(data.url);
        onChange(data.url);
      } else {
        toast.error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    }
  };

  const handleCropComplete = (crop: Crop) => {
    if (!imageRef.current || !image) return;

    const canvas = document.createElement('canvas');
    const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
    const scaleY = imageRef.current.naturalHeight / imageRef.current.height;
    canvas.width = crop.width!;
    canvas.height = crop.height!;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.drawImage(
        imageRef.current,
        crop.x! * scaleX,
        crop.y! * scaleY,
        crop.width! * scaleX,
        crop.height! * scaleY,
        0,
        0,
        crop.width!,
        crop.height!
      );

      canvas.toBlob((blob) => {
        if (!blob) return;
        const formData = new FormData();
        formData.append('file', blob, 'cropped-image.png');

        fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            setImage(data.url);
            onChange(data.url);
          })
          .catch((error) => {
            console.error('Error uploading cropped image:', error);
            toast.error('Failed to upload cropped image');
          });
      }, 'image/png');
    }
  };

  return (
    <div className="space-y-4">
      {image ? (
        <div className="relative group">
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={handleCropComplete}
            aspect={16 / 9}
          >
            <img
              ref={imageRef}
              src={image}
              alt="Featured"
              className="max-w-full h-auto rounded-lg"
            />
          </ReactCrop>
          <button
            onClick={onRemove}
            className="absolute top-2 right-2 p-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <FaTrash className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <label className="cursor-pointer">
            <div className="flex flex-col items-center gap-2">
              <FaImage className="w-8 h-8 text-gray-400" />
              <span className="text-sm text-gray-500">Click to upload featured image</span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
      )}
    </div>
  );
} 