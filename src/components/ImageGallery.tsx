import { useState } from 'react';
import { X } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  projectName?: string;
}

const ImageGallery = ({ images, projectName }: ImageGalleryProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  // Default fallback image
  const fallbackImage = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80';

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative h-64 md:h-72 rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => openLightbox(index)}
          >
            <img
              src={image}
              alt={`${projectName} - Image ${index + 1}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src = fallbackImage;
              }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 p-3 text-white/70 hover:text-white transition-colors bg-white/10 rounded-full hover:bg-white/20"
          >
            ←
          </button>

          <img
            src={images[currentImage] || fallbackImage}
            alt={`${projectName} - Image ${currentImage + 1}`}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = fallbackImage;
            }}
          />

          <button
            onClick={nextImage}
            className="absolute right-4 p-3 text-white/70 hover:text-white transition-colors bg-white/10 rounded-full hover:bg-white/20"
          >
            →
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70">
            {currentImage + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
