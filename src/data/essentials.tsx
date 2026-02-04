import { 
    ShieldAlert, 
    Ambulance, 
    Flame, 
    Globe, 
    LifeBuoy, 
    CarFront,
    Siren,
    Smartphone,
    Coins
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