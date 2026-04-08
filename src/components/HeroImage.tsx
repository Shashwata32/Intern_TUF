import { format } from 'date-fns';

interface HeroImageProps {
  currentMonth: Date;
}

export default function HeroImage({ currentMonth }: HeroImageProps) {
  const seasonalImages = [
    { month: 0, url: "../assets/Array.png"},
    { month: 1, url: "../assets/2pointers.png"},
    { month: 2, url: "../assets/SlidingWindow.png"},
    { month: 3, url: "../assets/BinarySearch.png"},
    { month: 4, url: "../assets/Stack.png"},
    { month: 5, url: "../assets/LinkedList.png"},
    { month: 6, url: "../assets/Tree.png"},
    { month: 7, url: "../assets/Bit.png"},
    { month: 8, url: "../assets/Heap.png"},
    { month: 9, url: "../assets/Trie.png"},
    { month: 10, url: "../assets/DynammicProgramming.png" },
    { month: 11, url: "../assets/Graph.png"},
  ];


  const image = seasonalImages.find(img => img.month === currentMonth.getMonth()) || seasonalImages[0];

  return (
    <div className="relative w-full -mb-6 md:-mb-10 drop-shadow-md z-10">
      {/* Main Hero Photo (Foreground Layer) with full chevron cut */}
      <div 
        className="relative h-64 md:h-88 w-full rounded-t-2xl overflow-hidden"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)' }}
      >
        <img
          src={image.url}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/10" />
      </div>
    </div>
  );
}