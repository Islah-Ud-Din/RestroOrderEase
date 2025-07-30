import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useApi from '@/hooks/useApi';

type VerifyOtpProps = {
    visible: boolean;
    onClose: () => void;
    email: string;
    onVerified: (success: boolean) => void;
};

interface OtpVerifyResponse {
    success: boolean;
    message?: string;
}

const VerifyOtp: React.FC<VerifyOtpProps> = ({ visible, onClose, email, onVerified }) => {
    const router = useRouter();
    const { postMethod } = useApi<OtpVerifyResponse>();
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [resendLoading, setResendLoading] = useState(false);
    const [cooldown, setCooldown] = useState(0);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (cooldown > 0) {
            timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [cooldown]);

    const handleResend = async () => {
        setResendLoading(true);
        setLocalError(null);
        setSuccessMsg(null);
        try {
            await postMethod('/api/resend-otp', { email });
            setSuccessMsg('OTP resent successfully!');
            setCooldown(30);
        } catch {
            setLocalError('Failed to resend OTP. Please try again.');
        } finally {
            setResendLoading(false);
        }
    };

    const handleVerify = async () => {
        if (!otp) {
            setLocalError('Please enter the OTP');
            return;
        }
        setLoading(true);
        setLocalError(null);
        setSuccessMsg(null);
        try {
            const response = (await postMethod('/api/verify', { email, token: otp })) as OtpVerifyResponse;
            debugger

            if (response.success) {
                setSuccessMsg('OTP verified successfully!');
                onVerified(true);
            } else {
                setLocalError(response.message || 'Invalid OTP');
                onVerified(false);
            }
        } catch {
            setLocalError('Verification failed. Please try again.');
            onVerified(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className={`modal fade ${visible ? 'show d-block' : ''}`}
            tabIndex={-1}
            role="dialog"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Verify OTP</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <p>
                            Please enter the OTP sent to <strong>{email}</strong>
                        </p>
                        <p className="text-muted small">Didn’t receive the code? Check spam folder or resend below.</p>
                        <input
                            type="text"
                            className="form-control text-center mb-3"
                            placeholder="Enter 6-digit OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                            maxLength={6}
                            autoFocus
                        />
                        {localError && <div className="text-danger text-center mb-2">{localError}</div>}
                        {successMsg && <div className="text-success text-center mb-2">{successMsg}</div>}
                    </div>
                    <div className="modal-footer d-flex flex-column">
                        <button type="button" className="btn btn-primary w-100 mb-2" onClick={handleVerify} disabled={loading}>
                            {loading ? 'Verifying...' : 'Verify'}
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary w-100"
                            onClick={handleResend}
                            disabled={resendLoading || cooldown > 0}
                        >
                            {resendLoading ? 'Resending...' : cooldown > 0 ? `Resend OTP (${cooldown}s)` : 'Resend OTP'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyOtp;
