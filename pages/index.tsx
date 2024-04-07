import Image from "next/image";
import { Inter } from "next/font/google";
import { Assistant } from "@/components/app/assistant";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-12 ${inter.className}`}
    >
      <div className="text-center">
        <h1 className="text-3xl">Hi there, Paula here 🌟</h1>
        <p className="text-slate-600">
          Talk to Paula regarding your thoughts. Feel free to rant or share about how you feel. Paula is here to listen to you.
        </p>
      </div>
      <Assistant />
    </main>
  );
}
