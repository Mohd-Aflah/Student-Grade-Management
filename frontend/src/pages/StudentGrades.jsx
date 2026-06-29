import { useState, useEffect } from 'react'
import api from '../api'

export default function StudentGrades() {
  const [grades, setGrades] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    const timer = setTimeout(() => fetchGrades(), 300)
    return () => clearTimeout(timer)
  }, [search, filter])

  const fetchGrades = async () => {
    try {
      const res = await api.get('/api/grades', { params: { search, filter } })
      setGrades(res.data)
    } catch {
      alert('Failed to load grades')
    }
  }

  return (
    <div>
      <h2 className="mb-4">Student Grades</h2>
      <div className="row g-3 mb-4">
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search by student name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select className="form-select" value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="All">All Grades</option>
            <option value="PASS">PASS</option>
            <option value="FAIL">FAIL</option>
          </select>
        </div>
      </div>

      <div className="table-wrapper">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th width="5%">#</th>
                <th width="35%">Student Name</th>
                <th width="35%">Subject Name</th>
                <th width="10%">Grade</th>
                <th width="15%">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((row, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td className="fw-medium">{row.student_name}</td>
                  <td>{row.subject_name}</td>
                  <td className="fw-semibold">{row.grade}</td>
                  <td>
                    <span className={`badge ${row.remarks === 'PASS' ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'}`}>
                      {row.remarks}
                    </span>
                  </td>
                </tr>
              ))}
              {grades.length === 0 && <tr><td colSpan="5" className="text-center py-4 text-muted">No records found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
