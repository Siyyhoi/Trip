import { ChaiPrakanTrips } from "@/src/data/chai-prakan/chai-prakan";
import { ChiangDaoTrips } from "@/src/data/chiang-dao/chiang-dao";
import { ChomThongTrips } from "@/src/data/chom-thong/chom-thong";
import { DoiSaketTrips } from "@/src/data/doi-saket/doi-saket";
import { fangTrips } from "@/src/data/fang/fang";
import { HangDongTrip } from "@/src/data/hang-dong/hang-dong";
import { MaeAiTrips } from "@/src/data/mae-ai/mae-ai";
import { MaeOnTrip } from "@/src/data/mae-on/mae-on";
import { MaeRimTrips } from "@/src/data/mae-rim/mae-rim";
import { MaeTaengTrips } from "@/src/data/mae-taeng/mae-taeng";
import { MueangChiangMaiTrip } from "@/src/data/mueang-chiang-mai/mueang-chiang-mai";
import { SanKamphaengTrip } from "@/src/data/san-kamphaeng/san-kamphaeng";

export type LocalizedText = {
  en: string;
  zh: string;
};

export type DistrictTrip = {
  id: string;
  title: LocalizedText;
  price: LocalizedText;
  hours: LocalizedText;
  detail: LocalizedText;
  detail_more: {
    img: string;
    video: string;
  };
};

export const districtTrips: Record<string, DistrictTrip[]> = {
  "chai-prakan": ChaiPrakanTrips,
  "chiang-dao": ChiangDaoTrips,
  "chom-thong": ChomThongTrips,
  "doi-saket": DoiSaketTrips,
  fang: fangTrips,
  "hang-dong": HangDongTrip,
  "mae-ai": MaeAiTrips,
  "mae-on": MaeOnTrip,
  "mae-rim": MaeRimTrips,
  "mae-taeng": MaeTaengTrips,
  "mueang-chiang-mai": MueangChiangMaiTrip,
  "san-kamphaeng": SanKamphaengTrip,
};
