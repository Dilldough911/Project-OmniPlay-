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
    size: "3.2 GB",
    downloads: "100Jt+",
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
    size: "3.5 GB",
    downloads: "50Jt+",
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
    size: "3.8 GB",
    downloads: "20Jt+",
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
    size: "180 MB",
    downloads: "500Jt+",
  },
  {
    id: "punishing-gray-raven",
    title: "Punishing: Gray Raven",
    developer: "Kuro Games",
    genre: "Action",
    rating: 4.7,
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/4f/07/44/4f074499-c049-e0ff-68b1-8029a874f20e/AppIcon-1x_U007emarketing-0-8-0-85-220-0.png/512x512bb.jpg",
    storeUrl:
      "https://play.google.com/store/apps/details?id=com.kurogame.gplay.punishing.grayraven.en",
    description:
      "Action-RPG bertempo cepat dengan tema pasca-apokaliptik sci-fi, kombo serangan visual spektakuler, dan tantangan pertarungan refleks tinggi.",
    platform: "Mobile",
    releaseDate: "2021-07-16",
    size: "2.9 GB",
    downloads: "10Jt+",
  },
  {
    id: "wuthering-waves",
    title: "Wuthering Waves",
    developer: "Kuro Games",
    genre: "Adventure",
    rating: 4.6,
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/07/06/3f/07063f40-1a99-bb82-4a2c-cafa1e145d1d/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg",
    storeUrl:
      "https://play.google.com/store/apps/details?id=com.kurogame.wutheringwaves.global",
    description:
      "Open-world action RPG yang kaya cerita dengan tingkat kebebasan gerak tinggi, pertarungan mekanik parry & dodge yang intens, serta eksplorasi luas.",
    platform: "Mobile / PC",
    releaseDate: "2024-05-22",
    size: "3.4 GB",
    downloads: "20Jt+",
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
    size: "650 MB",
    downloads: "50Jt+",
  },
  {
    id: "stardew-valley",
    title: "Stardew Valley",
    developer: "ConcernedApe",
    genre: "Adventure",
    rating: 4.9,
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/0e/df/12/0edf1230-3f6e-fbb3-7f72-f2aa844d100a/AppIcons-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg",
    storeUrl:
      "https://play.google.com/store/apps/details?id=com.chucklefish.stardewvalley",
    description:
      "Warisi lahan pertanian kakekmu di Stardew Valley. Belajarlah hidup dari alam, bertani, memelihara hewan, menambang, dan berteman dengan penduduk desa.",
    platform: "Mobile / PC",
    releaseDate: "2016-02-26",
    size: "350 MB",
    downloads: "5Jt+",
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
      "Bergabunglah dengan teman-temanmu dalam pertarungan MOBA 5v5 seru melawan pemain sungguhan! Pilih hero favoritmu dan bangun tim terbaik untuk menghancurkan tower lawan.",
    platform: "Mobile",
    releaseDate: "2016-07-14",
    size: "1.8 GB",
    downloads: "500Jt+",
  },
  {
    id: "pubg-mobile",
    title: "PUBG Mobile",
    developer: "Level Infinite",
    genre: "Battle Royale",
    rating: 4.5,
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/6d/98/24/6d9824dd-f75f-9bd6-221e-33324fedecb2/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg",
    storeUrl: "https://play.google.com/store/apps/details?id=com.tencent.ig",
    description:
      "Game Battle Royale orisinal di ponsel. Terjun payung ke medan tempur bersama 100 pemain lain, cari senjata terbaik, dan bertahanlah hingga menjadi yang terakhir.",
    platform: "Mobile",
    releaseDate: "2018-03-19",
    size: "2.1 GB",
    downloads: "500Jt+",
  },
  {
    id: "cod-mobile",
    title: "Call of Duty: Mobile",
    developer: "Activision",
    genre: "FPS",
    rating: 4.6,
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/bc/66/35/bc6635d9-68f4-6ab5-969f-92e034a50cfa/AppIcon-0-0-1x_U007emarketing-0-10-0-85-220.png/512x512bb.jpg",
    storeUrl:
      "https://play.google.com/store/apps/details?id=com.activision.callofduty.shooter",
    description:
      "Keseruan gameplay penembak orang pertama (FPS) legendaris Call of Duty di ponselmu dengan peta multipemain ikonik, mode ranked, dan Battle Royale seru.",
    platform: "Mobile",
    releaseDate: "2019-10-01",
    size: "2.5 GB",
    downloads: "100Jt+",
  },
  {
    id: "asphalt-9",
    title: "Asphalt 9: Legends",
    developer: "Gameloft",
    genre: "Balapan",
    rating: 4.7,
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/50/ee/8c/50ee8cac-b86d-1b2a-4b4a-ee49b85de53b/AppIcon-0-0-1x_U007epad-0-1-85-220.png/512x512bb.jpg",
    storeUrl:
      "https://play.google.com/store/apps/details?id=com.gameloft.android.ANMP.GloftA9HM",
    description:
      "Pacu supercar impianmu seperti Ferrari, Porsche, dan Lamborghini di lintasan balap paling spektakuler di dunia dengan grafis kelas konsol.",
    platform: "Mobile / PC",
    releaseDate: "2018-07-25",
    size: "2.8 GB",
    downloads: "100Jt+",
  },
  {
    id: "fc-mobile",
    title: "EA SPORTS FC Mobile",
    developer: "Electronic Arts",
    genre: "Olahraga",
    rating: 4.5,
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/41/d1/84/41d18457-ec03-6812-f0a7-8a83686c6009/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg",
    storeUrl:
      "https://play.google.com/store/apps/details?id=com.ea.gp.fifamobile",
    description:
      "Bangun Ultimate Team™ impianmu dari ribuan pesepakbola bintang dunia dan bersainglah di liga-liga sepak bola paling bergengsi.",
    platform: "Mobile",
    releaseDate: "2016-10-11",
    size: "1.9 GB",
    downloads: "100Jt+",
  },
  {
    id: "clash-of-clans",
    title: "Clash of Clans",
    developer: "Supercell",
    genre: "Strategi",
    rating: 4.8,
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ca/3a/33/ca3a3391-1dfe-a6c9-3701-97cc86f45241/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg",
    storeUrl:
      "https://play.google.com/store/apps/details?id=com.supercell.clashofclans",
    description:
      "Bangun desamu, kembangkan klan, latih pasukan perkasa, dan ikuti Perang Klan epik bersama jutaan pemain di seluruh dunia.",
    platform: "Mobile",
    releaseDate: "2012-08-02",
    size: "400 MB",
    downloads: "500Jt+",
  },
  {
    id: "candy-crush",
    title: "Candy Crush Saga",
    developer: "King",
    genre: "Puzzle",
    rating: 4.7,
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/72/83/04/728304ea-32e2-1979-e845-e5f25dd731f6/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg",
    storeUrl:
      "https://play.google.com/store/apps/details?id=com.king.candycrushsaga",
    description:
      "Game teka-teki match-3 legendaris yang manis dan menantang! Cocokkan permen dan pecahkan ribuan level manis penuh rintangan seru.",
    platform: "Mobile",
    releaseDate: "2012-11-14",
    size: "120 MB",
    downloads: "1M+",
  },
  {
    id: "the-sims-freeplay",
    title: "The Sims FreePlay",
    developer: "Electronic Arts",
    genre: "Simulasi",
    rating: 4.4,
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/74/80/02/74800225-d2dc-1911-188e-2f00364835a7/AppIcon-0-0-1x_U007epad-0-1-85-220.png/512x512bb.jpg",
    storeUrl:
      "https://play.google.com/store/apps/details?id=com.ea.games.simsfreeplay_row",
    description:
      "Ciptakan kehidupan virtual impianmu! Rancang rumah, bentuk keluarga Sims, bangun karier, dan saksikan kisah kehidupan mereka berkembang.",
    platform: "Mobile",
    releaseDate: "2011-12-15",
    size: "1.1 GB",
    downloads: "100Jt+",
  },
  {
    id: "identity-v",
    title: "Identity V",
    developer: "NetEase Games",
    genre: "Horor",
    rating: 4.5,
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/9b/f0/3b/9bf03bac-78e6-694a-abd6-1e3248958d16/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg",
    storeUrl:
      "https://play.google.com/store/apps/details?id=com.netease.idv.googleplay",
    description:
      "Game survival horor asimetris 1v4 bergaya gotik victoria. Pilih menjadi Hunter yang menakutkan atau Survivor yang berusaha melarikan diri bersama rekan tim.",
    platform: "Mobile / PC",
    releaseDate: "2018-07-05",
    size: "2.6 GB",
    downloads: "10Jt+",
  },
];

export const games = fallbackGames;
