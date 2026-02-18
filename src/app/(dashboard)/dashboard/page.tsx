'use client';

import { useSession, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';

const roleBadgeColors: Record<string, string> = {
    EMPLOYEE: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    STUDENT: 'bg-green-500/10 text-green-400 border-green-500/20',
    OFFICE: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    SECURITY: 'bg-red-500/10 text-red-400 border-red-500/20',
    ADMIN: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
};

const roleDescriptions: Record<string, string> = {
    EMPLOYEE: 'You can create guest passes for external visitors.',
    STUDENT: 'You can request family visit passes and exit passes.',
    OFFICE: 'You can create visitor passes for office/department visitors.',
    SECURITY: 'You can scan QR codes, register walk-in visitors, and manage approvals.',
    ADMIN: 'Full system access — manage users, settings, and all passes.',
};

export default function DashboardPage() {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950">
                <div className="flex items-center gap-3 text-slate-400">
                    <div className="w-5 h-5 border-2 border-slate-600 border-t-blue-500 rounded-full animate-spin" />
                    Loading...
                </div>
            </div>
        );
    }

    if (!session) {
        redirect('/login');
    }

    const { user } = session;
    const role = user.role;
    const badgeColor = roleBadgeColors[role] || 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    const description = roleDescriptions[role] || '';

    return (
        <div className="min-h-screen bg-slate-950 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Top bar */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                        <p className="text-slate-400 text-sm">IIT Palakkad Visitor Management System</p>
                    </div>
                    <button
                        onClick={() => signOut({ callbackUrl: '/login' })}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm rounded-xl border border-slate-700 transition-colors"
                    >
                        Sign Out
                    </button>
                </div>

                {/* User Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-white">{user.name || 'User'}</h2>
                            <p className="text-slate-400 text-sm mt-1">{user.email}</p>
                        </div>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${badgeColor}`}
                        >
                            {role}
                        </span>
                    </div>
                    <p className="text-slate-500 text-sm mt-4">{description}</p>
                </div>

                {/* Session Debug Info */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <h3 className="text-sm font-medium text-slate-400 mb-3">Session Debug Info</h3>
                    <pre className="text-xs text-slate-500 bg-slate-950 rounded-xl p-4 overflow-auto">
                        {JSON.stringify(session, null, 2)}
                    </pre>
                </div>
            </div>
        </div>
    );
}
