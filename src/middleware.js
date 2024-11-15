import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define access permissions based on roles
const rolePermissions = {
  adm: ["/", "/admin/dashboard", "/admin/users", "/admin/create-user"], // Define as needed
  stu: ["/", "/dashboard"],
  emp: ["/", "/employees/dashboard", "/employees", "/employees/users/*"], // Define as needed'], // Define as needed
};

// Define public routes that don't require authentication
const publicRoutes = [
  '/login',
  '/register',
  '/verification',
  '/recover',
];

// actions when the user's status is ACT
function statusActiveActions(path, role) {
  if (path === '/') {
    const dashboardRoute = rolePermissions[role.toLowerCase()].find(route => route.includes('dashboard')) || '/dashboard';
    const redirectUrl = new URL(BASE_URL + dashboardRoute);
    return NextResponse.redirect(redirectUrl.toString());
  }

  const allowedRoutes = rolePermissions[role.toLowerCase()] || [];
  let isAllowed = allowedRoutes.some(route => {
    return route === path;
  });

  if (!isAllowed)
    return NextResponse.redirect(new URL(BASE_URL + '/').toString());

  return NextResponse.next();
}

function statusPendingActions(path) {
  if (path === '/pending') {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL(BASE_URL + '/pending').toString());
  }
}

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn, sessionClaims } = await auth();

  const url = new URL(req.url);

  // Check if the route is public
  if (publicRoutes.some(route => typeof route === 'string' ? url.pathname === route : route.test(url.pathname))) {
    return NextResponse.next();
  }

  // Permitir el acceso a la ruta específica de registro en la API
  if (url.pathname.startsWith('/api/users/') && req.headers.get('referer')?.includes('/register')) {
    return NextResponse.next();
  }

  // Check if the user is authenticated
  if (!userId) {
    // Avoid redirect loop if already on the sign-in page
    if (!req.url.includes("/login")) {
      return redirectToSignIn();
    }
  }

  if (userId) {
    const { role, status } = sessionClaims?.metadata;

    if (role && rolePermissions[role.toLowerCase()] && status) {
      switch (status) {
        case "ACT": {
          if (actualUrl.pathname === "/") {
            const dashboardRoute =
              rolePermissions[role.toLowerCase()].find((route) =>
                route.includes("dashboard")
              ) || "/dashboard";
            const redirectUrl = new URL(BASE_URL + dashboardRoute);
            return NextResponse.redirect(redirectUrl.toString());
          }

          const allowedRoutes = rolePermissions[role.toLowerCase()] || [];
          let isAllowed = allowedRoutes.some((route) => {
            if (route.endsWith("*")) {
              return true;
            } else {
              return route === actualUrl.pathname;
            }
          });

          if (!isAllowed)
            return NextResponse.redirect(new URL(BASE_URL + "/").toString());

          return NextResponse.next();
        }
      }
    }

    return statusPendingActions(actualUrl.pathname);
  }

  // public routes
  if (
    publicRoutes.some((route) =>
      typeof route === "string"
        ? actualUrl.pathname === route
        : route.test(actualUrl.pathname)
    )
  ) {
    return NextResponse.next();
  } else {
    return redirectToSignIn();
  }
});

// Middleware configuration
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
