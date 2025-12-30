import Image from "next/image";
import Link from "next/link";
import TaskSlider from "@/components/TaskSlider";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-gray-800 text-[#37352f] dark:text-[#ffffffcf]">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-16 px-8 bg-white dark:bg-gray-800 sm:items-start">
        <TaskSlider />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Welcome to TaskFlow
          </h1>

          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Your personal task management solution for organizing your life.{" "}
            <Link
              href="/sign-in"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Get Started here.
            </Link>{" "}
            Or new here?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Register here.
            </Link>{" "}
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <Link
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="/sign-up"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Sign Up
          </Link>
        </div>
      </main>
    </div>
  );
}
