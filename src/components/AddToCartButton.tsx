"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

export default function AddToCartButton({
  productId,
  disabled = false,
}: {
  productId: number;
  disabled?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const router = useRouter();
  const userId = localStorage.getItem("userId");
// const userId = document.cookie.split("; ")
//     .find((row) => row.startsWith("userId="))?.split("=")[1] || null;

  useEffect(() => {
    setIsLoggedIn(!!userId);
  }, []);

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      setShowLoginMessage(true);
      setTimeout(() => {
        router.replace("/login");
      }, 900);

      return;
    }

    setLoading(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/car/${userId}`;
      const res = await fetch(url, { cache: "no-store", method: "POST", 
        body: JSON.stringify({ id_producto: productId}), headers: { "Content-Type": "application/json" }
    });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.refresh();
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleAddToCart}
        disabled={disabled || loading}
        className={`cursor-pointer w-full py-3 px-4 rounded-md text-white font-medium transition-colors ${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <Spinner className="w-5 h-5 mr-2" />
            Añadiendo...
          </div>
        ) : (
          "Añadir al carrito"
        )}
      </button>

      {showLoginMessage && (
        <p className="text-red-600 text-sm mt-2 text-center">
          Debes iniciar sesión para agregar productos al carrito.
        </p>
      )}
    </>
  );
}
