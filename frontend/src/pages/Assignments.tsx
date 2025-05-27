import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Button, 
  Table, 
  Modal, 
  Form
} from 'react-bootstrap';
import { 
  Add, 
  Edit, 
  Delete, 
  Search,
  Assignment as AssignmentIcon,
  Timer,
  Group
} from '@mui/icons-material';
import '../styles/assignments.css';

// Mock data - replace with actual data from your backend
const assignments = [
  {
    id: 1,
    title: 'Basic Addition Quiz',
    topic: 'Addition',
    grade: 'Grade 4',
    dueDate: '2024-03-01',
    status: 'active',
    assignedTo: 'Grade 4A',
    completionRate: 85
  },
  {
    id: 2,
    title: 'Multiplication Practice',
    topic: 'Multiplication',
    grade: 'Grade 5',
    dueDate: '2024-03-05',
    status: 'draft',
    assignedTo: 'Grade 5B',
    completionRate: 0
  },
  {
    id: 3,
    title: 'Fractions Test',
    topic: 'Fractions',
    grade: 'Grade 6',
    dueDate: '2024-03-10',
    status: 'completed',
    assignedTo: 'Grade 6A',
    completionRate: 92
  }
];

const Assignments: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddAssignment = () => {
    setSelectedAssignment(null);
    setShowModal(true);
  };

  const handleEditAssignment = (assignment: any) => {
    setSelectedAssignment(assignment);
    setShowModal(true);
  };

  const filteredAssignments = assignments.filter(assignment =>
    assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="assignments-page">
      <div className="page-header">
        <h1 className="page-title">Assignments</h1>
      </div>

      {/* Search and Add Assignment */}
      <Card className="actions-card">
        <Card.Body>
          <Row className="g-3">
            <Col md={6}>
              <div className="search-group">
                <Search className="search-icon" />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search assignments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </Col>
            <Col md={6} className="text-end">
              <button className="create-btn" onClick={handleAddAssignment}>
                <Add /> Create Assignment
              </button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Assignments List */}
      <Card className="assignments-card">
        <Card.Body>
          <div className="table-responsive">
            <table className="assignments-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Topic</th>
                  <th>Grade</th>
                  <th>Due Date</th>
                  <th>Assigned To</th>
                  <th>Status</th>
                  <th>Completion</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssignments.map((assignment) => (
                  <tr key={assignment.id}>
                    <td>
                      <div className="assignment-title">
                        <AssignmentIcon />
                        {assignment.title}
                      </div>
                    </td>
                    <td>{assignment.topic}</td>
                    <td>{assignment.grade}</td>
                    <td>{assignment.dueDate}</td>
                    <td>
                      <div className="assignment-group">
                        <Group />
                        {assignment.assignedTo}
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${assignment.status}`}>
                        {assignment.status}
                      </span>
                    </td>
                    <td>
                      <div className="progress-container">
                        <div className="progress-bar">
                          <div
                            className="progress-bar-fill"
                            style={{ width: `${assignment.completionRate}%` }}
                          />
                        </div>
                        <span className="progress-text">{assignment.completionRate}%</span>
                      </div>
                    </td>
                    <td>
                      <button
                        className="action-btn"
                        onClick={() => handleEditAssignment(assignment)}
                      >
                        <Edit />
                      </button>
                      <button className="action-btn delete">
                        <Delete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>

      {/* Add/Edit Assignment Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedAssignment ? 'Edit Assignment' : 'Create Assignment'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={selectedAssignment?.title}
                    placeholder="Enter assignment title"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Topic</Form.Label>
                  <Form.Select defaultValue={selectedAssignment?.topic}>
                    <option value="">Select topic</option>
                    <option value="Addition">Addition</option>
                    <option value="Subtraction">Subtraction</option>
                    <option value="Multiplication">Multiplication</option>
                    <option value="Division">Division</option>
                    <option value="Fractions">Fractions</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Grade Level</Form.Label>
                  <Form.Select defaultValue={selectedAssignment?.grade}>
                    <option value="">Select grade</option>
                    <option value="Grade 4">Grade 4</option>
                    <option value="Grade 5">Grade 5</option>
                    <option value="Grade 6">Grade 6</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Due Date</Form.Label>
                  <Form.Control
                    type="date"
                    defaultValue={selectedAssignment?.dueDate}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Assign To</Form.Label>
                  <Form.Select defaultValue={selectedAssignment?.assignedTo}>
                    <option value="">Select class</option>
                    <option value="Grade 4A">Grade 4A</option>
                    <option value="Grade 4B">Grade 4B</option>
                    <option value="Grade 5A">Grade 5A</option>
                    <option value="Grade 5B">Grade 5B</option>
                    <option value="Grade 6A">Grade 6A</option>
                    <option value="Grade 6B">Grade 6B</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Time Limit (minutes)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter time limit"
                    min="1"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Instructions</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter assignment instructions"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            {selectedAssignment ? 'Save Changes' : 'Create Assignment'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Assignments; 