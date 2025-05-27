import React, { useState } from 'react';
import {
  Download as DownloadIcon,
  PictureAsPdf as PdfIcon,
  TableChart as TableIcon,
  Assessment as AssessmentIcon,
  BarChart as BarChartIcon,
  Timeline as TimelineIcon
} from '@mui/icons-material';
import '../styles/reports.css';

const Reports: React.FC = () => {
  const [reportType, setReportType] = useState('performance');
  const [dateRange, setDateRange] = useState('7days');
  const [format, setFormat] = useState('pdf');

  const reportTypes = [
    {
      id: 'performance',
      title: 'Performance Report',
      description: 'Detailed analysis of student performance across topics',
      icon: <AssessmentIcon />
    },
    {
      id: 'activity',
      title: 'Activity Report',
      description: 'Summary of student engagement and participation',
      icon: <BarChartIcon />
    },
    {
      id: 'progress',
      title: 'Progress Report',
      description: 'Track student progress and improvement over time',
      icon: <TimelineIcon />
    }
  ];

  return (
    <div className="reports-page">
      <div className="page-header">
        <h1 className="page-title">Reports</h1>
      </div>

      {/* Report Type Selection */}
      <div className="row g-4 mb-4">
        {reportTypes.map((type) => (
          <div className="col-md-4" key={type.id}>
            <div
              className={`report-type-card ${reportType === type.id ? 'active' : ''}`}
              onClick={() => setReportType(type.id)}
            >
              <div className="report-type-header">
                <div className="report-type-icon">
                  {type.icon}
                </div>
                <h5 className="report-type-title">{type.title}</h5>
              </div>
              <p className="report-type-description">{type.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Report Configuration */}
      <div className="config-card">
        <div className="row g-3">
          <div className="col-md-4">
            <div className="config-form-group">
              <label className="config-label">Date Range</label>
              <select
                className="config-select"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="config-form-group">
              <label className="config-label">Format</label>
              <div className="format-buttons">
                <button
                  className={`format-button ${format === 'pdf' ? 'active' : ''}`}
                  onClick={() => setFormat('pdf')}
                >
                  <PdfIcon />
                  PDF
                </button>
                <button
                  className={`format-button ${format === 'excel' ? 'active' : ''}`}
                  onClick={() => setFormat('excel')}
                >
                  <TableIcon />
                  Excel
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <button className="generate-button">
              <DownloadIcon />
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Report Preview */}
      <div className="preview-card">
        <div className="preview-header">
          <h5 className="preview-title">Report Preview</h5>
        </div>
        <div className="preview-content">
          <div className="preview-icon">
            {reportType === 'performance' ? (
              <AssessmentIcon />
            ) : reportType === 'activity' ? (
              <BarChartIcon />
            ) : (
              <TimelineIcon />
            )}
          </div>
          <h5 className="preview-message">Select report options and click "Generate Report"</h5>
          <p className="preview-submessage">
            Your report will be generated in {format.toUpperCase()} format
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reports; 