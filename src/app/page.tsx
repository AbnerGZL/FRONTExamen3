import { Producto } from "@/types/producto";
import Link from "next/link";

async function getProductos(): Promise<Producto[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/products`;
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Error al obtener productos");
  }

  return res.json();
}

export default async function ProductosPage() {
  const productos = await getProductos();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Lista de Productos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {productos.map((producto) => (
          <div 
            key={producto.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={producto.image_url}
                alt={producto.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{producto.name}</h2>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{producto.description}</p>
              
              <div className="flex justify-between items-center mb-3">
                <span className="text-lg font-bold text-blue-600">${producto.price}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${producto.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {producto.stock > 0 ? `Disponible (${producto.stock})` : 'Agotado'}
                </span>
              </div>
              
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-300">
                <Link
                  href={`/productos/${producto.id}`}
                  className="flex items-center justify-center cursor-pointer"
                  title={`Ver detalles de ${producto.name}`}>
                  Ver detalles
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}