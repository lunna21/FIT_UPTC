import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

<<<<<<< Updated upstream
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
=======
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
>>>>>>> Stashed changes

// Define access permissions based on roles
const rolePermissions = {
  adm: ["/", "/admin/dashboard", "/admin/users", "/admin/create-user", "/admin/schedules", "/admin/feedback"], // Define as needed
  stu: ["/", "/student/dashboard", "/student/reserve", "/student/profile"], // Define as needed
  emp: ["/", "/employees/dashboard", "/employees", "/employees/users/*", "/employees/turns",], // Define as needed'], // Define as needed
};

// Define public routes that don't require authentication
const publicRoutes = ["/login", "/register", "/verification", "/recover"];

<<<<<<< Updated upstream
function statusActiveActions(path, role) {
  if (path === "/") {
    const dashboardRoute =
      rolePermissions[role.toLowerCase()].find((route) =>
        route.includes("dashboard")
      ) || "/dashboard";
    const redirectUrl = new URL(BASE_URL + dashboardRoute);
    return NextResponse.redirect(redirectUrl.toString());
  }

  const allowedRoutes = rolePermissions[role.toLowerCase()] || [];
  let isAllowed = allowedRoutes.some((route) => {
    return (
      route === path ||
      (route.includes("*") && path.startsWith(route.replace("*", "")))
    );
  });

  if (!isAllowed)
    return NextResponse.redirect(new URL(BASE_URL + "/").toString());

  return NextResponse.next();
}
=======
// actions when the user's status is ACT
// function statusActiveActions(path) {

// }
>>>>>>> Stashed changes

function statusPendingActions(path) {
  if (path === "/pending") {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL(BASE_URL + "/pending").toString());
<<<<<<< Updated upstream
  }
}

function statusInactiveActions(path) {
  if (path === "/inactive") {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL(BASE_URL + "/inactive").toString());
=======
>>>>>>> Stashed changes
  }
}

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn, sessionClaims } = await auth();
  const actualUrl = new URL(req.url);

<<<<<<< Updated upstream
  console.log(actualUrl.pathname);
  console.log(userId);

  // Permitir el acceso a la API -- cambiar esto para restringir por roles en el futuro
  if (actualUrl.pathname.startsWith("/api")) {
    console.log("API request");
    return NextResponse.next();
  }

  // Permitir el acceso a los archivos en la carpeta public/consents
  if (actualUrl.pathname.startsWith("/consents")) {
=======
  const actualUrl = new URL(req.url);

  console.log(actualUrl.pathname);
  console.log(userId);

  // Permitir el acceso a la API -- cambiar esto para restringir por roles en el futuro
  if (actualUrl.pathname.startsWith("/api")) {
    console.log("API request");
>>>>>>> Stashed changes
    return NextResponse.next();
  }

  if (userId) {
    const { role, status } = sessionClaims?.metadata;

    if (role && rolePermissions[role.toLowerCase()] && status) {
      switch (status) {
        case "ACT":
          return statusActiveActions(actualUrl.pathname, role);
        case "PEN":
          return statusPendingActions(actualUrl.pathname);
        case "INA":
          return statusInactiveActions(actualUrl.pathname);
      }
    }

    if (actualUrl.pathname !== "/create-password")
      return NextResponse.redirect(
        new URL(BASE_URL + "/create-password").toString()
      );

    return NextResponse.next();
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