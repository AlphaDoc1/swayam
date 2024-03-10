import ParallaxScroll from "@/components/ParallaxScroll";

export default function Home() {
  return (
    <main>
      <div className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="font-mirtha text-[190px] tracking-wide bg-gradient-purple text-transparent bg-clip-text select-none hover:tracking-wider transition-all duration-500 swayam-text">
          YOUR STAGE AWAITS!
        </h1>
      </div>

      <ParallaxScroll />
    </main>
  );
}
