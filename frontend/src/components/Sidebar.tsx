import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import '../styles/sidebar.css';

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    {
      section: 'Main',
      items: [
        { path: '/dashboard', icon: <DashboardIcon />, text: 'Dashboard' },
        { path: '/students', icon: <SchoolIcon />, text: 'Students' },
        { path: '/assignments', icon: <AssignmentIcon />, text: 'Assignments' },
        { path: '/reports', icon: <BarChartIcon />, text: 'Reports' }
      ]
    },
    {
      section: 'Settings',
      items: [
        { path: '/settings', icon: <SettingsIcon />, text: 'Settings' }
      ]
    }
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <div className="sidebar-logo">MQ</div>
          <h1 className="sidebar-title">MathQuest</h1>
        </div>
        <button
          className="toggle-button"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <MenuIcon /> : <ChevronLeftIcon />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((section, index) => (
          <div key={index} className="nav-section">
            <h2 className="nav-section-title">{section.section}</h2>
            <ul className="nav-items">
              {section.items.map((item, idx) => (
                <li key={idx}>
                  <button
                    className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                    onClick={() => navigate(item.path)}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-text">{item.text}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="user-profile" onClick={logout}>
          <div className="user-avatar">{user?.name?.charAt(0).toUpperCase() || 'U'}</div>
          <div className="user-info">
            <h3 className="user-name">{user?.name || 'User'}</h3>
            <p className="user-role">{user?.role || 'Student'}</p>
          </div>
          <LogoutIcon className="nav-icon" />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
