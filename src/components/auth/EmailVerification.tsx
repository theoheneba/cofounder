import React from 'react';
import { Mail, Loader2 } from 'lucide-react';

interface EmailVerificationProps {
  email: string;
  resendVerification: () => Promise<void>;
}

export function EmailVerification({ email, resendVerification }: EmailVerificationProps) {
  const [isResending, setIsResending] = React.useState(false);
  const [resendSuccess, setResendSuccess] = React.useState(false);

  const handleResend = async () => {
    setIsResending(true);
    try {
      await resendVerification();
      setResendSuccess(true);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md">
      <div className="text-center mb-6">
        <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Verify your email</h2>
        <p className="text-gray-600">
          We've sent a verification link to <span className="font-medium">{email}</span>
        </p>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-gray-500 text-center">
          Please check your email and click the verification link to continue.
          The link will expire in 24 hours.
        </p>

        {resendSuccess && (
          <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm">
            Verification email resent successfully!
          </div>
        )}

        <button
          onClick={handleResend}
          disabled={isResending}
          className="w-full py-2 px-4 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isResending ? (
            <Loader2 className="w-5 h-5 animate-spin mx-auto" />
          ) : (
            'Resend verification email'
          )}
        </button>
      </div>
    </div>
  );
}