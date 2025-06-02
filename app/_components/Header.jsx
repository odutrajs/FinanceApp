"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../components/@/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../(auth)/services/get-me";
import { Menu, X } from "lucide-react";
import { useUser } from "../contexts/UserContext";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const { user: me, isLoading: isPending } = useUser();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/sign-in");
  };

  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const isHome = pathname === "/";
  const isDashboard = pathname === "/dashboard";

  return (
    <header className="w-full bg-[#2F855A] shadow-md border-b border-[#276749] z-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[64px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logoDonaGranna.png"
            alt="Dona Grana Logo"
            width={48}
            height={48}
            className="object-contain"
          />
          <span className="hidden sm:inline text-white text-lg font-bold">
            Dona Grana
          </span>
        </Link>

        {!isPending && me ? (
          <>
            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-3">
              {isHome ? (
                <Link href="/dashboard">
                  <Button className="bg-[#276749] text-white hover:bg-[#2F855A] transition">
                    Ir para o painel
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/categories">
                    <Button className="bg-[#3182CE] hover:bg-[#2B6CB0] text-white transition font-medium">
                      Nova Categoria
                    </Button>
                  </Link>
                  <Link href="/shared-account">
                    <Button className="bg-yellow-500 hover:bg-yellow-400 text-white transition font-medium">
                      Compartilhar Conta
                    </Button>
                  </Link>
                  <Button
                    onClick={handleLogout}
                    className="bg-[#1F1F1F] hover:bg-[#111] text-white transition font-medium"
                  >
                    Sair
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="sm:hidden">
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="text-white"
              >
                {menuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/sign-up">
              <Button className="bg-orange-500 hover:bg-orange-400 text-white font-semibold transition">
                Quero assinar
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button className="bg-[#276749] hover:bg-[#2F855A] text-white font-semibold transition">
                Acessar conta
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && me && (
        <div
          ref={menuRef}
          className="sm:hidden absolute top-[64px] left-0 w-full bg-white shadow-md rounded-b-xl px-4 py-3 z-40"
        >
          <ul className="space-y-2 text-sm text-[#2D2D2D]">
            {!isDashboard && (
              <Link
                href="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 rounded hover:bg-gray-100 transition"
              >
                Dashboard
              </Link>
            )}
            {!isHome && (
              <>
                <li>
                  <Link
                    href="/categories"
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2 rounded hover:bg-gray-100 transition"
                  >
                    Nova Categoria
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shared-account"
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2 rounded hover:bg-gray-100 transition"
                  >
                    Compartilhar Conta
                  </Link>
                </li>
              </>
            )}

            <li>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition text-red-600"
              >
                Sair
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
