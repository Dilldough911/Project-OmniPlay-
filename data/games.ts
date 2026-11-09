import type { IGame } from "../services/gameService";

export { IGame };

export const fallbackGames: IGame[] = [
  {
    id: "genshin-impact",
    title: "Genshin Impact",
    developer: "HoYoverse",
    genre: "RPG",
    rating: 4.8,
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/5c/e2/13/5ce21317-a08a-24ac-cc5f-2b25a4d71fa6/AppIcon-0-0-1x_U007epad-0-1-85-220.png/512x512bb.jpg",
    storeUrl:
      "https://play.google.com/store/apps/details?id=com.miHoYo.GenshinImpact",
    description:
      "Jelajahi dunia Teyvat yang luas penuh petualangan, teka-teki, dan karakter dengan kekuatan elemen unik dalam game open-world RPG visual anime spektakuler.",
    platform: "Mobile / PC",
    releaseDate: "2020-09-28",
  },
  {
    id: "honkai-star-rail",
    title: "Honkai: Star Rail",
    developer: "HoYoverse",
    genre: "RPG",
    rating: 4.7,
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/fd/65/dc/fd65dc18-c4b6-7b64-8266-a423f3f113e0/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg",
    storeUrl:
      "https://play.google.com/store/apps/details?id=com.HoYoverse.hkrpgoversea",
    description:
      "Naiki Astral Express dan jelajahi galaksi tanpa batas dengan sistem pertarungan turn-based taktis, grafis sinematik memukau, dan alur cerita mendalam.",
    platform: "Mobile / PC",
    releaseDate: "2023-04-26",
  },
  {
    id: "zenless-zone-zero",
    title: "Zenless Zone Zero",
    developer: "HoYoverse",
    genre: "Action",
    rating: 4.6,
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/2d/4a/fb/2d4afb82-bdb9-cc80-b5b7-d1d7f515b2ae/AppIcon-1x_U007emarketing-0-8-0-85-220-0.png/512x512bb.jpg",
    storeUrl: "https://play.google.com/store/apps/details?id=com.HoYoverse.Nap",
    description:
      "Game action RPG perkotaan futuristik di New Eridu dengan pertarungan dinamis bertempo cepat, gaya visual stylish, dan soundtrack elektronik energik.",
    platform: "Mobile / PC",
    releaseDate: "2024-07-04",
  },
  {
    id: "roblox",
    title: "Roblox",
    developer: "Roblox Corporation",
    genre: "Sandbox",
    rating: 4.5,
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/35/3e/ff/353eff73-c6d3-9aff-4ba5-a0a6e3afa563/AppIcon-0-0-1x_U007epad-0-1-0-85-220.png/512x512bb.jpg",
    storeUrl: "https://play.google.com/store/apps/details?id=com.roblox.client",
    description:
      "Alam semesta virtual pamungkas tempat kamu dapat berkreasi, berbagi pengalaman dengan teman, dan menjadi apa pun yang bisa kamu bayangkan.",
    platform: "Cross-platform",
    releaseDate: "2006-09-01",
  },
  {
    id: "minecraft",
    title: "Minecraft",
    developer: "Mojang Studios",
    genre: "Sandbox",
    rating: 4.9,
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/3b/b7/24/3bb724be-0244-933a-af48-ad2195689877/AppIcon-0-0-1x_U007emarketing-0-10-0-85-220.png/512x512bb.jpg",
    storeUrl:
      "https://play.google.com/store/apps/details?id=com.mojang.minecraftpe",
    description:
      "Bangun apa pun dari rumah sederhana hingga istana megah. Jelajahi dunia tanpa batas di mode Kreatif atau tambang sumber daya di mode Bertahan Hidup.",
    platform: "Cross-platform",
    releaseDate: "2011-11-18",
  },
  {
    id: "mobile-legends",
    title: "Mobile Legends: Bang Bang",
    developer: "MOONTON",
    genre: "MOBA",
    rating: 4.6,
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/78/e1/77/78e177f1-e174-dfe5-bbd9-f4f2988d9b89/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg",
    storeUrl: "https://play.google.com/store/apps/details?id=com.mobile.legends",
    description:
      "Bergabunglah dengan teman-temanmu dalam pertarungan MOBA 5v5 seru melawan pemain sungguhan! Pilih hero favoritmu dan hancurkan tower lawan.",
    platform: "Mobile",
    releaseDate: "2016-07-14",
  },
];

export const games = fallbackGames;
