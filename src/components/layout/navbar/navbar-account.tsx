import UserAvatar from "@/components/common/user/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/auth";
import { logoutAction } from "@/server/actions/auth/logout";
import { ChevronDown, CircleUserRound, LogOut } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

export const NavbarAccount = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user ?? null;
  const isAuthenticated: boolean = Boolean(user);
  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/sign-up"
          className="hidden text-sm text-zinc-300 transition hover:text-zinc-100 sm:inline-flex"
        >
          Criar conta
        </Link>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 rounded-full border border-blue-400/60 bg-blue-400/10 px-3.5 py-1.5 text-sm font-medium text-blue-400 transition hover:bg-blue-400/20"
        >
          <CircleUserRound className="h-4 w-4" />
          <span>Fazer login</span>
        </Link>
      </div>
    );
  }

  const name: string = user?.name?.trim() || "Estudante";
  const email: string = user?.email?.trim() || "";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex cursor-pointer items-center gap-1.5">
          <UserAvatar src={user?.image ?? undefined} alt={name} />
          <ChevronDown className="text-zinc-400 w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="space-y-0.5 py-2">
          <p className="text-sm text-zinc-100">{name}</p>
          {email ? (
            <p className="text-xs font-normal text-zinc-400">{email}</p>
          ) : null}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer p-0">
          <form action={logoutAction} className="w-full">
            <button
              type="submit"
              className="flex w-full cursor-pointer items-center gap-2 px-2 py-1.5 text-left text-sm"
            >
              <LogOut size={16} />
              <span>Sair</span>
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarAccount;
