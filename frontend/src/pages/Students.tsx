import React, { useState } from 'react';
import { 
  Search as SearchIcon,
  Sort as SortIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FileDownload as FileDownloadIcon,
  FilterList as FilterListIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/students.css';

// Mock data - replace with actual data from your backend
const students = [
  {
    id: 1,
    name: 'John Doe',
    grade: 'Grade 5',
    section: 'A',
    playtime: '45 hours',
    averageScore: 85,
    status: 'active'
  },
  {
    id: 2,
    name: 'Jane Smith',
    grade: 'Grade 5',
    section: 'B',
    playtime: '38 hours',
    averageScore: 92,
    status: 'active'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    grade: 'Grade 4',
    section: 'A',
    playtime: '25 hours',
    averageScore: 78,
    status: 'inactive'
  }
];

const Students: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredStudents = students
    .filter(student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.section.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField as keyof typeof a];
      const bValue = b[sortField as keyof typeof b];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' 
          ? aValue - bValue
          : bValue - aValue;
      }
      
      return 0;
    });

  return (
    <div className="students-page">
      <div className="page-header">
        <h1 className="page-title">Students</h1>
        {isAdmin && (
          <button className="action-button primary">
            <AddIcon />
            Add Student
          </button>
        )}
      </div>

      <div className="search-card">
        <div className="row g-3">
          <div className="col-md-6">
            <div className="search-input-group">
              <div className="input-group">
                <span className="input-group-text">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="action-buttons">
              <button className="action-button secondary">
                <FileDownloadIcon />
                Export
              </button>
              <button className="action-button secondary">
                <FilterListIcon />
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="students-table">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>
                Name
                {sortField === 'name' && (
                  <SortIcon className="ms-1" style={{ fontSize: 16 }} />
                )}
              </th>
              <th onClick={() => handleSort('grade')}>
                Grade
                {sortField === 'grade' && (
                  <SortIcon className="ms-1" style={{ fontSize: 16 }} />
                )}
              </th>
              <th onClick={() => handleSort('section')}>
                Section
                {sortField === 'section' && (
                  <SortIcon className="ms-1" style={{ fontSize: 16 }} />
                )}
              </th>
              <th onClick={() => handleSort('playtime')}>
                Playtime
                {sortField === 'playtime' && (
                  <SortIcon className="ms-1" style={{ fontSize: 16 }} />
                )}
              </th>
              <th onClick={() => handleSort('averageScore')}>
                Average Score
                {sortField === 'averageScore' && (
                  <SortIcon className="ms-1" style={{ fontSize: 16 }} />
                )}
              </th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.grade}</td>
                <td>{student.section}</td>
                <td>{student.playtime}</td>
                <td>{student.averageScore}%</td>
                <td>
                  <span className={`status-badge ${student.status}`}>
                    {student.status}
                  </span>
                </td>
                <td>
                  <div className="action-icons">
                    <EditIcon
                      className="action-icon"
                      onClick={() => navigate(`/students/${student.id}`)}
                    />
                    {isAdmin && (
                      <DeleteIcon className="action-icon delete" />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students; 