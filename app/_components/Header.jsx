"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../components/@/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../(auth)/services/get-me";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { data: me, isPending } = useQuery({
    queryKey: ["userMe"],
    queryFn: getMe,
    retry: false,
  });

  const handleLogout = async () => {
    localStorage.removeItem("token");
    router.push("/sign-in");
  };

  const isHome = pathname === "/";

  return (
    <header
      style={{
        backgroundColor: "#2F855A", // Verde Inteligente
        borderBottom: "1px solid #276749", // tom mais escuro para contraste
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // sombra mais sutil e elegante
      }}
      className="w-full"
    >
      <div className="max-w-7xl mx-auto px-6 h-[64px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logoDonaGranna.png"
            alt="Dona Grana Logo"
            width={56}
            height={56}
            className="object-contain"
          />
          <span className="text-white text-xl font-bold tracking-wide">
            Dona Grana
          </span>
        </Link>

        <div>
          {isPending ? null : me ? (
            isHome ? (
              <Link href="/dashboard">
                <Button className="bg-[#276749] text-white hover:bg-[#2F855A] transition">
                  Ir para o painel
                </Button>
              </Link>
            ) : (
              <Button
                className="bg-[#2D2D2D] text-white hover:bg-[#1F1F1F] transition"
                onClick={handleLogout}
              >
                Sair
              </Button>
            )
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/sign-up">
                <Button className="bg-orange-500 text-white hover:bg-orange-400 transition font-semibold">
                  Quero assinar
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button className="bg-[#276749] text-white hover:bg-[#2F855A] transition font-semibold">
                  Acessar conta
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
