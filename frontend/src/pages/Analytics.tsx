import React, { useState } from 'react';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  Download as DownloadIcon
} from '@mui/icons-material';
import '../styles/analytics.css';

// Mock data - replace with actual data from your backend
const classPerformanceData = [
  { name: 'Grade 4A', average: 85, completion: 92, participation: 88 },
  { name: 'Grade 4B', average: 82, completion: 90, participation: 85 },
  { name: 'Grade 5A', average: 88, completion: 95, participation: 90 },
  { name: 'Grade 5B', average: 86, completion: 93, participation: 87 },
  { name: 'Grade 6A', average: 90, completion: 96, participation: 92 },
  { name: 'Grade 6B', average: 87, completion: 94, participation: 89 },
];

const topicPerformanceData = [
  { name: 'Addition', value: 92 },
  { name: 'Subtraction', value: 88 },
  { name: 'Multiplication', value: 85 },
  { name: 'Division', value: 82 },
  { name: 'Fractions', value: 78 },
];

const progressData = [
  { month: 'Jan', score: 75 },
  { month: 'Feb', score: 78 },
  { month: 'Mar', score: 82 },
  { month: 'Apr', score: 85 },
  { month: 'May', score: 88 },
  { month: 'Jun', score: 90 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Analytics: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('all');
  const [timeRange, setTimeRange] = useState('month');

  return (
    <div className="analytics-page">
      <div className="page-header">
        <h1 className="page-title">Analytics</h1>
      </div>

      {/* Filters */}
      <Card className="filters-card">
        <Card.Body>
          <Row className="g-3">
            <Col md={4}>
              <div className="filter-group">
                <label className="filter-label">Select Class</label>
                <select
                  className="filter-select"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                >
                  <option value="all">All Classes</option>
                  <option value="4A">Grade 4A</option>
                  <option value="4B">Grade 4B</option>
                  <option value="5A">Grade 5A</option>
                  <option value="5B">Grade 5B</option>
                  <option value="6A">Grade 6A</option>
                  <option value="6B">Grade 6B</option>
                </select>
              </div>
            </Col>
            <Col md={4}>
              <div className="filter-group">
                <label className="filter-label">Time Range</label>
                <select
                  className="filter-select"
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                >
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                  <option value="quarter">Last Quarter</option>
                  <option value="year">Last Year</option>
                </select>
              </div>
            </Col>
            <Col md={4}>
              <button className="export-btn">
                <DownloadIcon />
                Export Report
              </button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Class Performance Comparison */}
      <Card className="chart-card">
        <Card.Body>
          <h2 className="chart-title">Class Performance Comparison</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={classPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="average" name="Average Score" fill="#8884d8" />
                <Bar dataKey="completion" name="Completion Rate" fill="#82ca9d" />
                <Bar dataKey="participation" name="Participation" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card.Body>
      </Card>

      <Row className="g-4">
        {/* Topic Performance */}
        <Col md={6}>
          <Card className="chart-card">
            <Card.Body>
              <h2 className="chart-title">Topic Performance</h2>
              <div className="chart-container-sm">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={topicPerformanceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {topicPerformanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Progress Over Time */}
        <Col md={6}>
          <Card className="chart-card">
            <Card.Body>
              <h2 className="chart-title">Progress Over Time</h2>
              <div className="chart-container-sm">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Analytics; 