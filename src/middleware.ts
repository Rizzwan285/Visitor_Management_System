import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isDashboardRoute = nextUrl.pathname.startsWith('/dashboard');
    const isLoginPage = nextUrl.pathname === '/login';
    const isUnauthorizedPage = nextUrl.pathname === '/unauthorized';

    // Allow public pages
    if (isLoginPage || isUnauthorizedPage) {
        // If already logged in and visiting login, redirect to dashboard
        if (isLoggedIn && isLoginPage) {
            return NextResponse.redirect(new URL('/dashboard', nextUrl));
        }
        return NextResponse.next();
    }

    // Protect dashboard routes
    if (isDashboardRoute && !isLoggedIn) {
        const loginUrl = new URL('/login', nextUrl);
        loginUrl.searchParams.set('callbackUrl', nextUrl.pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
});

export const config = {
    matcher: ['/dashboard/:path*', '/login', '/unauthorized'],
};
