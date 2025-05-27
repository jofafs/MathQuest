import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';

import {
  PeopleAlt as PeopleIcon,
  Assignment as AssignmentIcon,
  EventAvailable as AttendanceIcon,
  TrendingUp as TrendingUpIcon,
  Star as StarIcon,
} from '@mui/icons-material';

const Dashboard: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setFullName(`${user.first_name} ${user.last_name}`);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Welcome back{fullName ? `, ${fullName}` : ''}!</h1>
        <p className="page-subtitle">Here's what's happening in your classroom today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-3">
        <div className="card kpi-card">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h6 className="text-muted">Total Students</h6>
              <div className="kpi-value">120</div>
            </div>
            <PeopleIcon className="text-primary" fontSize="large" />
          </div>
        </div>
        <div className="card kpi-card">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h6 className="text-muted">Assignments Due</h6>
              <div className="kpi-value">5</div>
            </div>
            <AssignmentIcon className="text-warning" fontSize="large" />
          </div>
        </div>
        <div className="card kpi-card">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h6 className="text-muted">Weekly Attendance</h6>
              <div className="kpi-value">96%</div>
            </div>
            <AttendanceIcon className="text-success" fontSize="large" />
          </div>
        </div>
      </div>

      {/* Charts + Top Performers */}
      <div className="grid grid-2 mt-4">
        <div className="card chart-container">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="card-title">Class Performance</h5>
            <TrendingUpIcon />
          </div>
          <div className="card-body">
            <p>📊 Chart Placeholder (e.g., Line or Bar)</p>
          </div>
        </div>

        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="card-title">Top Performers</h5>
            <StarIcon />
          </div>
          <div className="card-body">
            <ul className="list-unstyled">
              <li className="mb-2">
                <span className="fw-semibold">Anna R.</span> – <span className="badge badge-success">98%</span>
              </li>
              <li className="mb-2">
                <span className="fw-semibold">John D.</span> – <span className="badge badge-success">95%</span>
              </li>
              <li>
                <span className="fw-semibold">Grace K.</span> – <span className="badge badge-success">94%</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
