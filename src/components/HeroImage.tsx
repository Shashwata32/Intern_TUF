// src/components/HeroImage.tsx
import { format } from 'date-fns';

interface HeroImageProps {
  currentMonth: Date;
}

export default function HeroImage({ currentMonth }: HeroImageProps) {
  const seasonalImages = [
    { month: 0, url: "https://images.unsplash.com/photo-1543589077-47d81606c1c8?w=800&h=500&fit=crop", alt: "Winter snow scene" },
    { month: 1, url: "https://images.unsplash.com/photo-1513151233558-860c5392816f?w=800&h=500&fit=crop", alt: "Valentine hearts" },
    { month: 2, url: "https://images.unsplash.com/photo-1584208124886-3c99f43a3cdc?w=800&h=500&fit=crop", alt: "Spring flowers" },
    { month: 3, url: "https://images.unsplash.com/photo-1513151233558-860c5392816f?w=800&h=500&fit=crop", alt: "April showers" },
    { month: 4, url: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&h=500&fit=crop", alt: "May flowers" },
    { month: 5, url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop", alt: "Summer beach" },
    { month: 6, url: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=800&h=500&fit=crop", alt: "July fireworks" },
    { month: 7, url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=500&fit=crop", alt: "Summer sun" },
    { month: 8, url: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=800&h=500&fit=crop", alt: "Fall harvest" },
    { month: 9, url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=500&fit=crop", alt: "Halloween pumpkins" },
    { month: 10, url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=500&fit=crop", alt: "Thanksgiving feast" },
    { month: 11, url: "https://images.unsplash.com/photo-1543589077-47d81606c1c8?w=800&h=500&fit=crop", alt: "Christmas decorations" },
  ];

  const defaultImage = {
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop",
    alt: "Mountain landscape"
  };

  const image = seasonalImages.find(img => img.month === currentMonth.getMonth()) || defaultImage;

  return (
    <div className="relative w-full -mb-6 md:-mb-10 drop-shadow-md z-10">
      {/* Main Hero Photo (Foreground Layer) with full chevron cut */}
      <div 
        className="relative h-64 md:h-[22rem] w-full rounded-t-2xl overflow-hidden"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)' }}
      >
        <img
          src={image.url}
          alt={image.alt}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10" />
      </div>
    </div>
  );
}