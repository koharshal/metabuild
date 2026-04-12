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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-brutal-black">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative h-64 md:h-72 border-b border-r border-brutal-black overflow-hidden cursor-pointer group bg-brutal-black"
            onClick={() => openLightbox(index)}
          >
            <img
              src={image}
              alt={`${projectName} - Image ${index + 1}`}
              className="w-full h-full object-cover transition-all group-hover:opacity-60 grayscale group-hover:grayscale-0"
              onError={(e) => {
                (e.target as HTMLImageElement).src = fallbackImage;
              }}
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-brutal-white flex items-center justify-center border-[10px] border-brutal-black p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-brutal-black hover:bg-brutal-black hover:text-brutal-white border border-transparent hover:border-brutal-black transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-6 p-4 text-brutal-black font-display text-4xl border border-brutal-black hover:bg-brutal-black hover:text-brutal-white transition-colors"
          >
            ←
          </button>

          <div className="w-full h-full max-w-[80vw] max-h-[80vh] border border-brutal-black p-4 bg-brutal-bg flex items-center justify-center">
            <img
              src={images[currentImage] || fallbackImage}
              alt={`${projectName} - Image ${currentImage + 1}`}
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = fallbackImage;
              }}
            />
          </div>

          <button
            onClick={nextImage}
            className="absolute right-6 p-4 text-brutal-black font-display text-4xl border border-brutal-black hover:bg-brutal-black hover:text-brutal-white transition-colors"
          >
            →
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-brutal-black font-bold tracking-widest text-sm border border-brutal-black px-4 py-2">
            {currentImage + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
