import React, { useState } from 'react';

const VerifyEmail = () => {
    const { user } = useSession();
    const { sendEmailVerification } = useClerk();
    const [email, setEmail] = useState('');

    const handleSendVerificationEmail = async () => {
        try {
            await sendEmailVerification({ email });
            alert('Verification email sent!');
        } catch (error) {
            console.error('Error sending verification email:', error);
            alert('Failed to send verification email.');
        }
    };

    return (
        <div>
            <h1>Verify Your Email Address</h1>
            {user && !user.emailVerified ? (
                <div>
                    <p>Your email address is not verified. Please verify your email to continue.</p>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                    <button onClick={handleSendVerificationEmail}>Send Verification Email</button>
                </div>
            ) : (
                <p>Your email address is already verified.</p>
            )}
        </div>
    );
};

export default VerifyEmail;