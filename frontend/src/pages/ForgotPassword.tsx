import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  School as SchoolIcon,
  Email as EmailIcon,
  ArrowBack as ArrowBackIcon,
  Send as SendIcon
} from '@mui/icons-material';
import '../styles/auth.css';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost/MathQuest/backend/send-reset-email.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.status === 'success') {
        setMessage('Check your inbox for further instructions.');
      } else {
        setError(result.message || 'Failed to reset password. Please try again.');
      }
    } catch (err: any) {
  console.error('Reset error:', err);
  setError('An error occurred. Please try again.');
}

  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-icon">
            <SchoolIcon />
          </div>
          <h1 className="auth-title">Reset Password</h1>
          <p className="auth-subtitle">Enter your email to receive reset instructions</p>
        </div>

        <div className="auth-card">
          <div className="auth-card-body">
            {error && (
              <div className="auth-alert auth-alert-danger">
                {error}
              </div>
            )}
            {message && (
              <div className="auth-alert auth-alert-success">
                {message}
              </div>
            )}

            <Form onSubmit={handleSubmit}>
              <div className="auth-form-group">
                <Form.Label className="auth-form-label">Email Address</Form.Label>
                <div className="auth-input-group">
                  <span className="auth-input-icon">
                    <EmailIcon />
                  </span>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="auth-form-control"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="auth-btn"
                disabled={loading}
              >
                <SendIcon />
                {loading ? 'Sending Instructions...' : 'Send Reset Instructions'}
              </button>

              <div className="auth-footer">
                <Link to="/login" className="auth-link">
                  <ArrowBackIcon style={{ fontSize: 20 }} />
                  Back to Login
                </Link>
              </div>
            </Form>
          </div>
        </div>

        <div className="auth-terms">
          <p className="mb-0">
            Need help? Contact our{' '}
            <Link to="/support" className="auth-link">
              Support Team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
