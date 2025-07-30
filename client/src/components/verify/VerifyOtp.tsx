import React, { useState } from 'react';
import { Modal, Input, Button, message } from 'antd';
import { useRouter } from 'next/navigation';
import useApi from '@/hooks/useApi';
import { ReloadOutlined } from '@ant-design/icons';

type VerifyOtpProps = {
    visible: boolean;
    onClose: () => void;
    email: string;
};

// Define the expected response type
interface OtpVerifyResponse {
    success: boolean;
    message?: string;
}

const VerifyOtp: React.FC<VerifyOtpProps> = ({ visible, onClose, email }) => {
    const router = useRouter();
    const { postMethod, data, error } = useApi<OtpVerifyResponse>();
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [resendLoading, setResendLoading] = useState(false);
    const [cooldown, setCooldown] = useState(0);

    // Cooldown timer for resend
    React.useEffect(() => {
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
            // You may need to adjust the endpoint
            await postMethod('/api/resend-otp', { email });
            setSuccessMsg('OTP resent successfully!');
            setCooldown(30); // 30 seconds cooldown
        } catch (err) {
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
            await postMethod('/api/verify', { email, token: otp });
            const response = data as OtpVerifyResponse;
            if (response && response.success) {
                setSuccessMsg('OTP verified successfully!');
                message.success('OTP verified successfully!');
                setTimeout(() => {
                    onClose();
                    router.push('/pages/login');
                }, 1000); // slight delay for UX
            } else {
                setLocalError(response?.message || 'Invalid OTP');
            }
        } catch (err) {
            setLocalError('Verification failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Verify OTP"
            open={visible}
            onCancel={onClose}
            footer={null}
            centered
            aria-modal="true"
            aria-labelledby="otp-modal-title"
        >
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <p id="otp-modal-title" style={{ fontWeight: 500, fontSize: 18 }}>
                    Please enter the OTP sent to <strong>{email}</strong>
                </p>
                <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>
                    Didn’t receive the code? Check your spam folder or resend below.
                </p>
            </div>
            <Input
                aria-label="OTP input"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                maxLength={6}
                style={{ textAlign: 'center', fontSize: 20, letterSpacing: 8, marginBottom: 16 }}
                autoFocus
            />
            {localError && (
                <div style={{ color: 'red', marginBottom: 8, textAlign: 'center' }}>{localError}</div>
            )}
            {successMsg && (
                <div style={{ color: 'green', marginBottom: 8, textAlign: 'center' }}>{successMsg}</div>
            )}
            <Button
                type="primary"
                block
                loading={loading}
                onClick={handleVerify}
                style={{ marginBottom: 16, fontWeight: 600, fontSize: 16 }}
                aria-label="Verify OTP"
            >
                Verify
            </Button>
            <Button
                icon={<ReloadOutlined />}
                block
                onClick={handleResend}
                loading={resendLoading}
                disabled={cooldown > 0}
                style={{ fontWeight: 500 }}
                aria-label="Resend OTP"
            >
                {cooldown > 0 ? `Resend OTP (${cooldown}s)` : 'Resend OTP'}
            </Button>
        </Modal>
    );
};

export default VerifyOtp;
