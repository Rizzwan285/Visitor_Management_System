import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { getRoleFromEmailDomain } from '@/config/domains';
import type { UserRole } from '@prisma/client';

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const email = credentials.email as string;
                const password = credentials.password as string;

                const user = await prisma.user.findUnique({
                    where: { email },
                });

                if (!user || !user.password || !user.isActive) {
                    return null;
                }

                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                };
            },
        }),
    ],

    session: {
        strategy: 'jwt',
    },

    pages: {
        signIn: '/login',
        error: '/unauthorized',
    },

    callbacks: {
        async signIn({ user, account }) {
            // Credentials provider — already validated in authorize()
            if (account?.provider === 'credentials') {
                return true;
            }

            // Google OAuth — apply domain restriction
            if (account?.provider === 'google' && user.email) {
                const email = user.email.toLowerCase();

                // Check domain-based role
                const domainRole = getRoleFromEmailDomain(email);

                if (domainRole) {
                    // Upsert user into DB
                    const dbUser = await prisma.user.upsert({
                        where: { email },
                        update: { name: user.name ?? undefined },
                        create: {
                            email,
                            name: user.name ?? undefined,
                            role: domainRole,
                            domain: domainRole === 'STUDENT' ? 'SMAIL' : 'IITPKD',
                        },
                    });
                    user.id = dbUser.id;
                    user.role = dbUser.role;
                    return true;
                }

                // Check AllowedGenericUser table
                const genericUser = await prisma.allowedGenericUser.findUnique({
                    where: { email, isActive: true },
                });

                if (genericUser) {
                    const dbUser = await prisma.user.upsert({
                        where: { email },
                        update: { name: user.name ?? undefined },
                        create: {
                            email,
                            name: user.name ?? undefined,
                            role: genericUser.role,
                            domain: 'GENERIC',
                        },
                    });
                    user.id = dbUser.id;
                    user.role = dbUser.role;
                    return true;
                }

                // Unknown domain — deny access
                return '/unauthorized';
            }

            return false;
        },

        async jwt({ token, user }) {
            if (user) {
                token.id = user.id!;
                token.role = user.role as UserRole;
            }
            return token;
        },

        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        },
    },
});
