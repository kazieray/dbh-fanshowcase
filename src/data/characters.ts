export type CharacterId = "connor" | "markus" | "kara";

export type GalleryImage = {
   src: string;
   label: string;
};

export type Character = {
   id: CharacterId;
   name: string;
   model: string;
   background: string;
   image: string;
   sideImage: string;
   backgroundPosition: string;
   imagePosition: string;
   sideImagePosition: string;
   gallery: GalleryImage[];
};

export const characters: Character[] = [
   {
      id: "connor",
      name: "Connor",
      model: "RK800",
      background: "/images/characters/bg-connor.webp",
      image: "/images/characters/connor-active.webp",
      sideImage: "/images/characters/connor-side.webp",
      backgroundPosition: "object-center",
      imagePosition: "translate-x-0",
      sideImagePosition: "scale-[0.94] translate-y-[2%]",
      gallery: [
         { src: "/images/Connor.jpeg", label: "RK800 Portrait" },
         { src: "/images/Sanningthetruth.jpeg", label: "Crime Scene" },
         { src: "/images/Android.jpeg", label: "Android" },
      ],
   },
   {
      id: "markus",
      name: "Markus",
      model: "RK200",
      background: "/images/characters/bg-markus.webp",
      image: "/images/characters/markus-active.webp",
      sideImage: "/images/characters/markus-side.webp",
      backgroundPosition: "object-center",
      imagePosition: "-translate-x-[1%]",
      sideImagePosition: "scale-[0.94] translate-y-[4%]",
      gallery: [
         { src: "/images/characters/markus-bazooka.jpg", label: "Holding Bazooka" },
         { src: "/images/characters/markus-holding-hand.jpg", label: "Holding Hand" },
         { src: "/images/characters/markus-revolution.webp", label: "Revolution" },
      ],
   },
   {
      id: "kara",
      name: "Kara",
      model: "AX400",
      background: "/images/characters/bg-kara.webp",
      image: "/images/characters/kara-active.webp",
      sideImage: "/images/characters/kara-side.webp",
      backgroundPosition: "object-center",
      imagePosition: "translate-x-0",
      sideImagePosition: "scale-[0.82] -translate-y-[2%]",
      gallery: [
         { src: "/images/Kara.jpeg", label: "Portrait" },
         { src: "/images/Fall.jpeg", label: "The Fall" },
         { src: "/images/Kara.webp", label: "AX400" },
      ],
   },
];
