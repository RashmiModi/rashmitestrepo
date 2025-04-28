
import type { NextRequest } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isAdminRoute = createRouteMatcher(['/productcategory', '/admin'])
const userRoutes = createRouteMatcher(['/shop'])




export default clerkMiddleware(async (auth, req) => {
  // Protect all routes starting with `/admin`
  if (isAdminRoute(req) && (await auth()).sessionClaims?.metadata?.role !== 'marketing_admin1') {
   
    const url = new URL('/', req.url)
    return NextResponse.redirect(url)
  }

  
      
  
/*
  const { pathname } = req.nextUrl;
  
  // Assuming you have a function to verify the user's role
  const userRole = getUserRole(req);

  // Define routes that require admin access
  const adminRoutes = ['/productcategory', '/admin'];
  // Define routes that require user access
  const userRoutes = ['/user'];


  // Redirect if user does not have admin access
  if (userRole !== 'marketing_admin1' && adminRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Redirect if user does not have user access
  

  return NextResponse.next();

})







// Mock function to get user role from the request
function getUserRole(request: NextRequest): string | null {
  // Implement your logic to retrieve user role from cookies, JWT, etc.
  return null; // Placeholder return
}
*/
})
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
