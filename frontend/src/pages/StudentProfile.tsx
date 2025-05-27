import React from 'react';
import { useParams } from 'react-router-dom';
import {
  School as SchoolIcon,
  AccessTime as AccessTimeIcon,
  EmojiEvents as EmojiEventsIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import '../styles/student-profile.css';

const StudentProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock data - replace with actual API call
  const student = {
    id,
    name: 'John Doe',
    grade: '5th Grade',
    section: 'A',
    overallScore: 85,
    totalPlaytime: '24h 30m',
    topics: [
      { name: 'Addition', score: 90, progress: 90 },
      { name: 'Subtraction', score: 85, progress: 85 },
      { name: 'Multiplication', score: 80, progress: 80 },
      { name: 'Division', score: 75, progress: 75 }
    ],
    recentActivity: [
      { type: 'Quiz', name: 'Addition Quiz', score: 95, date: '2024-03-15' },
      { type: 'Game', name: 'Math Adventure', score: 88, date: '2024-03-14' },
      { type: 'Practice', name: 'Multiplication Practice', score: 92, date: '2024-03-13' }
    ],
    achievements: [
      { name: 'Math Master', description: 'Completed 100 math problems', date: '2024-03-10' },
      { name: 'Quick Learner', description: 'Mastered 5 topics in one week', date: '2024-03-05' },
      { name: 'Perfect Score', description: 'Got 100% in a quiz', date: '2024-03-01' }
    ]
  };

  return (
    <div className="student-profile-page">
      <div className="page-header">
        <h1 className="page-title">Student Profile</h1>
      </div>

      {/* Student Overview */}
      <div className="row g-4 mb-4">
        <div className="col-md-6 col-lg-3">
          <div className="overview-card">
            <div className="overview-header">
              <div className="overview-icon" style={{ backgroundColor: 'rgba(var(--primary-color-rgb), 0.1)' }}>
                <SchoolIcon style={{ color: 'var(--primary-color)' }} />
              </div>
              <div>
                <h6 className="overview-title">Grade & Section</h6>
                <p className="overview-value">{student.grade} - {student.section}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="overview-card">
            <div className="overview-header">
              <div className="overview-icon" style={{ backgroundColor: 'rgba(var(--success-color-rgb), 0.1)' }}>
                <TrendingUpIcon style={{ color: 'var(--success-color)' }} />
              </div>
              <div>
                <h6 className="overview-title">Overall Score</h6>
                <p className="overview-value">{student.overallScore}%</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="overview-card">
            <div className="overview-header">
              <div className="overview-icon" style={{ backgroundColor: 'rgba(var(--info-color-rgb), 0.1)' }}>
                <AccessTimeIcon style={{ color: 'var(--info-color)' }} />
              </div>
              <div>
                <h6 className="overview-title">Total Playtime</h6>
                <p className="overview-value">{student.totalPlaytime}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="overview-card">
            <div className="overview-header">
              <div className="overview-icon" style={{ backgroundColor: 'rgba(var(--warning-color-rgb), 0.1)' }}>
                <EmojiEventsIcon style={{ color: 'var(--warning-color)' }} />
              </div>
              <div>
                <h6 className="overview-title">Achievements</h6>
                <p className="overview-value">{student.achievements.length} earned</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Topic Performance */}
      <div className="row g-4 mb-4">
        <div className="col-lg-8">
          <div className="performance-card">
            <div className="performance-header">
              <h5 className="performance-title">Topic Performance</h5>
            </div>
            <table className="performance-table">
              <thead>
                <tr>
                  <th>Topic</th>
                  <th>Score</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                {student.topics.map((topic, index) => (
                  <tr key={index}>
                    <td>{topic.name}</td>
                    <td>{topic.score}%</td>
                    <td>
                      <div className="progress-bar">
                        <div
                          className="progress-bar-fill"
                          style={{ width: `${topic.progress}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="activity-card">
            <div className="activity-header">
              <h5 className="activity-title">Recent Activity</h5>
            </div>
            <ul className="activity-list">
              {student.recentActivity.map((activity, index) => (
                <li key={index} className="activity-item">
                  <div className="activity-content">
                    <div className="activity-info">
                      <h6>{activity.name}</h6>
                      <span className="activity-date">{activity.date}</span>
                    </div>
                    <span className={`activity-score ${activity.score >= 90 ? 'high' : 'medium'}`}>
                      {activity.score}%
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="row">
        <div className="col">
          <div className="achievements-card">
            <div className="achievements-header">
              <h5 className="achievements-title">Achievements</h5>
            </div>
            <div className="row g-4">
              {student.achievements.map((achievement, index) => (
                <div className="col-md-4" key={index}>
                  <div className="achievement-card">
                    <h6 className="achievement-name">{achievement.name}</h6>
                    <p className="achievement-description">{achievement.description}</p>
                    <span className="achievement-date">Earned on {achievement.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile; 