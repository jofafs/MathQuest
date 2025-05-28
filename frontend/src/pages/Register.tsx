import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {
  School as SchoolIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  HowToReg as HowToRegIcon
} from '@mui/icons-material';
import '../styles/auth.css';

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost/MathQuest/backend/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          role
        })
      });

      const data = await response.json();
      if (data.status === 'success') {
        setMessage('Registration successful! You can now login.');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Registration failed. Server error.');
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
          <h1 className="auth-title">Register</h1>
          <p className="auth-subtitle">Create your MathQuest account</p>
        </div>

        <div className="auth-card">
          <div className="auth-card-body">
            {message && (
              <div className={`auth-alert ${message.includes('successful') ? 'auth-alert-success' : 'auth-alert-danger'}`}>
                {message}
              </div>
            )}

            <Form onSubmit={handleRegister}>
              <Form.Group className="mb-4">
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="auth-form-control"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="auth-form-control"
                />
              </Form.Group>

              <Form.Group className="mb-4 auth-input-group">
                <span className="auth-input-icon">
                  <EmailIcon />
                </span>
                <Form.Control
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="auth-form-control"
                />
              </Form.Group>

              <Form.Group className="mb-4 auth-input-group">
                <span className="auth-input-icon">
                  <LockIcon />
                </span>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="auth-form-control"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="auth-form-control"
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </Form.Select>
              </Form.Group>

              <button type="submit" className="auth-btn mb-4" disabled={loading}>
                <HowToRegIcon />
                {loading ? 'Registering...' : 'Register'}
              </button>

              <div className="auth-footer text-center">
                <p className="mb-0">
                  Already have an account?{' '}
                  <Link to="/login" className="auth-link">
                    Sign in
                  </Link>
                </p>
              </div>
            </Form>
          </div>
        </div>

        <div className="auth-terms">
          <p className="mb-0">
            By signing up, you agree to our{' '}
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

export default Register;
