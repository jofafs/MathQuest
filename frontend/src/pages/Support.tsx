import React from 'react';
import { Row, Col, Form, Accordion } from 'react-bootstrap';
import { 
  Help as HelpIcon,
  School as SchoolIcon,
  ContactSupport as ContactSupportIcon,
  Book as BookIcon,
  VideoLibrary as VideoLibraryIcon,
  Description as DescriptionIcon,
  Send as SendIcon
} from '@mui/icons-material';
import '../styles/support.css';

// Mock data - replace with actual data from your backend
const faqItems = [
  {
    id: 1,
    question: 'How do I create a new assignment?',
    answer: 'To create a new assignment, go to the Assignments page and click the "Create Assignment" button. Fill in the required details such as title, topic, grade level, and due date.'
  },
  {
    id: 2,
    question: 'How can I track student progress?',
    answer: 'You can track student progress through the Analytics page, which provides detailed reports and visualizations of student performance across different topics and time periods.'
  },
  {
    id: 3,
    question: 'How do I reset a student\'s progress?',
    answer: 'To reset a student\'s progress, go to the Students page, find the student, and use the "Reset Progress" option in their profile. Note that this action cannot be undone.'
  },
  {
    id: 4,
    question: 'How do I export reports?',
    answer: 'You can export reports from the Analytics page by selecting the desired data range and clicking the "Export Report" button. Reports can be downloaded in PDF or Excel format.'
  }
];

const tutorials = [
  {
    id: 1,
    title: 'Getting Started Guide',
    type: 'document',
    icon: <BookIcon />,
    link: '#'
  },
  {
    id: 2,
    title: 'Creating Assignments',
    type: 'video',
    icon: <VideoLibraryIcon />,
    link: '#'
  },
  {
    id: 3,
    title: 'Understanding Analytics',
    type: 'document',
    icon: <BookIcon />,
    link: '#'
  },
  {
    id: 4,
    title: 'Student Management',
    type: 'video',
    icon: <VideoLibraryIcon />,
    link: '#'
  }
];

const Support: React.FC = () => {
  return (
    <div className="support-page">
      <h1 className="page-title">Support & Help Center</h1>

      <Row className="g-4">
        {/* FAQ Section */}
        <Col md={8}>
          <div className="faq-card">
            <h2 className="faq-title">
              <HelpIcon />
              Frequently Asked Questions
            </h2>
            <Accordion>
              {faqItems.map((item) => (
                <Accordion.Item key={item.id} eventKey={item.id.toString()}>
                  <Accordion.Header>{item.question}</Accordion.Header>
                  <Accordion.Body>{item.answer}</Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>

          {/* Contact Form */}
          <div className="contact-form-card">
            <h2 className="faq-title">
              <ContactSupportIcon />
              Contact Support
            </h2>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" required />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" required />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Subject</Form.Label>
                <Form.Control type="text" placeholder="Enter subject" required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Describe your issue or question..."
                  required
                />
              </Form.Group>
              <button type="submit" className="submit-btn">
                <SendIcon /> Send Message
              </button>
            </Form>
          </div>
        </Col>

        {/* Tutorials and Resources */}
        <Col md={4}>
          <div className="resources-card">
            <h2 className="faq-title">
              <SchoolIcon />
              Tutorials & Resources
            </h2>
            <div>
              {tutorials.map((tutorial) => (
                <a
                  key={tutorial.id}
                  href={tutorial.link}
                  className="resource-item"
                >
                  <div className="resource-icon">
                    {tutorial.icon}
                  </div>
                  <div className="resource-info">
                    <div className="resource-title">{tutorial.title}</div>
                    <div className="resource-type">
                      {tutorial.type === 'video' ? 'Video Tutorial' : 'Documentation'}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="quick-links-card">
            <h2 className="faq-title">
              <DescriptionIcon />
              Quick Links
            </h2>
            <div>
              <a href="#" className="quick-link-item">
                User Manual
              </a>
              <a href="#" className="quick-link-item">
                System Requirements
              </a>
              <a href="#" className="quick-link-item">
                Privacy Policy
              </a>
              <a href="#" className="quick-link-item">
                Terms of Service
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Support; 