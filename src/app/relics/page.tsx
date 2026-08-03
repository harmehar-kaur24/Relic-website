import type { Metadata } from "next";
import Footer from "@/components/Footer";
import RelicsPageBody from "./RelicsPageBody";

export const metadata: Metadata = {
  title: "Relic Archive | Baba Bhai Roop Chand Ji Collection Museum",
};

export default function RelicsPage() {
  return (
    <>
      <RelicsPageBody />
      <Footer />
    </>
  );
}
