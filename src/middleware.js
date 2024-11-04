import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Define access permissions based on roles
const rolePermissions = {
  adm: ['/', '/admin/dashboard'],
  stu: ['/', '/dashboard'],
  emp: ['/', '/employee/dashboard'], // Define as needed
};

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/terms',
  '/verification',
];

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn, sessionClaims } = await auth();
  const actualUrl = new URL(req.url);

  if (userId) {
    const { role, username, status } = sessionClaims?.metadata;

    if (role && rolePermissions[role.toLowerCase()] && status === 'ACT') {

      if (actualUrl.pathname === '/') {
        const dashboardRoute = rolePermissions[role.toLowerCase()].find(route => route.includes('dashboard'));

        const redirectUrl = new URL(BASE_URL + dashboardRoute);
        return NextResponse.redirect(redirectUrl.toString());
      }
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

    // Check if the route is allowed for the user's role
    // const allowedRoutes = rolePermissions[role] || [];
    // let isAllowed = allowedRoutes.some(route => {
    //   url.pathname = route;
    //   return url.toString() === req.url;
    // });

    // if (!isAllowed) {
    //   url.pathname = '/';
    //   return NextResponse.redirect(url.toString());
    // }
  } else {
    // Permitir el acceso a la API
    console.log(actualUrl.pathname);
    if (actualUrl.pathname.startsWith('/api')) {
      return NextResponse.next();
    }
    // Permitir el acceso a la ruta específica de registro en la API


    // // Check if the user is authenticated
    // if (!userId) {
    //   // Avoid redirect loop if already on the sign-in page
    //   if (!req.url.includes('/login')) {
    //     return redirectToSignIn();
    //   }
    // }
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
