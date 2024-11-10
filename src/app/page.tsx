import Image from "next/image";
import style from "./page.module.scss";
import Card from "@/components/card/Card";
import MemoCard from "@/components/card/MemoCard";
import Button from "@/components/button/Button";
import Navigation from "@/components/navigation/Navigation";
import LoginModal from "@/components/modal/LoginModal";

export default function Home() {
  return (
    <>
      <Navigation />
    </>
  );
}
