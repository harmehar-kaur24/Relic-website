import type { Metadata } from "next";
import Footer from "@/components/Footer";
import LineagePageBody from "./LineagePageBody";

export const metadata: Metadata = {
  title: "Lineage & History | Baba Bhai Roop Chand Ji Collection Museum",
};

export default function LineagePage() {
  return (
    <>
      <LineagePageBody />
      <Footer />
    </>
  );
}
