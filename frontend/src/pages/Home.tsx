import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  TrendingUp as TrendingUpIcon,
  Star as StarIcon,
  PlayArrow as PlayArrowIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import '../styles/home.css';

const Home: React.FC = () => {
  const features = [
    {
      icon: <SchoolIcon fontSize="large" />,
      title: 'Track Progress',
      description: 'Monitor student performance and learning outcomes in real-time'
    },
    {
      icon: <AssignmentIcon fontSize="large" />,
      title: 'Assign Quizzes',
      description: 'Create and manage interactive quizzes to test student knowledge'
    },
    {
      icon: <TrendingUpIcon fontSize="large" />,
      title: 'Monitor Engagement',
      description: 'Track student participation and engagement in learning activities'
    }
  ];

  const testimonials = [
    {
      quote: "MathQuest has transformed how my students learn math. The game-based approach makes learning fun!",
      author: "Sarah Johnson",
      role: "5th Grade Teacher"
    },
    {
      quote: "The analytics dashboard helps me identify areas where students need extra support.",
      author: "Michael Chen",
      role: "Math Department Head"
    },
    {
      quote: "My students are more engaged and excited about math than ever before.",
      author: "Emily Rodriguez",
      role: "3rd Grade Teacher"
    }
  ];

  return (
    <div className="home-page roblox-theme">
      {/* Hero Section */}
      <section className="hero-section roblox-hero">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="hero-title roblox-title">
                Make Math Learning Fun with <span className="brand-highlight">MathQuest</span>
              </h1>
              <p className="hero-subtitle">
                A Roblox-powered adventure that turns math into an epic quest. Assign, track, and engage your students like never before.
              </p>
              <div className="hero-buttons">
                <Link to="/register" className="hero-btn hero-btn-primary neon-button">
                  Get Started <ArrowForwardIcon />
                </Link>
                <button className="hero-btn hero-btn-outline glass-button">
                </button>
              </div>
            </Col>
            <Col lg={6}>
              <div className="hero-image">
                <img
                  src="9ad969ce-9a65-425f-a30f-7b9c634bf621.jpg"
                  alt="MathQuest Game Screenshot"
                  className="rounded-image"
                />
                
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section bg-roblox-light">
        <Container>
          <h2 className="section-title">Key Features</h2>
          <p className="section-subtitle">Gamify your math classroom with these powerful tools</p>
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col key={index} md={4}>
                <div className="feature-card feature-glow">
                  <div className="feature-icon animated-icon">
                    {feature.icon}
                  </div>
                  <h4 className="feature-title">{feature.title}</h4>
                  <p className="feature-description">{feature.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section bg-roblox-dark text-white">
        <Container>
          <h2 className="section-title">What Educators Say</h2>
          <p className="section-subtitle text-light">Trusted by teachers across the country</p>
          <Row className="g-4">
            {testimonials.map((testimonial, index) => (
              <Col key={index} md={4}>
                <div className="testimonial-card roblox-card">
                  <div className="testimonial-rating">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="star-glow" />
                    ))}
                  </div>
                  <p className="testimonial-quote">"{testimonial.quote}"</p>
                  <div>
                    <h6 className="testimonial-author">{testimonial.author}</h6>
                    <small className="testimonial-role">{testimonial.role}</small>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <Container>
          <h2 className="cta-title">Ready to Transform Math Learning?</h2>
          <p className="cta-subtitle">Join thousands of educators using MathQuest today</p>
          <Link to="/register" className="cta-button">
            Get Started Now <ArrowForwardIcon />
          </Link>
        </Container>
      </section>
    </div>
  );
};

export default Home; 