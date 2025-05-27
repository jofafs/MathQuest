import React, { useState } from 'react';
import { Navbar, Container, Offcanvas } from 'react-bootstrap';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';
import '../styles/layout.css';

import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

const MainLayout: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="main-layout d-flex min-vh-100 bg-light">
      {/* Sidebar (Desktop) */}
      <aside className="sidebar-wrapper d-none d-lg-block bg-white border-end shadow-sm">
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <div className="main-content flex-grow-1 d-flex flex-column">
     

        {/* Mobile Sidebar */}
        <Offcanvas
          show={showSidebar}
          onHide={toggleSidebar}
          placement="start"
          className="d-lg-none"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="p-0">
            <Sidebar />
          </Offcanvas.Body>
        </Offcanvas>

        {/* Page Content */}
        <main className="content-wrapper flex-grow-1 p-4 bg-light">
          <div className="container-fluid">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
