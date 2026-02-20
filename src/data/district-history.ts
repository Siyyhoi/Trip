export interface DistrictHistory {
    en: {
      summary: string;       // 1–2 ประโยคสั้นๆ แสดงใต้ชื่ออำเภอ
      paragraphs: string[];  // เนื้อหาหลัก แต่ละ item = 1 ย่อหน้า
    };
    zh: {
      summary: string;
      paragraphs: string[];
    };
    established?: string;    // ปีที่ก่อตั้ง (ค.ศ.) เช่น "1892"
    area_km2?: number;       // พื้นที่ ตร.กม.
    highlights?: string[];   // คำสำคัญ/จุดเด่น เช่น ["Border town", "Shan culture"]
  }
  
  export const districtHistory: Record<string, DistrictHistory> = {
    "mae-ai": {
      established: "1892",
      area_km2: 1417,
      highlights: ["Thai-Myanmar border", "Shan culture", "Doi Pha Hom Pok"],
      en: {
        summary:
          "Mae Ai is a remote northern district bordering Myanmar, celebrated for its misty mountain peaks, Shan heritage, and vibrant cross-border culture.",
        paragraphs: [
          "Situated at the northernmost tip of Chiang Mai Province, Mae Ai District shares a long boundary with Shan State, Myanmar. The district's landscape is dominated by the Daen Lao mountain range, reaching its zenith at Doi Pha Hom Pok — the second-highest peak in Thailand at 2,285 metres.",
          "Historically, the area served as a strategic trade corridor between the Lanna Kingdom and the Shan principalities. Caravans carrying tea, silk, and forest goods passed through Mae Ai for centuries, leaving behind a rich cultural tapestry of Shan, Lahu, Akha, and northern Thai communities.",
          "Today, Mae Ai is known for its cool climate, terraced orange orchards, and the scenic Kok River that winds through the valley. The temple of Wat Tha Ton, perched dramatically on a clifftop above the Mae Kok River, remains one of the district's most iconic spiritual landmarks.",
        ],
      },
      zh: {
        summary:
          "湄艾（Mae Ai）是与缅甸接壤的偏远北部县，以其云雾缭绕的山峰、掸族（Shan）文化遗产和充满活力的边境文化而闻名。",
        paragraphs: [
          "湄艾县位于清迈府的最北端，与缅甸掸邦有着漫长的边界。该县的地貌以丹老山脉（Daen Lao）为主，最高点是海拔2,285米的泰国第二高峰——帕霍姆波山（Doi Pha Hom Pok）。",
          "历史上，该地区是兰纳王国与掸邦诸侯国之间的重要战略贸易走廊。几个世纪以来，运送茶叶、丝绸和林产品的商队穿梭于湄艾，留下了掸族、拉祜族、阿卡族和泰国北部社区交融的丰富文化。",
          "如今，湄艾以其凉爽的气候、梯田橘园和蜿蜒穿过山谷的郭河（Kok River）而闻名。高耸于郭河悬崖上的塔同寺（Wat Tha Ton）依然是该县最具标志性的精神地标之一。",
        ],
      },
    },
  
    "fang": {
      established: "1884",
      area_km2: 2025,
      highlights: ["Oil fields", "Hot springs", "Lanna history"],
      en: {
        summary:
          "Fang is one of Chiang Mai's oldest districts, historically significant as a frontier town of the Lanna Kingdom and home to Thailand's first commercial oil wells.",
        paragraphs: [
          "Founded in the late 13th century by King Mengrai, Fang served as a northern fortress of the Lanna Kingdom. Its strategic position along the Kok River made it a vital administrative and military center for centuries.",
          "The district gained modern prominence in the 1920s when oil deposits were discovered, making Fang home to Thailand's oldest and only onshore oil production site — a fact that surprises many visitors to this day.",
          "Fang is also famous for its therapeutic hot springs at Doi Pha Hom Pok National Park, and its fertile valleys produce some of northern Thailand's finest lychees and strawberries.",
        ],
      },
      zh: {
        summary:
          "芳县（Fang）是清迈最古老的县之一，历史上曾是兰纳王国的边防重镇，也是泰国第一口商业油井的所在地。",
        paragraphs: [
          "芳县由孟莱王（King Mengrai）于13世纪末建立，曾是兰纳王国的北部堡垒。其位于郭河沿岸的战略位置，使其在几个世纪中一直扮演着重要的行政和军事中心角色。",
          "该县在20世纪20年代因发现石油而声名鹊起，成为泰国最古老也是唯一一个陆上石油生产基地的所在地——这一事实至今仍让许多游客感到惊讶。",
          "芳县还以朵帕霍姆波国家公园（Doi Pha Hom Pok National Park）的疗养温泉而闻名，其肥沃的山谷出产泰国北部最优质的荔枝和草莓。",
        ],
      },
    },
  
    "chiang-dao": {
      established: "1904",
      area_km2: 2187,
      highlights: ["Doi Chiang Dao", "Cave temple", "Wildlife sanctuary"],
      en: {
        summary:
          "Chiang Dao is defined by its dramatic limestone massif — Doi Chiang Dao — Thailand's third-highest peak and a sacred mountain revered by locals for over a thousand years.",
        paragraphs: [
          "The name 'Chiang Dao' translates loosely as 'City of Stars', reflecting the district's high elevation and exceptionally clear night skies. The district is dominated by the Doi Chiang Dao massif, a UNESCO Biosphere Reserve that rises to 2,195 metres.",
          "At the foot of the mountain lies Tham Chiang Dao, a cave complex of immense spiritual importance containing shrines and Buddha images that draw pilgrims from across the region.",
          "The district's cool climate supports organic farming communities producing coffee, passion fruit, and temperate vegetables that have gained recognition across Thailand.",
        ],
      },
      zh: {
        summary:
          "清道（Chiang Dao）以其壮观的石灰岩山脉——清道山（Doi Chiang Dao）而闻名，这是泰国第三高峰，也是当地人敬仰了千余年的神山。",
        paragraphs: [
          "“清道”这个名字大致意为“星之城”，反映了该县较高的海拔和异常清澈的夜空。该县以海拔2,195米的清道山脉为主导，这里也是联合国教科文组织认定的生物圈保护区。",
          "山脚下坐落着清道洞（Tham Chiang Dao），这是一个具有极高精神意义的洞穴群，内有神龛和佛像，吸引着来自整个地区的朝圣者。",
          "该县凉爽的气候孕育了有机农业社区，生产的咖啡、百香果和温带蔬菜在泰国享有盛誉。",
        ],
      },
    },
  
    "mueang": {
      established: "1296",
      area_km2: 152,
      highlights: ["Old City", "Wat Phra Singh", "Doi Suthep backdrop"],
      en: {
        summary:
          "Mueang Chiang Mai is the historical and cultural heart of the province, blending the ancient Lanna heritage of the Old City with vibrant modern urban life.",
        paragraphs: [
          "Founded in 1296 by King Mengrai as the capital of the Lanna Kingdom, the city's historical core is still surrounded by remnants of its ancient walls and a defensive moat.",
          "Within the moated city and its surroundings lie hundreds of historic Buddhist temples, including the revered Wat Phra Singh and Wat Chedi Luang, which showcase intricate Lanna architecture.",
          "Today, the district serves as a bustling hub for art, gastronomy, and digital nomads, seamlessly merging centuries-old traditions with contemporary lifestyle and commerce.",
        ],
      },
      zh: {
        summary:
          "清迈直辖县（Mueang Chiang Mai）是该府的历史和文化中心，将古城悠久的兰纳遗产与充满活力的现代都市生活完美融合。",
        paragraphs: [
          "该城由孟莱王于1296年建立，作为兰纳王国的首都，其历史核心区至今仍被古城墙遗迹和护城河所环绕。",
          "在护城河内外坐落着数百座历史悠久的佛教寺庙，包括著名的帕辛寺（Wat Phra Singh）和契迪龙寺（Wat Chedi Luang），展示了精美的兰纳建筑艺术。",
          "如今，该县已成为艺术、美食和数字游民的繁华枢纽，将数百年历史的传统与当代生活方式和商业无缝衔接。",
        ],
      },
    },
  
    "doi-saket": {
      established: "1902",
      area_km2: 671,
      highlights: ["Wat Phra That Doi Saket", "Hot springs", "Traditional villages"],
      en: {
        summary:
          "Doi Saket is a peaceful agricultural district known for its scenic countryside, traditional artisan villages, and the prominent hilltop temple of Wat Phra That Doi Saket.",
        paragraphs: [
          "Located just northeast of the city center, Doi Saket offers a serene escape into rural Lanna life, characterized by expansive rice paddies and winding local canals.",
          "The district is anchored by Wat Phra That Doi Saket, a majestic temple perched on a hill that features beautiful murals and offers panoramic views of the surrounding valleys.",
          "Visitors often explore its lush landscapes, natural hot springs, and artisanal communities like the nearby Bor Sang umbrella village area, reflecting a deep-rooted craft culture.",
        ],
      },
      zh: {
        summary:
          "堆沙革（Doi Saket）是一个宁静的农业县，以其风景秀丽的乡村、传统的手工艺村和雄伟的堆沙革山顶寺庙而闻名。",
        paragraphs: [
          "堆沙革位于市中心东北部，展现了宁静的兰纳乡村生活，以广阔的稻田和蜿蜒的地方运河为特色。",
          "该县的核心是堆沙革寺（Wat Phra That Doi Saket），这座宏伟的寺庙坐落在山顶上，拥有精美的壁画，并可俯瞰周围山谷的全景。",
          "游客经常来此探索郁郁葱葱的自然景观、天然温泉以及反映深厚手工艺文化底蕴的传统手作社区（如附近的博桑伞村）。",
        ],
      },
    },
  
    "mae-rim": {
      established: "1914",
      area_km2: 443,
      highlights: ["Mon Jam", "Botanical gardens", "Adventure tourism"],
      en: {
        summary:
          "Mae Rim is a popular gateway to nature, famous for its lush valleys, cascading waterfalls, and luxury resorts nestled among the misty hills.",
        paragraphs: [
          "Just a short drive north of Chiang Mai city, Mae Rim acts as the transition zone between the urban plains and the mountainous highlands. It is heavily forested and rich in biodiversity.",
          "The area is highly renowned for the Queen Sirikit Botanic Garden, the first botanical garden in Thailand to meet international standards, and the scenic viewpoint of Mon Jam, a favorite among locals and tourists alike.",
          "Mae Rim has developed into a premier destination for eco-tourism and adventure, offering everything from elephant sanctuaries and strawberry farms to ziplining and mountain cafes.",
        ],
      },
      zh: {
        summary:
          "湄林（Mae Rim）是通往大自然的热门门户，以其郁郁葱葱的山谷、层叠的瀑布和隐匿在云雾缭绕群山中的豪华度假村而闻名。",
        paragraphs: [
          "湄林距离清迈市区仅一小段车程，是城市平原与山区高地之间的过渡地带。这里森林茂密，生物多样性丰富。",
          "该地区以诗丽吉王后植物园（泰国首个达到国际标准的植物园）和梦境山（Mon Jam）的壮丽观景点而闻名，深受当地人和游客的喜爱。",
          "湄林已发展成为生态旅游和探险的顶级目的地，提供大象保护区、草莓园、高空滑索和高山咖啡馆等丰富多样的体验。",
        ],
      },
    },
  
    "hang-dong": {
      established: "1898",
      area_km2: 277,
      highlights: ["Ban Tawai", "Grand Canyon", "Woodcarving"],
      en: {
        summary:
          "Hang Dong is a vibrant district blending modern communities with rich artisanal heritage, particularly renowned for the Ban Tawai woodcarving village.",
        paragraphs: [
          "Situated immediately south of Chiang Mai city, Hang Dong has transformed from a quiet agricultural suburb into a thriving residential and commercial district.",
          "The district is the proud home of Ban Tawai, a village celebrated worldwide for its exquisite wood carvings, antique reproductions, and traditional northern Thai handicrafts.",
          "Beyond its artisanal charm, Hang Dong features unique natural and man-made attractions such as the Chiang Mai Grand Canyon and Ob Khan National Park, attracting both nature lovers and thrill-seekers.",
        ],
      },
      zh: {
        summary:
          "杭东（Hang Dong）是一个充满活力的县，将现代社区与丰富的手工艺遗产相融合，尤其以班塔瓦（Ban Tawai）木雕村而闻名。",
        paragraphs: [
          "杭东位于清迈市区正南方，已从一个宁静的农业郊区转型为繁荣的住宅和商业区。",
          "该县是班塔瓦村的所在地，这个村庄以其精美的木雕、仿古家具和传统的泰北手工艺品而闻名于世。",
          "除了手工艺魅力之外，杭东还拥有独特的自然和人造景观，如清迈大峡谷（Grand Canyon）和奥康国家公园（Ob Khan National Park），吸引着大批自然爱好者和探险者。",
        ],
      },
    },

    "chai-prakan": {
    established: "1988",
    area_km2: 510,
    highlights: ["Hin Pha Ngam", "Garlic and Onion", "Cultural diversity"],
    en: {
      summary:
        "Chai Prakan is a vibrant district known for its diverse ethnic communities, fertile agricultural lands, and stunning natural limestone formations.",
      paragraphs: [
        "Carved out from Fang District in 1988, Chai Prakan sits in a fertile valley surrounded by the Daen Lao mountain range.",
        "The area is highly regarded for its agricultural output, particularly garlic, onions, and high-quality rice, supported by the Mae Fang River.",
        "A major attraction is the Hin Pha Ngam park, often referred to as the 'Kunming of Thailand,' featuring dramatic limestone karst landscapes and intricate cave systems.",
      ],
    },
    zh: {
      summary:
        "猜巴干 (Chai Prakan) 是一个充满活力的县，以其多元的民族社区、肥沃的农业用地和令人惊叹的自然石灰岩地貌而闻名。",
      paragraphs: [
        "猜巴干于1988年从芳县划分出来，坐落在一个被丹老山脉环绕的肥沃山谷中。",
        "该地区以其农业产量而备受推崇，特别是大蒜、洋葱和优质大米，这得益于湄芳河（Mae Fang River）的滋养。",
        "主要景点之一是欣帕岸公园（Hin Pha Ngam），通常被称为“泰国的昆明”，拥有引人注目的石灰岩喀斯特地貌和错综复杂的洞穴系统。",
      ],
    },
  },

  "chom-thong": {
    established: "1900",
    area_km2: 712,
    highlights: ["Doi Inthanon", "Wat Phra That Si Chom Thong", "Wachirathan Waterfall"],
    en: {
      summary:
        "Chom Thong is the proud home of Doi Inthanon, Thailand's highest mountain, steeped in deep spiritual heritage and breathtaking natural beauty.",
      paragraphs: [
        "Located south of Chiang Mai city, Chom Thong's geography is dominated by the majestic Doi Inthanon National Park, earning it the title of 'The Roof of Thailand.'",
        "At the heart of the district lies Wat Phra That Si Chom Thong, a revered royal temple that houses a holy relic of the Buddha, drawing pilgrims year-round.",
        "The mountainous terrain is dotted with spectacular waterfalls like Wachirathan and Mae Ya, alongside thriving Royal Project agricultural stations cultivating cool-climate crops.",
      ],
    },
    zh: {
      summary:
        "宗通 (Chom Thong) 是泰国最高峰因他农山（Doi Inthanon）的所在地，拥有深厚的精神遗产和令人惊叹的自然美景。",
      paragraphs: [
        "宗通位于清迈市南部，其地理环境以雄伟的因他农山国家公园为主导，赢得了“泰国屋脊”的称号。",
        "该县的中心是宗通寺（Wat Phra That Si Chom Thong），这是一座备受尊崇的皇家寺庙，供奉着佛陀的圣物，常年吸引着朝圣者。",
        "多山的地形点缀着如瓦吉拉坦（Wachirathan）和梅雅（Mae Ya）等壮观的瀑布，以及种植凉爽气候农作物的皇家项目农业站。",
      ],
    },
  },

  "mae-on": {
    established: "1994",
    area_km2: 442,
    highlights: ["Mae Kampong", "Hot Springs", "Eco-tourism"],
    en: {
      summary:
        "Mae On is a tranquil mountainous district celebrated for its therapeutic hot springs and the pioneering eco-tourism village of Mae Kampong.",
      paragraphs: [
        "Originally part of San Kamphaeng, Mae On became its own district to better manage its expanding rural and eco-tourism sectors.",
        "The district is universally recognized for Mae Kampong, a picturesque village nestled in a lush valley where locals have successfully preserved their traditional way of life while welcoming sustainable tourism.",
        "Visitors also flock to the San Kamphaeng Hot Springs (geographically in Mae On) to boil eggs in the mineral-rich waters and enjoy natural spa treatments surrounded by forested hills.",
      ],
    },
    zh: {
      summary:
        "湄安 (Mae On) 是一个宁静的山区县，以其疗养温泉和具有开创性的生态旅游村湄甘榜（Mae Kampong）而闻名。",
      paragraphs: [
        "湄安最初是山甘烹（San Kamphaeng）的一部分，后来成为一个独立的县，以更好地管理其不断扩大的乡村和生态旅游部门。",
        "该县因湄甘榜而广受认可，这是一个坐落在郁郁葱葱山谷中的风景如画的村庄，当地人在欢迎可持续旅游业的同时，成功地保留了他们的传统生活方式。",
        "游客们还涌向山甘烹温泉（地理位置在湄安），在富含矿物质的水中煮鸡蛋，并在森林环绕的群山中享受天然水疗。",
      ],
    },
  },

  "san-kamphaeng": {
    established: "1902",
    area_km2: 197,
    highlights: ["Bo Sang Umbrella Village", "Silk and Cotton", "Handicraft center"],
    en: {
      summary:
        "San Kamphaeng is the cultural epicenter of Chiang Mai's traditional handicrafts, world-famous for its colorful handmade umbrellas and premium silk.",
      paragraphs: [
        "For generations, San Kamphaeng has been the beating heart of northern Thailand's artisan community, particularly along the famed 'Handicraft Highway.'",
        "The Bo Sang Umbrella Village is the district's crown jewel, where artisans meticulously craft and paint vibrant paper umbrellas using centuries-old techniques.",
        "Beyond umbrellas, the district boasts high-quality silk weaving, celadon pottery, and silverware, making it an essential destination for cultural appreciation and local craftsmanship.",
      ],
    },
    zh: {
      summary:
        "山甘烹 (San Kamphaeng) 是清迈传统手工艺的文化中心，以其色彩缤纷的手工伞和优质丝绸闻名于世。",
      paragraphs: [
        "世代以来，山甘烹一直是泰国北部工匠社区跳动的心脏，特别是沿着著名的“手工艺公路”。",
        "博桑（Bo Sang）制伞村是该县的皇冠明珠，工匠们使用几个世纪前的古老技术，精心制作和绘制充满活力的纸伞。",
        "除了雨伞，该县还拥有高品质的丝绸编织、青瓷和银器，使其成为欣赏文化和当地手工艺的必游之地。",
      ],
    },
  },

  "mae-taeng": {
    established: "1938",
    area_km2: 1362,
    highlights: ["Mae Ngat Dam", "Elephant nature parks", "River rafting"],
    en: {
      summary:
        "Mae Taeng is Chiang Mai's ultimate adventure playground, offering dense forests, ethical elephant sanctuaries, and the massive Mae Ngat Somboon Chon Dam.",
      paragraphs: [
        "Covering a vast expanse of rugged terrain north of the city, Mae Taeng is defined by its deep river valleys and verdant national parks.",
        "The district is highly popular for outdoor adventures, including white-water rafting on the Mae Taeng River and visiting ethical elephant rescue centers hidden in the jungle.",
        "The Mae Ngat Somboon Chon Dam provides not only vital irrigation for the province but also a stunning reservoir where visitors can stay on floating houseboats surrounded by serene mountains.",
      ],
    },
    zh: {
      summary:
        "湄登 (Mae Taeng) 是清迈的终极探险乐园，拥有茂密的森林、大象保护区和巨大的湄阿丹（Mae Ngat Somboon Chon）水库。",
      paragraphs: [
        "湄登覆盖了城市北部广阔的崎岖地形，以其深深的河谷和翠绿的国家公园为特色。",
        "该县的户外探险活动极受欢迎，包括在湄登河（Mae Taeng River）上进行白水漂流，以及参观隐藏在丛林中的符合道德标准的大象救援中心。",
        "湄阿丹水库不仅为该府提供了重要的灌溉水源，还是一个令人惊叹的水库，游客可以住在被宁静群山环绕的水上船屋里。",
      ],
    },
  },
  };