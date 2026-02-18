import Link from 'next/link';

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
            <div className="w-full max-w-md text-center">
                {/* Icon */}
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <svg
                        className="w-10 h-10 text-red-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                        />
                    </svg>
                </div>

                {/* Content */}
                <h1 className="text-2xl font-bold text-white mb-3">Access Denied</h1>
                <p className="text-slate-400 mb-2">
                    Your email domain is not authorized to access this system.
                </p>
                <p className="text-sm text-slate-500 mb-8">
                    Only <span className="text-slate-300">@iitpkd.ac.in</span>,{' '}
                    <span className="text-slate-300">@smail.iitpkd.ac.in</span>, and pre-approved office
                    accounts can sign in.
                </p>

                {/* Actions */}
                <div className="space-y-3">
                    <Link
                        href="/login"
                        className="block w-full px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl border border-slate-700 transition-colors"
                    >
                        Try a Different Account
                    </Link>
                </div>
            </div>
        </div>
    );
}
