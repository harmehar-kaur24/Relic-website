import type { Metadata } from "next";
import Footer from "@/components/Footer";
import SchedulePageBody from "./SchedulePageBody";

export const metadata: Metadata = {
  title:
    "Tour Dates & Visitor Guide | Baba Bhai Roop Chand Ji Collection Museum",
};

export default function SchedulePage() {
  return (
    <>
      <SchedulePageBody />
      <Footer />
    </>
  );
}
