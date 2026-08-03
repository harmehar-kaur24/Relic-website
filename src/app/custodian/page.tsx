import type { Metadata } from "next";
import Footer from "@/components/Footer";
import CustodianPageBody from "./CustodianPageBody";

export const metadata: Metadata = {
  title: "The Custodian | Baba Bhai Roop Chand Ji Collection Museum",
};

export default function CustodianPage() {
  return (
    <>
      <CustodianPageBody />
      <Footer />
    </>
  );
}
