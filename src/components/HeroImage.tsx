// src/components/HeroImage.jsx
import { format } from 'date-fns';

interface HeroImageProps {
  currentMonth: Date;
}

export default function HeroImage({ currentMonth }: HeroImageProps) {
  const seasonalImages = [
    { month: 0, url: "https://images.unsplash.com/photo-1543589077-47d81606c1c8?w=600&h=400&fit=crop", alt: "Winter snow scene" },
    { month: 1, url: "https://images.unsplash.com/photo-1513151233558-860c5392816f?w=600&h=400&fit=crop", alt: "Valentine hearts" },
    { month: 2, url: "https://images.unsplash.com/photo-1584208124886-3c99f43a3cdc?w=600&h=400&fit=crop", alt: "Spring flowers" },
    { month: 3, url: "https://images.unsplash.com/photo-1513151233558-860c5392816f?w=600&h=400&fit=crop", alt: "April showers" },
    { month: 4, url: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&h=400&fit=crop", alt: "May flowers" },
    { month: 5, url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop", alt: "Summer beach" },
    { month: 6, url: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=600&h=400&fit=crop", alt: "July fireworks" },
    { month: 7, url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop", alt: "Summer sun" },
    { month: 8, url: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=600&h=400&fit=crop", alt: "Fall harvest" },
    { month: 9, url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop", alt: "Halloween pumpkins" },
    { month: 10, url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop", alt: "Thanksgiving feast" },
    { month: 11, url: "https://images.unsplash.com/photo-1543589077-47d81606c1c8?w=600&h=400&fit=crop", alt: "Christmas decorations" },
  ];
  
  const defaultImage = {
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    alt: "Mountain landscape"
  };
  
  const image = seasonalImages.find(img => img.month === currentMonth.getMonth()) || defaultImage;
  
  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg mb-6 md:mb-0 bg-white">
      <div className="relative h-48 md:h-56 w-full">
        <img
          src={image.url}
          alt={image.alt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-3 left-3 text-white text-sm font-medium bg-black/30 px-2 py-1 rounded-md backdrop-blur-sm">
          {format(currentMonth, 'MMMM yyyy')}
        </div>
      </div>
    </div>
  );
}