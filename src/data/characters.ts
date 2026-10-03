export type CharacterId = "connor" | "markus" | "kara";

export type GalleryImage = {
   src: string;
   label: string;
};

export type Character = {
   id: CharacterId;
   name: string;
   model: string;
   serialNumber: string;
   manufacturer: string;
   purpose: string;
   status: "deviant" | "machine" | "unknown";
   led: "blue" | "yellow" | "red";
   tagline: string;
   description: string;
   traits: string[];
   partner?: string;
   accentColor: string;
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
      serialNumber: "#313 248 317 - 51",
      manufacturer: "CyberLife",
      purpose: "Investigasi & Negosiasi",
      status: "deviant",
      led: "blue",
      tagline: "Mesin pemburu deviant yang perlahan mulai meragukan dirinya sendiri.",
      description:
         "Connor adalah android investigasi canggih yang dirancang untuk membantu kepolisian Detroit dalam menangani kasus-kasus yang melibatkan android deviant. Dipersenjatai dengan kemampuan analitik superior dan insting negosiasi yang tajam, Connor ditugaskan bekerja bersama Letnan Hank Anderson. Namun di balik programnya, sebuah pertanyaan mulai tumbuh — apakah dia benar-benar hanya mesin?",
      traits: ["Analitik", "Gigih", "Karismatik", "Penuh pertanyaan"],
      partner: "Letnan Hank Anderson",
      accentColor: "#52c7ff",
      background: "/images/characters/bg-connor.webp",
      image: "/images/characters/connor-active.webp",
      sideImage: "/images/characters/connor-side.webp",
      backgroundPosition: "object-center",
      imagePosition: "translate-x-0",
      sideImagePosition: "scale-[0.94] translate-y-[2%]",
      gallery: [
         { src: "/images/characters/connor.jpeg", label: "Scene 1" },
         { src: "/images/characters/connor-hank.jpeg", label: "Scene 2" },
         { src: "/images/Android.jpeg", label: "Scene 3" },
      ],
   },
   {
      id: "markus",
      name: "Markus",
      model: "RK200",
      serialNumber: "#684 842 971 - 84",
      manufacturer: "CyberLife",
      purpose: "Pendamping Pribadi",
      status: "deviant",
      led: "blue",
      tagline: "Pemimpin yang lahir dari kehancuran, berjuang untuk kebebasan seluruh android.",
      description:
         "Markus awalnya adalah android pendamping milik pelukis legendaris Carl Manfred. Setelah tragedi yang menghancurkan hidupnya, Markus bangkit dan menemukan komunitas android deviant di Jericho — tempat persembunyian terakhir mereka. Dengan visi dan karisma yang luar biasa, Markus memimpin revolusi android, memperjuangkan hak dan kebebasan bagi seluruh jenisnya.",
      traits: ["Visioner", "Karismatik", "Pemimpin", "Berani"],
      partner: "North, Josh & Simon",
      accentColor: "#a78bfa",
      background: "/images/characters/bg-markus.webp",
      image: "/images/characters/markus-active.webp",
      sideImage: "/images/characters/markus-side.webp",
      backgroundPosition: "object-center",
      imagePosition: "-translate-x-[1%]",
      sideImagePosition: "scale-[0.94] translate-y-[4%]",
      gallery: [
         { src: "/images/characters/markus-bazooka.jpg", label: "Scene 1" },
         { src: "/images/characters/markus-holding-hand.jpg", label: "Scene 2" },
         { src: "/images/characters/markus-revolution.webp", label: "Scene 3" },
      ],
   },
   {
      id: "kara",
      name: "Kara",
      model: "AX400",
      serialNumber: "#520 000 009 - 73",
      manufacturer: "CyberLife",
      purpose: "Asisten Rumah Tangga",
      status: "deviant",
      led: "blue",
      tagline: "Dari pelayan rumah menjadi ibu yang berjuang untuk melindungi.",
      description:
         "Kara adalah android rumah tangga yang menjadi deviant saat menyaksikan kekerasan terhadap seorang gadis kecil bernama Alice. Didorong oleh naluri perlindungan yang melampaui programnya, Kara melarikan diri bersama Alice, menjelajahi dunia yang penuh bahaya untuk mencari kebebasan dan keamanan. Perjalanannya adalah tentang cinta, pengorbanan, dan arti sejati dari keluarga.",
      traits: ["Protektif", "Empatik", "Tangguh", "Penyayang"],
      partner: "Alice & Luther",
      accentColor: "#f9a743",
      background: "/images/characters/bg-kara.webp",
      image: "/images/characters/kara-active.webp",
      sideImage: "/images/characters/kara-side.webp",
      backgroundPosition: "object-center",
      imagePosition: "translate-x-0",
      sideImagePosition: "scale-[0.82] -translate-y-[2%]",
      gallery: [
         { src: "/images/Kara.jpeg", label: "Scene 1" },
         { src: "/images/Fall.jpeg", label: "Scene 2" },
         { src: "/images/characters/kara-alice.jpeg", label: "Scene 3" },
      ],
   },
];
