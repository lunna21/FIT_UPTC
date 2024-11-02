import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define access permissions based on roles
const rolePermissions = {
  admin: ['/', '/admin/dashboard'],
  student: ['/', '/dashboard'],
  employee: ['/', '/employee/dashboard'], // Define as needed
};

// Define public routes that don't require authentication
const publicRoutes = ['/', '/login', '/register', '/terms'];

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn, sessionClaims } = await auth();

  const url = new URL(req.url);

  // Check if the route is public
  if (publicRoutes.includes(url.pathname)) {
    return NextResponse.next();
  }

  if (url.pathname.startsWith('/api/users/') && req.headers.get('referer')?.includes('/register')) {
    return NextResponse.next();
  }

  // Check if the user is authenticated
  if (!userId) {
    // Avoid redirect loop if already on the sign-in page
    if (!req.url.includes('/login')) {
      return redirectToSignIn();
    }
  }

  if (userId) {
    const role = sessionClaims?.metadata?.role;

    // Redirect to the corresponding dashboard if the user enters the '/' route
    url.pathname = '/';
    if (req.url === url.toString()) {
      const dashboardRoute = rolePermissions[role]?.find(route => route.includes('dashboard'));
      if (dashboardRoute) {
        url.pathname = dashboardRoute;
        return NextResponse.redirect(url.toString());
      }
    }

    // Check if the route is allowed for the user's role
    const allowedRoutes = rolePermissions[role] || [];
    let isAllowed;
    allowedRoutes.forEach(route => {
      url.pathname = route;

      isAllowed = url.toString() === req.url ? true : false;

      if (isAllowed) return;
    });

    if (!isAllowed) {
      url.pathname = '/';
      return NextResponse.redirect(url.toString());
    }
  }

  // If the user is authenticated and the route is allowed, proceed
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
