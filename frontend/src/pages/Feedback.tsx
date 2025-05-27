import React, { useState } from 'react';
import { Row, Col, Form, Tabs, Tab } from 'react-bootstrap';
import { 
  Send, 
  BugReport, 
  Lightbulb, 
  QuestionMark,
  Feedback as FeedbackIcon,
  CheckCircle,
  Warning
} from '@mui/icons-material';
import '../styles/feedback.css';

// Mock data - replace with actual data from your backend
const feedbackItems = [
  {
    id: 1,
    category: 'Bug Report',
    message: 'Game freezes when completing level 5',
    status: 'pending',
    date: '2024-02-20',
    priority: 'high'
  },
  {
    id: 2,
    category: 'Suggestion',
    message: 'Add more multiplication exercises',
    status: 'in-progress',
    date: '2024-02-19',
    priority: 'medium'
  },
  {
    id: 3,
    category: 'Question',
    message: 'How to reset student progress?',
    status: 'resolved',
    date: '2024-02-18',
    priority: 'low'
  }
];

const recommendations = [
  {
    id: 1,
    type: 'student',
    message: 'John needs additional practice with fractions',
    priority: 'high',
    date: '2024-02-20'
  },
  {
    id: 2,
    type: 'class',
    message: 'Grade 5A shows improvement in multiplication',
    priority: 'medium',
    date: '2024-02-19'
  },
  {
    id: 3,
    type: 'system',
    message: 'Consider adjusting difficulty level for Grade 4',
    priority: 'low',
    date: '2024-02-18'
  }
];

const Feedback: React.FC = () => {
  const [feedback, setFeedback] = useState({
    category: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle feedback submission
    console.log('Feedback submitted:', feedback);
    setFeedback({ category: '', message: '' });
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'bug report':
        return <BugReport />;
      case 'suggestion':
        return <Lightbulb />;
      case 'question':
        return <QuestionMark />;
      default:
        return <FeedbackIcon />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="status-badge bg-warning bg-opacity-10 text-warning">Pending</span>;
      case 'in-progress':
        return <span className="status-badge bg-primary bg-opacity-10 text-primary">In Progress</span>;
      case 'resolved':
        return <span className="status-badge bg-success bg-opacity-10 text-success">Resolved</span>;
      default:
        return <span className="status-badge bg-secondary bg-opacity-10 text-secondary">{status}</span>;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <div className="priority-icon bg-danger bg-opacity-10"><Warning className="text-danger" /></div>;
      case 'medium':
        return <div className="priority-icon bg-warning bg-opacity-10"><Warning className="text-warning" /></div>;
      case 'low':
        return <div className="priority-icon bg-success bg-opacity-10"><CheckCircle className="text-success" /></div>;
      default:
        return null;
    }
  };

  return (
    <div className="feedback-page">
      <h1 className="page-title">Feedback & Recommendations</h1>

      <Tabs defaultActiveKey="feedback" className="mb-4">
        <Tab eventKey="feedback" title="Feedback">
          <Row className="g-4">
            {/* Feedback Form */}
            <Col md={4}>
              <div className="feedback-form-card">
                <h2 className="form-title">Submit Feedback</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      value={feedback.category}
                      onChange={(e) => setFeedback({ ...feedback, category: e.target.value })}
                      required
                    >
                      <option value="">Select category</option>
                      <option value="Bug Report">Bug Report</option>
                      <option value="Suggestion">Suggestion</option>
                      <option value="Question">Question</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={feedback.message}
                      onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
                      placeholder="Describe your feedback in detail..."
                      required
                    />
                  </Form.Group>
                  <button type="submit" className="submit-btn">
                    <Send /> Submit Feedback
                  </button>
                </Form>
              </div>
            </Col>

            {/* Feedback List */}
            <Col md={8}>
              <div className="feedback-list-card">
                <h2 className="form-title">Recent Feedback</h2>
                <div>
                  {feedbackItems.map((item) => (
                    <div key={item.id} className="feedback-item">
                      <div className="feedback-header">
                        <div className="feedback-icon">
                          {getCategoryIcon(item.category)}
                        </div>
                        <div>
                          <span className="feedback-category">{item.category}</span>
                          <span className="feedback-date ms-2">{item.date}</span>
                        </div>
                      </div>
                      <p className="feedback-message">{item.message}</p>
                      <div className="feedback-footer">
                        {getStatusBadge(item.status)}
                        {getPriorityIcon(item.priority)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="recommendations" title="Recommendations">
          <div className="feedback-list-card">
            <h2 className="form-title">System Recommendations</h2>
            <div>
              {recommendations.map((item) => (
                <div key={item.id} className="recommendation-item">
                  <div className="recommendation-header">
                    <span className="recommendation-type">{item.type}</span>
                    <span className="recommendation-date">{item.date}</span>
                  </div>
                  <p className="recommendation-message">{item.message}</p>
                  {getPriorityIcon(item.priority)}
                </div>
              ))}
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Feedback; 