import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Form, Button } from 'react-bootstrap';
import {
  FilterList as FilterListIcon,
  Search as SearchIcon,
  Download as DownloadIcon
} from '@mui/icons-material';
import '../styles/activity-logs.css';

const ActivityLogs: React.FC = () => {
  const [filters, setFilters] = useState({
    activityType: 'all',
    dateRange: '7days',
    student: 'all'
  });

  // Mock data - replace with actual API call
  const activities = [
    {
      id: 1,
      student: 'John Doe',
      activity: 'Completed Addition Quiz',
      type: 'Quiz',
      score: 95,
      date: '2024-03-15 14:30',
      duration: '15m'
    },
    {
      id: 2,
      student: 'Jane Smith',
      activity: 'Math Adventure Game',
      type: 'Game',
      score: 88,
      date: '2024-03-15 13:45',
      duration: '25m'
    },
    {
      id: 3,
      student: 'Mike Johnson',
      activity: 'Multiplication Practice',
      type: 'Practice',
      score: 92,
      date: '2024-03-15 12:15',
      duration: '20m'
    },
    {
      id: 4,
      student: 'Sarah Wilson',
      activity: 'Division Challenge',
      type: 'Challenge',
      score: 85,
      date: '2024-03-15 11:30',
      duration: '30m'
    }
  ];

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="activity-logs-page">
      <Container fluid>
        <div className="page-header">
          <h1 className="page-title">Activity Logs</h1>
          <button className="export-btn">
            <DownloadIcon />
            Export
          </button>
        </div>

        {/* Filters */}
        <Card className="filters-card">
          <Card.Body>
            <Row className="g-3">
              <Col md={3}>
                <div className="filter-group">
                  <label className="filter-label">Activity Type</label>
                  <select
                    className="filter-select"
                    name="activityType"
                    value={filters.activityType}
                    onChange={handleFilterChange}
                  >
                    <option value="all">All Activities</option>
                    <option value="quiz">Quizzes</option>
                    <option value="game">Games</option>
                    <option value="practice">Practice</option>
                    <option value="challenge">Challenges</option>
                  </select>
                </div>
              </Col>
              <Col md={3}>
                <div className="filter-group">
                  <label className="filter-label">Date Range</label>
                  <select
                    className="filter-select"
                    name="dateRange"
                    value={filters.dateRange}
                    onChange={handleFilterChange}
                  >
                    <option value="7days">Last 7 Days</option>
                    <option value="30days">Last 30 Days</option>
                    <option value="90days">Last 90 Days</option>
                    <option value="custom">Custom Range</option>
                  </select>
                </div>
              </Col>
              <Col md={3}>
                <div className="filter-group">
                  <label className="filter-label">Student</label>
                  <select
                    className="filter-select"
                    name="student"
                    value={filters.student}
                    onChange={handleFilterChange}
                  >
                    <option value="all">All Students</option>
                    <option value="john">John Doe</option>
                    <option value="jane">Jane Smith</option>
                    <option value="mike">Mike Johnson</option>
                  </select>
                </div>
              </Col>
              <Col md={3}>
                <div className="filter-group">
                  <label className="filter-label">Search</label>
                  <div className="search-group">
                    <SearchIcon className="search-icon" />
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search activities..."
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Activity Table */}
        <Card className="activity-table-card">
          <Card.Body>
            <Table className="activity-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Activity</th>
                  <th>Type</th>
                  <th>Score</th>
                  <th>Date</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity.id}>
                    <td>
                      <div className="student-name">{activity.student}</div>
                    </td>
                    <td>{activity.activity}</td>
                    <td>
                      <span className={`activity-badge ${activity.type.toLowerCase()}`}>
                        {activity.type}
                      </span>
                    </td>
                    <td>{activity.score}%</td>
                    <td>{activity.date}</td>
                    <td>{activity.duration}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default ActivityLogs; 