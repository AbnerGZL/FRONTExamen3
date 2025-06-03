import { Producto } from "@/types/producto";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import Link from "next/link";

interface Params {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Params) {
  const { id } = await params;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    if (res.status === 404) notFound();
    throw new Error("Error al obtener el producto");
  }

  const producto: Producto = await res.json();

  if (!producto) notFound();

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <Link
                  href="/"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  <svg
                    className="w-3 h-3 mr-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                  Inicio
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <Link
                    href="/productos"
                    className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2"
                  >
                    Productos
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    className="w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                    {producto.name}
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Product Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              {/* Product Images */}
              <div className="md:w-1/2 p-6">
                <div className="w-full relative flex h-96 mb-4 rounded-lg overflow-hidden items-center justify-center">
                  <img
                    src={producto.image_url}
                    alt={producto.name}
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {/* Aquí podrías agregar miniaturas de otras imágenes del producto si las tuvieras */}
                  <div className="w-full border flex rounded-md p-1 cursor-pointer hover:border-blue-500 items-center">
                    <img
                      src={producto.image_url}
                      alt={`Miniatura 1 - ${producto.name}`}
                      width={80}
                      height={80}
                      className="object-cover h-20 w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="md:w-1/2 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      {producto.name}
                    </h1>
                    <div className="flex items-center mb-4">
                      {/* Rating - puedes implementar esto si tienes valoraciones */}
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`w-5 h-5 ${
                                star <= 4
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-gray-600 ml-2 text-sm">
                          (24 reseñas) {/* Esto puede ser dinámico */}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${
                        producto.stock > 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {producto.stock > 0
                        ? `Disponible (${producto.stock})`
                        : "Agotado"}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <span className="text-3xl font-bold text-gray-900">
                      ${producto.price.toLocaleString()}
                    </span>
                    {producto.price > 1000 && ( // Ejemplo de descuento
                      <span className="ml-3 text-sm text-gray-500 line-through">
                        ${(producto.price * 1.2).toLocaleString()}
                      </span>
                    )}
                  </div>
                  {producto.price > 1000 && ( // Ejemplo de ahorro
                    <div className="text-green-600 text-sm font-medium">
                      Ahorras ${(producto.price * 0.2).toLocaleString()} (20%)
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    Descripción
                  </h2>
                  <p className="text-gray-700">{producto.description}</p>
                </div>

                {/* Product Features - puedes personalizar esto según tus datos */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    Características
                  </h2>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Material premium de alta durabilidad</li>
                    <li>Garantía de 1 año</li>
                    <li>Envio gratuito a todo el país</li>
                  </ul>
                </div>

                {/* Add to Cart */}
                <div className="border-t pt-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border rounded-md">
                        <button className="px-3 py-1 text-lg font-medium text-gray-600 hover:bg-gray-100">
                          -
                        </button>
                        <span className="px-4 py-1 text-center">1</span>
                        <button className="px-3 py-1 text-lg font-medium text-gray-600 hover:bg-gray-100">
                          +
                        </button>
                      </div>
                      <span className="text-sm text-gray-500">
                        {producto.stock} disponibles
                      </span>
                    </div>

                    <AddToCartButton productId={producto.id} disabled={producto.stock <= 0} />

                    <button className="flex items-center justify-center w-full py-3 px-4 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 transition-colors">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      Añadir a favoritos
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="mt-12 bg-white rounded-xl shadow-md overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button className="mr-8 py-4 px-1 border-b-2 border-blue-500 font-medium text-sm text-blue-600">
                  Descripción
                </button>
                <button className="mr-8 py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  Especificaciones
                </button>
                <button className="mr-8 py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  Reseñas (24)
                </button>
              </nav>
            </div>
            <div className="p-6">
              <div className="prose max-w-none">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Detalles del producto
                </h3>
                <p className="text-gray-700 mb-4">
                  {producto.description}
                </p>
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
          </div>

          {/* Related Products - Puedes implementar esto si tienes productos relacionados */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Productos relacionados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Aquí podrías listar productos relacionados */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}