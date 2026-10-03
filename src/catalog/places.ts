import type { Candidate } from "./catalog";

/**
 * The maintainer's 32 collected entries (IMG_3081.PNG), plus branch records.
 * Coordinates come from GSI address search (msearch.gsi.go.jp) for the published address.
 */
export const candidates: Candidate[] = [
  // 书店
  {
    id: "one-way-street-tokyo",
    sourceName: "东京单向街书店",
    sourceGroup: "书店",
    status: "published",
    verificationNotes:
      "Identity and phone on the venue's official site. Address from a 2023 interview listing the official site and from Gurunavi (third-party); consistent. GSI geocode at building number.",
    location: {
      name: "単向街書店 東京銀座店",
      alternateNames: [
        "One Way Street Tokyo",
        "东京单向街书店",
        "单向街书店",
        "單向街書店",
      ],
      category: "bookstores",
      tags: ["chineseBooks", "multilingual", "cafe", "events"],
      address: "東京都中央区銀座1-6-1 銀座クレッセントビル1–2F",
      ward: "chuo",
      lat: 35.674992,
      lng: 139.767822,
      website: "https://one-way-street.com/ja/",
      sources: [
        {
          url: "https://one-way-street.com/zh/about/",
          label: "One Way Street Tokyo",
          primary: true,
        },
        {
          url: "https://note.com/asiaandarts/n/nfcaf95119b6c",
          label: "アジアと芸術 digital",
          primary: false,
        },
      ],
      verifiedOn: "2026-10-03",
      description: {
        ja: "中国の書店「単向空間」の海外初店舗として2023年に銀座で開業。アジアをテーマに日本語・中国語・英語・韓国語の本を扱い、2階はカフェ兼イベントスペース。",
        en: "Opened in Ginza in 2023 as the first overseas branch of China's One Way Space bookstore. Sells Asia-themed books in Japanese, Chinese, English and Korean, with a café and event space upstairs.",
        "zh-Hant":
          "中國書店「單向空間」首家海外門市，2023年於銀座開幕。販售以亞洲為主題的日、中、英、韓文書籍，二樓為咖啡與活動空間。",
      },
    },
  },
  {
    id: "outsider-bookstore",
    sourceName: "局外人書店公共圖書館（东京神保町）",
    sourceGroup: "书店",
    status: "published",
    verificationNotes:
      "Address on the venue's X profile and in the national corporate registry (room 203); a 2026 visit report confirms the 2F shop. GSI geocode resolves to block 37 only.",
    reviewNotes:
      "Hours seen only via a mirror of the venue's X posts (10:00–18:00, closed Mon); omitted until confirmed.",
    location: {
      name: "局外人書店",
      alternateNames: [
        "局外人書店公共圖書館（东京神保町）",
        "局外人书店",
        "局外人みんなの図書室",
        "Outsider Bookstore",
      ],
      category: "bookstores",
      tags: ["chineseBooks", "library", "independentPublishing", "talks"],
      address: "東京都千代田区神田神保町1-37-4 友田三和ビル203",
      ward: "chiyoda",
      lat: 35.694752,
      lng: 139.759933,
      website: "https://x.com/outsider_book",
      sources: [
        {
          url: "https://x.com/outsider_book",
          label: "局外人書店 (X)",
          primary: true,
        },
        {
          url: "https://note.com/hiroshifukumitsu/n/n942d865a5b8a",
          label: "福光寛 note",
          primary: false,
        },
      ],
      verifiedOn: "2026-10-03",
      description: {
        ja: "神保町の中国語書店・出版社。中国大陸で出版や入手が難しい人文・歴史・思想書や台湾・香港の出版物を扱い、無料で閲覧できる図書室も運営。",
        en: "Chinese-language bookstore and publisher in Jimbocho, stocking humanities, history and thought titles that are hard to publish or buy in mainland China, plus Taiwan and Hong Kong imprints, with a free reading room.",
        "zh-Hant":
          "位於神保町的中文書店兼出版社，販售在中國大陸難以出版或購得的人文、歷史、思想書籍及港台出版品，並設有免費開放的圖書室。",
      },
    },
  },
  {
    id: "yujian-shufang",
    sourceName: "遇见书房东京中文书店",
    sourceGroup: "书店",
    status: "draft",
    verificationNotes:
      "Membership Chinese library/bookshop near Waseda (visit report on note.com). Only an aggregator gives an address, and sources disagree on the town (戸塚町 vs 馬場下町); needs a venue-operated address.",
  },
  {
    id: "tokyo-xiaofei",
    sourceName: "東京小飛🎺",
    sourceGroup: "书店",
    status: "draft",
    verificationNotes: "Not reliably identified.",
  },
  {
    id: "ody-cell",
    sourceName: "ODY CELL",
    sourceGroup: "书店",
    status: "published",
    verificationNotes:
      "Official about page gives address and hours. GSI geocode resolves to block 28 only.",
    location: {
      name: "ODY CELL",
      alternateNames: [],
      category: "bookstores",
      tags: [
        "chineseBooks",
        "multilingual",
        "independentPublishing",
        "zine",
        "events",
      ],
      address: "東京都千代田区神田神保町2-28-4 2F",
      ward: "chiyoda",
      lat: 35.697849,
      lng: 139.756638,
      website: "https://odycell.space/",
      sources: [
        {
          url: "https://odycell.space/about",
          label: "ODY CELL",
          primary: true,
        },
      ],
      verifiedOn: "2026-10-03",
      hours: {
        ja: "12:00–20:00（月・火曜、祝日定休）",
        en: "12:00–20:00 (closed Mon, Tue and public holidays)",
        "zh-Hant": "12:00–20:00（週一、週二及國定假日公休）",
      },
      description: {
        ja: "神保町の日中バイリンガル独立系書店。人文・社会科学やアートの新刊、アジア各地のインディペンデント出版物やZINEを扱い、ポップアップ区画やトーク・上映会も。",
        en: "Japanese–Chinese bilingual independent bookstore in Jimbocho with new humanities, social science and art titles, independent publications and zines from across Asia, pop-up stalls, talks and screenings.",
        "zh-Hant":
          "神保町的日中雙語獨立書店，販售人文、社科與藝術新書及亞洲各地獨立出版品與ZINE，設有快閃攤位並舉辦講座與放映。",
      },
    },
  },

  // 画廊/艺术空间
  {
    id: "moon-gallery",
    sourceName: "moon gallery",
    sourceGroup: "画廊/艺术空间",
    status: "draft",
    verificationNotes: "Not yet researched.",
  },
  {
    id: "musou-gallery",
    sourceName: "無相画廊",
    sourceGroup: "画廊/艺术空间",
    status: "published",
    verificationNotes:
      "Address, hours and focus from Tokyo Art Beat (third-party). Official site renders client-side and could not be read during enrichment. GSI geocode at building number.",
    reviewNotes:
      "Hours (11:00–19:00, closed Mon) are third-party only and omitted; confirm with the venue.",
    location: {
      name: "無相画廊 MuSou Gallery",
      alternateNames: ["無相画廊", "无相画廊", "MuSou Gallery"],
      category: "galleries",
      tags: ["gallery", "contemporaryArt"],
      address: "東京都台東区蔵前3-13-13 蔵前三丁目ビル1F・B1",
      ward: "taito",
      lat: 35.704502,
      lng: 139.792221,
      website: "https://www.musougallery.com/sy",
      sources: [
        {
          url: "https://www.tokyoartbeat.com/venues/-/musou-gallery",
          label: "Tokyo Art Beat",
          primary: false,
        },
      ],
      verifiedOn: "2026-10-03",
      description: {
        ja: "蔵前のギャラリー。アジア系アーティストの作品の展示・販売に継続的に取り組む。",
        en: "Kuramae gallery dedicated to exhibiting and selling work by Asian artists.",
        "zh-Hant": "位於藏前的藝廊，持續致力於展示與銷售亞洲藝術家的作品。",
      },
    },
  },
  {
    id: "kon-space-101",
    sourceName: "东京KON Space 101",
    sourceGroup: "画廊/艺术空间",
    status: "draft",
    verificationNotes: "Not yet researched.",
  },
  {
    id: "kotansu",
    sourceName: "Kotansu art-space",
    sourceGroup: "画廊/艺术空间",
    status: "published",
    verificationNotes:
      "Official about page gives address and lists Xiaohongshu and WeChat accounts. GSI geocode at building number.",
    location: {
      name: "Kotansu Art Space",
      alternateNames: ["Kotansu art-space", "KOTANSU"],
      category: "galleries",
      tags: ["gallery", "studio", "workshop", "artClasses"],
      address: "東京都江東区東陽5-16-1 石川マンション1F",
      ward: "koto",
      lat: 35.67131,
      lng: 139.81134,
      website: "https://kotansu.com/",
      sources: [
        {
          url: "https://kotansu.com/about-us/",
          label: "Kotansu Artspace",
          primary: true,
        },
      ],
      verifiedOn: "2026-10-03",
      description: {
        ja: "木場公園そばのアートスペース。共有アトリエ、路面ギャラリー、暗室、ワークショップを備え、美大受験指導も行う。小紅書・WeChatでも発信。",
        en: "Art space near Kiba Park with shared studios, a street-level gallery, darkroom and workshops, plus art-school prep tutoring. Also posts on Xiaohongshu and WeChat.",
        "zh-Hant":
          "木場公園旁的藝術空間，設有共享工作室、臨街藝廊、暗房與工作坊，並提供美術升學指導，也在小紅書與微信發布消息。",
      },
    },
  },
  {
    id: "mana-space",
    sourceName: "マナ空間ManaSpace",
    sourceGroup: "画廊/艺术空间",
    status: "draft",
    verificationNotes: "Not yet researched.",
  },
  {
    id: "empathy-gallery",
    sourceName: "共感画廊 | Emparhy Gallery",
    sourceGroup: "画廊/艺术空间",
    status: "published",
    verificationNotes:
      "Collected spelling 'Emparhy' resolves to Empathy Gallery (エンパシー株式会社); official access page gives address. GSI geocode at building number.",
    reviewNotes:
      "Venue sources do not describe a Chinese connection; included from the source collection. Maintainer to confirm the description.",
    location: {
      name: "Empathy Gallery",
      alternateNames: [
        "共感画廊 | Emparhy Gallery",
        "Emparhy Gallery",
        "共感画廊",
        "共感畫廊",
        "エンパシーギャラリー",
      ],
      category: "galleries",
      tags: ["gallery"],
      address: "東京都渋谷区神宮前3-21-21 ARISTO原宿2F",
      ward: "shibuya",
      lat: 35.670723,
      lng: 139.707458,
      website: "https://www.empathygallery.jp/",
      sources: [
        {
          url: "https://www.empathygallery.jp/access/",
          label: "Empathy Gallery",
          primary: true,
        },
      ],
      verifiedOn: "2026-10-03",
      description: {
        ja: "原宿のギャラリー。明治神宮前駅5番出口から徒歩5分のビル2階。",
        en: "Harajuku gallery on a second floor, five minutes' walk from Meiji-jingumae Station exit 5.",
        "zh-Hant": "原宿的藝廊，位於距明治神宮前站5號出口步行5分鐘的大樓二樓。",
      },
    },
  },
  {
    id: "aura-gallery",
    sourceName: "亦安画廊",
    sourceGroup: "画廊/艺术空间",
    status: "published",
    verificationNotes:
      "Official about page gives history (Shanghai 2000, Tokyo 2014), address and appointment-only visiting. GSI geocode at building number.",
    location: {
      name: "亦安画廊 Aura Gallery",
      alternateNames: ["亦安画廊", "亦安畫廊", "Aura Gallery", "オーラギャラリー"],
      category: "galleries",
      tags: ["gallery", "contemporaryArt", "photography"],
      address: "東京都世田谷区南烏山2-31-31-111",
      ward: "setagaya",
      lat: 35.667675,
      lng: 139.608414,
      website: "https://www.aura-art.co.jp/",
      sources: [
        {
          url: "https://www.aura-art.co.jp/about",
          label: "Aura Gallery",
          primary: true,
        },
      ],
      verifiedOn: "2026-10-03",
      hours: { ja: "予約制", en: "By appointment", "zh-Hant": "預約制" },
      description: {
        ja: "2000年に上海で創業したオーラギャラリーの東京拠点（2014年開設）。現代美術や写真作品を扱う。",
        en: "Tokyo outpost (since 2014) of Aura Gallery, founded in Shanghai in 2000, handling contemporary art and photography.",
        "zh-Hant":
          "2000年創立於上海的亦安畫廊之東京據點（2014年設立），經營當代藝術與攝影作品。",
      },
    },
  },
  {
    id: "akizuki-gallery",
    sourceName: "东京艺廊-秋月",
    sourceGroup: "画廊/艺术空间",
    status: "draft",
    verificationNotes: "Not yet researched.",
  },
  {
    id: "the-shako",
    sourceName: "The Shako車庫美術館",
    sourceGroup: "画廊/艺术空间",
    status: "published",
    verificationNotes:
      "Address, opening date (2025-05-17), free entry and Chinese owner from a local news blog visit (third-party). Venue publishes only via Instagram. GSI geocode at building number.",
    reviewNotes:
      "Third-party evidence only; confirm current operation and visiting days with the venue.",
    location: {
      name: "The Shako 車庫美術館",
      alternateNames: ["The Shako車庫美術館", "車庫美術館", "车库美术馆"],
      category: "galleries",
      tags: ["gallery", "photography"],
      address: "東京都豊島区南長崎5-13-15 1F",
      ward: "toshima",
      lat: 35.727852,
      lng: 139.683365,
      website: "https://www.instagram.com/theshako.tokyo/",
      sources: [
        {
          url: "https://s-nerima.jp/wp/189712",
          label: "練馬・桜台情報局",
          primary: false,
        },
      ],
      verifiedOn: "2026-10-03",
      description: {
        ja: "東長崎の住宅街にあるガレージを改装したギャラリー（2025年開館、入館無料）。中国の写真家による展示なども開催。",
        en: "Converted-garage gallery in residential Higashi-Nagasaki (opened 2025, free entry), with shows including work by Chinese photographers.",
        "zh-Hant":
          "位於東長崎住宅區、由車庫改建的藝廊（2025年開館，免費入場），曾舉辦中國攝影師作品展等展覽。",
      },
    },
  },
  {
    id: "gallery-watashi",
    sourceName: "私画廊_Gallery Watashi",
    sourceGroup: "画廊/艺术空间",
    status: "draft",
    verificationNotes:
      "Instagram-only venue; an aggregator lists postcode 173-0021 (Itabashi) with a garbled street address. Needs a venue-confirmed address.",
  },
  {
    id: "space-bar-kawaguchi",
    sourceName: "空格工坊",
    sourceGroup: "画廊/艺术空间",
    status: "draft",
    verificationNotes:
      "Main workshop (本店) at 埼玉県川口市江戸袋1-14-11 per the official company page. Outside the 23 wards; see space-bar-kitaueno for the Tokyo branch.",
    location: {
      name: "空格工坊 川口工房",
      alternateNames: ["空格工坊", "Space Bar"],
      category: "community",
      tags: ["studio", "workshop"],
      address: "埼玉県川口市江戸袋1-14-11",
      ward: "kawaguchi",
      lat: 35.817757,
      lng: 139.757034,
      sources: [
        {
          url: "https://space-bar.jp/about-us/",
          label: "空格工坊",
          primary: true,
        },
      ],
      verifiedOn: "2026-10-03",
      description: {
        ja: "空格工坊の本店（埼玉県川口市）。掲載範囲外。",
        en: "Space Bar's main workshop in Kawaguchi, Saitama. Out of scope.",
        "zh-Hant": "空格工坊本店（埼玉縣川口市），不在收錄範圍內。",
      },
    },
  },
  {
    id: "space-bar-kitaueno",
    sourceName: "空格工坊",
    sourceGroup: "画廊/艺术空间",
    status: "published",
    verificationNotes:
      "Official company page lists 北上野美術教室 as a current branch (分店). GSI geocode at building number.",
    reviewNotes:
      "Branch is an art classroom; walk-in visiting arrangements are unconfirmed.",
    location: {
      name: "空格工坊 北上野美術教室",
      alternateNames: ["空格工坊", "Space Bar", "spacebar", "クウカクコウボウ"],
      category: "community",
      tags: ["artClasses", "studio"],
      address: "東京都台東区北上野1-8-3 三木ビル4F",
      ward: "taito",
      lat: 35.717056,
      lng: 139.781921,
      website: "https://space-bar.jp/",
      sources: [
        {
          url: "https://space-bar.jp/about-us/",
          label: "空格工坊",
          primary: true,
        },
      ],
      verifiedOn: "2026-10-03",
      description: {
        ja: "アーティストが設立した創作スタジオ「空格工坊」の台東区の分店（美術教室）。サイトは中国語・日本語・英語。本店の川口工房は掲載範囲外。",
        en: "Taitō branch art classroom of Space Bar (空格工坊), an artist-founded creative studio with a Chinese, Japanese and English site. Its main Kawaguchi workshop is outside this directory's scope.",
        "zh-Hant":
          "藝術家創立的創作工作室「空格工坊」位於台東區的分店（美術教室），官網提供中、日、英文。川口本店不在本目錄範圍內。",
      },
    },
  },
  {
    id: "somsoc-gallery",
    sourceName: "SOMSOC GALLERY",
    sourceGroup: "画廊/艺术空间",
    status: "published",
    verificationNotes:
      "Official access page gives address, hours and floor guide. GSI geocode at building number.",
    location: {
      name: "SOMSOC GALLERY",
      alternateNames: ["SOMSOC"],
      category: "galleries",
      tags: ["gallery", "fashion", "events", "cafe"],
      address: "東京都渋谷区神宮前3-22-11",
      ward: "shibuya",
      lat: 35.670341,
      lng: 139.707108,
      website: "https://somsoc.jp/",
      sources: [
        {
          url: "https://somsoc.jp/en/pages/access",
          label: "SOMSOC",
          primary: true,
        },
      ],
      verifiedOn: "2026-10-03",
      hours: {
        ja: "12:00–20:00（無休）",
        en: "12:00–20:00, open daily",
        "zh-Hant": "12:00–20:00（全年無休）",
      },
      description: {
        ja: "原宿のアート＆ファッション拠点。1階はG-Cores Kogyoなどのブランドやアートグッズのショップ、2階はギャラリー兼イベントスペースで雲南コーヒーも提供。",
        en: "Harajuku art and fashion hub: a ground-floor store with brands such as G-Cores Kogyo and artist goods, and an upstairs gallery and event space serving Yunnan coffee.",
        "zh-Hant":
          "原宿的藝術與時尚據點。一樓選物店販售G-Cores Kogyo等品牌及藝術周邊，二樓為藝廊與活動空間，並供應雲南咖啡。",
      },
    },
  },
  {
    id: "chillism",
    sourceName: "Chillism空间",
    sourceGroup: "画廊/艺术空间",
    status: "draft",
    verificationNotes: "Not yet researched.",
  },
  {
    id: "othello-gallery",
    sourceName: "Othello gallery",
    sourceGroup: "画廊/艺术空间",
    status: "draft",
    verificationNotes: "Not yet researched.",
  },

  // 饮品/工艺/杂货
  {
    id: "plant-parts",
    sourceName: "PlantParts Craftbeer",
    sourceGroup: "饮品/工艺/杂货",
    status: "draft",
    verificationNotes:
      "Beer bar at 東京都杉並区西荻南3-15-13 高梨ビル1F per Tabelog and other third-party listings. No venue-operated source found and no verified Chinese connection to describe.",
  },
  {
    id: "zhufan-xianren",
    sourceName: "煮饭鮮人在吃饭",
    sourceGroup: "饮品/工艺/杂货",
    status: "draft",
    verificationNotes: "Not yet researched.",
  },
  {
    id: "kuukuu",
    sourceName: "KUUKUU 空空",
    sourceGroup: "饮品/工艺/杂货",
    status: "published",
    verificationNotes:
      "Official shop about page gives address, hours and Chinese-tea focus. GSI geocode at building number.",
    location: {
      name: "KUUKUU 空空",
      alternateNames: ["KUUKUU", "空空"],
      category: "foodDrink",
      tags: ["cafe", "chineseTea"],
      address: "東京都品川区旗の台3-11-13 リベルテ旗の台A 101",
      ward: "shinagawa",
      lat: 35.605316,
      lng: 139.703812,
      website: "https://kuukuutokyo.theshop.jp/",
      sources: [
        {
          url: "https://kuukuutokyo.theshop.jp/about",
          label: "KUUKUU 空空",
          primary: true,
        },
      ],
      verifiedOn: "2026-10-03",
      hours: {
        ja: "水・木・金 13:00–21:00／土・日・祝 10:00–21:00",
        en: "Wed–Fri 13:00–21:00; Sat, Sun and holidays 10:00–21:00",
        "zh-Hant": "週三至週五 13:00–21:00；週六、日及國定假日 10:00–21:00",
      },
      description: {
        ja: "旗の台駅前のカフェ。香り豊かな中国茶を中心に、コーヒーやビール、手づくりのお菓子を提供。",
        en: "Café by Hatanodai Station centred on fragrant Chinese teas, also serving coffee, beer and handmade sweets.",
        "zh-Hant":
          "旗之台站旁的咖啡館，以香氣豐富的中國茶為主，也供應咖啡、啤酒與手作點心。",
      },
    },
  },
  {
    id: "kakagogo",
    sourceName: "カカゴゴ",
    sourceGroup: "饮品/工艺/杂货",
    status: "draft",
    verificationNotes: "Not yet researched.",
  },
  {
    id: "aoyama-daruma",
    sourceName: "AOYAMA DARUMA",
    sourceGroup: "饮品/工艺/杂货",
    status: "published",
    verificationNotes:
      "Official site and access page give address. GSI geocode at building number.",
    reviewNotes:
      "Official pages disagree on hours (Wed–Sat 12–18 vs Wed–Sun 12–19), so hours are omitted. Venue sources do not describe a Chinese connection; included from the source collection.",
    location: {
      name: "AOYAMA DARUMA",
      alternateNames: ["Aoyama Daruma"],
      category: "shopsCrafts",
      tags: ["crafts", "indigo", "fashion"],
      address: "東京都台東区寿4-16-5 佐野ビル1F",
      ward: "taito",
      lat: 35.709343,
      lng: 139.791504,
      website: "https://www.aoyamadaruma.com/",
      sources: [
        {
          url: "https://aoyama-daruma.myshopify.com/pages/access",
          label: "AOYAMA DARUMA",
          primary: true,
        },
      ],
      verifiedOn: "2026-10-03",
      description: {
        ja: "田原町駅近くの工房兼ショップ。藍染や柿渋染めの衣類、革小物をデザインし、ヴィンテージの半纏や布も販売。",
        en: "Studio shop near Tawaramachi Station designing indigo- and persimmon-dyed clothing and leather goods, and selling vintage Japanese hanten and textiles.",
        "zh-Hant":
          "田原町站附近的工作室兼商店，設計販售藍染與柿澀染服飾、皮件，以及古著半纏與布料。",
      },
    },
  },
  {
    id: "a-m-yanaka",
    sourceName: "a m yanaka",
    sourceGroup: "饮品/工艺/杂货",
    status: "draft",
    verificationNotes: "Not yet researched.",
  },
  {
    id: "feiyue",
    sourceName: "肥越",
    sourceGroup: "饮品/工艺/杂货",
    status: "draft",
    verificationNotes: "Not yet researched.",
  },
  {
    id: "soko-lab",
    sourceName: "SOKO LAB",
    sourceGroup: "饮品/工艺/杂货",
    status: "draft",
    verificationNotes: "Not yet researched.",
  },

  // 其他
  {
    id: "cocoon-tattoo",
    sourceName: "Cocoon tattoo",
    sourceGroup: "其他",
    status: "draft",
    verificationNotes: "Not yet researched.",
  },
  {
    id: "tagen-bunka-kaikan",
    sourceName: "多元文化会馆",
    sourceGroup: "其他",
    status: "published",
    verificationNotes:
      "Official access and facility pages give address, hours and mission. HSK test-venue listing from hskibt.jp (third-party). GSI geocode resolves to block 19 only.",
    location: {
      name: "多元文化会館",
      alternateNames: ["多元文化会馆", "多元文化會館", "Tagen Bunka Kaikan"],
      category: "community",
      tags: ["events", "gallery", "talks", "workshop"],
      address: "東京都港区赤坂6-19-46 TBKビル",
      ward: "minato",
      lat: 35.667645,
      lng: 139.734299,
      website: "https://www.tagenbunka.com/",
      sources: [
        {
          url: "https://www.tagenbunka.com/access",
          label: "多元文化会館",
          primary: true,
        },
        {
          url: "https://www.hskibt.jp/hsk-examination-room/",
          label: "HSKネット試験",
          primary: false,
        },
      ],
      verifiedOn: "2026-10-03",
      hours: {
        ja: "月〜金 10:00–19:00（イベントにより変更あり）",
        en: "Mon–Fri 10:00–19:00 (varies with events)",
        "zh-Hant": "週一至週五 10:00–19:00（依活動調整）",
      },
      description: {
        ja: "六本木近くの文化施設。アジアの文化を通じた交流を掲げ、展示、ワークショップ、茶会、上映会などを開催。HSK（中国語検定）の会場にもなっている。",
        en: "Cultural venue near Roppongi promoting exchange through Asian culture, hosting exhibitions, workshops, tea gatherings and screenings; also an HSK Chinese proficiency test venue.",
        "zh-Hant":
          "六本木附近的文化設施，以亞洲文化促進交流，舉辦展覽、工作坊、茶會與放映會，亦為HSK漢語水平考試考場。",
      },
    },
  },
  {
    id: "mogu-mogu",
    sourceName: "蘑菇蘑菇",
    sourceGroup: "其他",
    status: "draft",
    verificationNotes: "Not yet researched.",
  },
  {
    id: "zhang-lv",
    sourceName: "张绿",
    sourceGroup: "其他",
    status: "draft",
    verificationNotes: "Not reliably identified; may be a person rather than a venue.",
  },
  {
    id: "tokyo-standup",
    sourceName: "东京一场脱口秀",
    sourceGroup: "其他",
    status: "draft",
    verificationNotes:
      "Not reliably identified; appears to be an event series rather than a fixed venue.",
  },
];
