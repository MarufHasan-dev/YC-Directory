import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="bg-white shadow-sm">
      <nav className="flex justify-between items-center max-w-335 w-full py-6 px-15 mx-auto">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            width={144}
            height={30}
            className="pointer-events-none"
          />
        </Link>
        <div className="flex items-center gap-x-7.5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="font-semibold text-xl tracking-tight leading-[100%] max-sm:hidden hover:underline">
                  Create
                </span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                  <span className="text-[#EF4444] font-semibold text-xl tracking-tight leading-[100%] cursor-pointer hover:text-black transition-all duration-150 ease-in-out max-sm:hidden hover:underline">
                    Logout
                  </span>
                  <LogOut className="size-6 sm:hidden text-red-500" />
                </button>
              </form>

              <Link href={`/user/${session?.user?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button
                className="font-semibold text-xl tracking-tight leading-[100%] cursor-pointer hover:text-[#EF4444] transition-all duration-150 ease-in-out"
                type="submit"
              >
                Login
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
