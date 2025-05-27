import React, { useState, ChangeEvent } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  Save as SaveIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  School as SchoolIcon
} from '@mui/icons-material';
import '../styles/settings.css';

type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const Settings: React.FC = () => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: currentUser?.displayName || '',
    email: currentUser?.email || '',
    role: currentUser?.role || 'teacher'
  });

  const handleChange = (e: ChangeEvent<FormControlElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement settings update logic
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="settings-card">
            <form onSubmit={handleSubmit}>
              <div className="settings-section">
                <h2 className="settings-section-title">Profile Information</h2>
                
                <div className="settings-form-group">
                  <label className="settings-label">
                    <PersonIcon className="me-2" />
                    Display Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your display name"
                    className="settings-input"
                  />
                </div>

                <div className="settings-form-group">
                  <label className="settings-label">
                    <EmailIcon className="me-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="settings-input"
                    disabled
                  />
                  <p className="settings-help-text">
                    Email address cannot be changed
                  </p>
                </div>

                <div className="settings-form-group">
                  <label className="settings-label">
                    <SchoolIcon className="me-2" />
                    Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="settings-input"
                    disabled
                  >
                    <option value="student">Student</option>
                    <option value="admin">Administrator</option>
                  </select>
                  <p className="settings-help-text">
                    Role cannot be changed
                  </p>
                </div>
              </div>

              <button type="submit" className="settings-button">
                <SaveIcon />
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 