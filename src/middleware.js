import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Define access permissions based on roles
const rolePermissions = {
  adm: ['/', '/admin/dashboard', '/admin/users', '/admin/create-user'], // Define as needed
  stu: ['/', '/dashboard'],
  emp: ['/', '/employee/dashboard'], // Define as needed
};

// Define public routes that don't require authentication
const publicRoutes = [
  '/login',
  '/register',
  '/terms',
  '/verification',
  '/pending',
];

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn, sessionClaims } = await auth();
  const actualUrl = new URL(req.url);

  console.log(userId)

  if (userId) {
    const { role, status } = sessionClaims?.metadata;
    const username = sessionClaims?.username;
    
    if (role && rolePermissions[role.toLowerCase()] && status === 'ACT') {

      if (actualUrl.pathname === '/') {
        const dashboardRoute = rolePermissions[role.toLowerCase()].find(route => route.includes('dashboard')) || '/dashboard';
        const redirectUrl = new URL(BASE_URL + dashboardRoute);
        return NextResponse.redirect(redirectUrl.toString());
      }

      const allowedRoutes = rolePermissions[role.toLowerCase()] || [];
      let isAllowed = allowedRoutes.some(route => {
        return route === actualUrl.pathname;
      });

      if (!isAllowed)
        return NextResponse.redirect(new URL(BASE_URL + '/').toString());

      return NextResponse.next();
    }

    // For this sprint manage this way
    if (actualUrl.pathname === '/dashboard') {
      return NextResponse.next();
    }

    if (actualUrl.pathname === '/login' || actualUrl.pathname === '/register') {
      return NextResponse.redirect(new URL(BASE_URL + '/dashboard').toString());
    }

    if (actualUrl.pathname === '/pending') {
      if (!role && !username && !status) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL(BASE_URL + '/').toString());
      }
    }

    if (actualUrl.pathname.startsWith('/api/users/') && req.headers.get('referer')?.includes('/pending')) {
      return NextResponse.next();
    }
  } else {
    // Permitir el acceso a la API
    if (actualUrl.pathname.startsWith('/api')) {
      return NextResponse.next();
    }
  }

  if (publicRoutes.some(route => typeof route === 'string' ? actualUrl.pathname === route : route.test(actualUrl.pathname))) {
    return NextResponse.next();
  } else {
    return redirectToSignIn();
  }
});

// Middleware configuration
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
