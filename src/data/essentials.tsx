import { 
    ShieldAlert, 
    Ambulance, 
    Flame, 
    Globe, 
    LifeBuoy, 
    CarFront,
    Siren,
    Bed,
    Car,
    Map
  } from "lucide-react"
  
  // --- 1. Emergency Data ---
  export const emergencyContacts = [
      {
        id: 1,
        title: "Police",
        titleCn: "警察 (报警)", 
        number: "191",
        icon: <ShieldAlert size={32} />,
        color: "bg-slate-600",
        shadow: "shadow-slate-500/40",
        gradient: "from-slate-500 to-gray-700"
      },
      {
        id: 2,
        title: "Ambulance",
        titleCn: "救护车 (急救)",
        number: "1669",
        icon: <Ambulance size={32} />,
        color: "bg-rose-500",
        shadow: "shadow-rose-500/40",
        gradient: "from-rose-400 to-pink-600"
      },
      {
        id: 3,
        title: "Tourism Police",
        titleCn: "旅游警察",
        number: "1155",
        icon: <Siren size={32} />,
        color: "bg-amber-500",
        shadow: "shadow-amber-500/40",
        gradient: "from-amber-400 to-yellow-600"
      },
      {
        id: 4,
        title: "Highway Police",
        titleCn: "公路警察",
        number: "1193",
        icon: <CarFront size={32} />,
        color: "bg-orange-500",
        shadow: "shadow-orange-500/40",
        gradient: "from-orange-400 to-red-500"
      },
      {
        id: 5,
        title: "Fire Department",
        titleCn: "消防部門",
        number: "199",
        icon: <Flame size={32} />,
        color: "bg-red-600",
        shadow: "shadow-red-600/40",
        gradient: "from-red-500 to-red-800"
      },
      {
        id: 6,
        title: "TAT Contact Center",
        titleCn: "泰国旅游局",
        number: "053 248 604",
        icon: <Globe size={32} />,
        color: "bg-sky-500",
        shadow: "shadow-sky-500/40",
        gradient: "from-sky-400 to-blue-500"
      },
      {
        id: 7,
        title: "Water Emergency",
        titleCn: "水上救援",
        number: "1199",
        icon: <LifeBuoy size={32} />,
        color: "bg-cyan-500",
        shadow: "shadow-cyan-500/40",
        gradient: "from-cyan-400 to-teal-500"
      }
  ]

  export const appCategories = [
    {
      title: "Ride Hailing",
      titleCn: "网约车服务",
      icon: <Car className="text-emerald-400" />,
      apps: [
        {
          name: "Grab",
          desc: "The #1 App for taxi & food delivery.",
          descCn: "排名第一的出租车和外卖应用",
          logo: "/apps/grab.png",
          tag: "Recommended",
          tagCn: "推荐"
        },
        {
          name: "Bolt",
          desc: "Often cheaper than Grab for rides.",
          descCn: "通常比 Grab 更便宜",
          logo: "/apps/bolt.png",
        },
        {
          name: "Maxim",
          desc: "Budget friendly, popular in local areas.",
          descCn: "价格亲民，在当地很受欢迎",
          logo: "/apps/maxim.png",
        },
        {
          name: "MuvMi",
          desc: "Eco-friendly electric Tuk-Tuk sharing.",
          descCn: "环保电动嘟嘟车拼车服务",
          logo: "/apps/muvmi.png",
        }
      ]
    },
    {
      title: "Accommodation",
      titleCn: "住宿预订",
      icon: <Bed className="text-blue-400" />,
      apps: [
        {
          name: "Agoda",
          desc: "Best rates for hotels in Thailand.",
          descCn: "泰国酒店的最优价格",
          logo: "/apps/agoda.png",
          tag: "Best Rates",
          tagCn: "最优价格"
        },
        {
          name: "Booking.com",
          desc: "Wide range of hotels and hostels.",
          descCn: "各类酒店和旅舍的选择",
          logo: "/apps/booking.png",
        },
        {
          name: "Airbnb",
          desc: "Great for long stays and condos.",
          descCn: "适合长期住宿和公寓",
          logo: "/apps/airbnb.png",
        }
      ]
    },
    {
      title: "Navigation & Food",
      titleCn: "导航与美食",
      icon: <Map className="text-orange-400" />,
      apps: [
        {
          name: "Google Maps",
          nameCn: "谷歌地图", // เพิ่ม nameCn กรณีชื่อแอพเปลี่ยน
          desc: "Essential for navigation anywhere.",
          descCn: "任何地方导航必备",
          logo: "/apps/gmaps.png",
          tag: "Essential",
          tagCn: "必备"
        },
        {
          name: "Wongnai",
          desc: "Thai version of Yelp. Find best local food.",
          descCn: "泰国版的大众点评，寻找当地美食",
          logo: "/apps/wongnai.png",
        },
        {
          name: "Google Translate",
          nameCn: "谷歌翻译",
          desc: "Translate Thai text & voice easily.",
          descCn: "轻松翻译泰语文本和语音",
          logo: "/apps/translate.png", 
        }
      ]
    }
  ]