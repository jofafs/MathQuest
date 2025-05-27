import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Form, 
  Table
} from 'react-bootstrap';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import '../styles/class-analytics.css';

// Mock data - replace with actual data from your backend
const classData = {
  overallStats: {
    totalStudents: 30,
    averageScore: 82,
    completionRate: 85,
    activeStudents: 25
  },
  topicPerformance: [
    { name: 'Addition', score: 88, students: 28 },
    { name: 'Subtraction', score: 85, students: 27 },
    { name: 'Multiplication', score: 75, students: 25 },
    { name: 'Division', score: 80, students: 26 }
  ],
  progressData: [
    { month: 'Jan', score: 75 },
    { month: 'Feb', score: 78 },
    { month: 'Mar', score: 82 },
    { month: 'Apr', score: 85 },
    { month: 'May', score: 88 },
    { month: 'Jun', score: 90 }
  ],
  strugglingStudents: [
    { id: 1, name: 'John Doe', topic: 'Multiplication', score: 65 },
    { id: 2, name: 'Jane Smith', topic: 'Division', score: 68 },
    { id: 3, name: 'Mike Johnson', topic: 'Fractions', score: 70 }
  ],
  gradeDistribution: [
    { name: 'A (90-100)', value: 8 },
    { name: 'B (80-89)', value: 12 },
    { name: 'C (70-79)', value: 7 },
    { name: 'D (60-69)', value: 3 }
  ]
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ClassAnalytics: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('5A');
  const { isAdmin } = useAuth();

  return (
    <div className="class-analytics-page">
      <div className="page-header">
        <h1 className="page-title">Class Analytics</h1>
        <select
          className="class-select"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="5A">Grade 5 - Section A</option>
          <option value="5B">Grade 5 - Section B</option>
          <option value="4A">Grade 4 - Section A</option>
          <option value="4B">Grade 4 - Section B</option>
        </select>
      </div>

      {/* Overview Cards */}
      <Row className="g-4 mb-4">
        <Col md={3}>
          <div className="overview-card">
            <div className="overview-label">Total Students</div>
            <div className="overview-value">{classData.overallStats.totalStudents}</div>
          </div>
        </Col>
        <Col md={3}>
          <div className="overview-card">
            <div className="overview-label">Average Score</div>
            <div className="overview-value">{classData.overallStats.averageScore}%</div>
          </div>
        </Col>
        <Col md={3}>
          <div className="overview-card">
            <div className="overview-label">Completion Rate</div>
            <div className="overview-value">{classData.overallStats.completionRate}%</div>
          </div>
        </Col>
        <Col md={3}>
          <div className="overview-card">
            <div className="overview-label">Active Students</div>
            <div className="overview-value">{classData.overallStats.activeStudents}</div>
          </div>
        </Col>
      </Row>

      <Row className="g-4">
        {/* Topic Performance Chart */}
        <Col md={8}>
          <div className="chart-card">
            <div className="chart-header">
              <h2 className="chart-title">Topic Performance</h2>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={classData.topicPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" fill="#8884d8" name="Average Score" />
                  <Bar dataKey="students" fill="#82ca9d" name="Students Completed" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Col>

        {/* Grade Distribution */}
        <Col md={4}>
          <div className="chart-card">
            <div className="chart-header">
              <h2 className="chart-title">Grade Distribution</h2>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={classData.gradeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} (${value})`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {classData.gradeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="g-4 mt-4">
        {/* Progress Over Time */}
        <Col md={8}>
          <div className="chart-card">
            <div className="chart-header">
              <h2 className="chart-title">Progress Over Time</h2>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={classData.progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="score" stroke="#8884d8" name="Average Score" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Col>

        {/* Struggling Students */}
        <Col md={4}>
          <div className="chart-card">
            <div className="chart-header">
              <h2 className="chart-title">Students Needing Help</h2>
            </div>
            <div className="table-responsive">
              <table className="students-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Topic</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {classData.strugglingStudents.map((student) => (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>{student.topic}</td>
                      <td>
                        <span className={`score-badge ${student.score < 70 ? 'danger' : 'warning'}`}>
                          {student.score}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ClassAnalytics; 