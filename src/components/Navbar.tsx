"use client"; // Necesario para interactividad

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Detecta si hay userId en localStorage para definir estado de login
    setIsLoggedIn(!!localStorage.getItem("userId"));

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    // Recargar para actualizar la UI, o redirigir si quieres
    window.location.reload();
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-white/90 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo y menú principal */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <span className="text-2xl font-bold text-indigo-600">
                  <span className="text-gray-800">Mi</span>Tienda
                </span>
              </Link>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex space-x-4">
                <button>Inicio</button>
                <button>Productos</button>
                <button>Categorías</button>
                <button>Contacto</button>
              </div>
            </div>
          </div>

          {/* Menú derecha (desktop) */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <SearchInput />

              {/* Botón Iniciar sesión / Cerrar sesión */}
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    className="bi bi-box-arrow-right mr-1"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 3a1 1 0 0 1 1-1h3.293a1 1 0 0 1 .707.293l3.707 3.707a1 1 0 0 1 0 1.414l-3.707 3.707a1 1 0 0 1-.707.293H7a1 1 0 0 1-1-1v-2h1v2h3.293l3.707-3.707-3.707-3.707H7v2H6V3z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M2 8a.5.5 0 0 1 .5-.5h6v1h-6A.5.5 0 0 1 2 8z"
                    />
                  </svg>
                  Cerrar sesión
                </button>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    className="bi bi-person"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                  </svg>
                  Iniciar sesión
                </Link>
              )}

              <Link
                href="/carrito"
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="currentColor"
                  className="bi bi-cart"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg>
                Carrito
              </Link>
            </div>
          </div>

          {/* Botón móvil */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none transition-colors"
            >
              <span className="sr-only">Abrir menú</span>
              <svg
                className={`h-6 w-6 ${isOpen ? "hidden" : "block"}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`h-6 w-6 ${isOpen ? "block" : "hidden"}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <button>Inicio</button>
          <button>Productos</button>
          <button>Categorías</button>
          <button>Contacto</button>
          <div className="mt-4 px-2">
            <SearchInput />
          </div>
          <div className="pt-4 pb-2 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              {/* Iniciar sesión / Cerrar sesión móvil */}
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="w-full flex px-4 py-2 text-base font-medium text-center text-red-600 hover:bg-red-100 rounded-md transition-colors cursor-pointer items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    className="bi bi-box-arrow-right inline-block mr-2"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 3a1 1 0 0 1 1-1h3.293a1 1 0 0 1 .707.293l3.707 3.707a1 1 0 0 1 0 1.414l-3.707 3.707a1 1 0 0 1-.707.293H7a1 1 0 0 1-1-1v-2h1v2h3.293l3.707-3.707-3.707-3.707H7v2H6V3z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M2 8a.5.5 0 0 1 .5-.5h6v1h-6A.5.5 0 0 1 2 8z"
                    />
                  </svg>
                  Cerrar sesión
                </button>
              ) : (
                <Link
                  href="/login"
                  className="w-full block px-4 py-2 text-base font-medium text-center text-indigo-600 hover:bg-indigo-100 rounded-md"
                >
                  Iniciar sesión
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Componente de ejemplo para el input de búsqueda
function SearchInput() {
  return (
    <input
      type="search"
      placeholder="Buscar..."
      className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  );
}
