// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userId = request.cookies.get('userId')?.value;

  const protectedRoutes = ['/carrito', '/perfil'];

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtected && !userId) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
  console.log('Middleware ejecutándose en', request.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ['/carrito', '/perfil'],
};