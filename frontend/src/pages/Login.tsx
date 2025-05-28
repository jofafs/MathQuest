import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import swal from 'sweetalert';
import {
  School as SchoolIcon,
  Lock as LockIcon,
  Email as EmailIcon,
  Login as LoginIcon
} from '@mui/icons-material';
import '../styles/auth.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost/MathQuest/backend/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (data.status === 'success') {
        swal("Login Successfully!", `Welcome ${data.user.firstName} (${data.user.role})!`, "success");
        localStorage.setItem('user', JSON.stringify(data.user));
        setCurrentUser(data.user);
        navigate('/dashboard');
      } else {
        swal("Login Failed!", "Check your credentials.", "error");
      }
    } catch (error) {
      swal("Login Failed!", "Server error occurred.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-icon">
            <SchoolIcon />
          </div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to continue to MathQuest</p>
        </div>

        <div className="auth-card">
          <div className="auth-card-body">
            <Form onSubmit={handleLogin}>
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

              <div className="auth-form-group">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Form.Label className="auth-form-label mb-0">Password</Form.Label>
                  <Link to="/forgot-password" className="auth-link">
                    Forgot Password?
                  </Link>
                </div>
                <div className="auth-input-group">
                  <span className="auth-input-icon">
                    <LockIcon />
                  </span>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                <LoginIcon />
                {loading ? 'Signing in...' : 'Sign In'}
              </button>

              <div className="auth-footer">
                <p className="mb-0">
                  Don't have an account?{' '}
                  <Link to="/register" className="auth-link">
                    Sign up
                  </Link>
                </p>
              </div>
            </Form>
          </div>
        </div>

        <div className="auth-terms">
          <p className="mb-0">
            By signing in, you agree to our{' '}
            <Link to="/terms" className="auth-link">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="auth-link">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
