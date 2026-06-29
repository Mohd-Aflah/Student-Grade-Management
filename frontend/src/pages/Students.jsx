import { useState, useEffect } from 'react'
import api from '../api'

export default function Students() {
  const [students, setStudents] = useState([])
  const [subjects, setSubjects] = useState([])
  const [form, setForm] = useState({ student_name: '', subject_key: '', grade: '' })
  const [editingId, setEditingId] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchStudents()
    fetchSubjects()
  }, [])

  const fetchStudents = async () => {
    try {
      const res = await api.get('/api/students')
      setStudents(res.data)
    } catch {
      alert('Failed to load students')
    }
  }

  const fetchSubjects = async () => {
    try {
      const res = await api.get('/api/subjects')
      setSubjects(res.data)
    } catch {
      alert('Failed to load subjects')
    }
  }

  const getRemarks = (grade) => {
    if (grade === '' || isNaN(grade)) return ''
    return Number(grade) >= 75 ? 'PASS' : 'FAIL'
  }

  const handleOpenAdd = () => {
    setForm({ student_name: '', subject_key: '', grade: '' })
    setEditingId(null)
    setShowModal(true)
  }

  const handleEdit = (student) => {
    setForm({
      student_name: student.student_name,
      subject_key: student.subject_key,
      grade: student.grade
    })
    setEditingId(student.student_key)
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.student_name.trim()) return alert('Name required')

    const data = {
      student_name: form.student_name,
      subject_key: Number(form.subject_key),
      grade: Number(form.grade)
    }

    try {
      if (editingId) {
        await api.put(`/api/students/${editingId}`, data)
      } else {
        await api.post('/api/students', data)
      }
      setShowModal(false)
      fetchStudents()
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to save student')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return
    try {
      await api.delete(`/api/students/${id}`)
      fetchStudents()
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete student')
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Students</h2>
        <button className="btn btn-primary" onClick={handleOpenAdd}>
          + Add Student
        </button>
      </div>

      <div className="table-wrapper">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th width="5%">#</th>
                <th width="30%">Student Name</th>
                <th width="25%">Subject</th>
                <th width="10%">Grade</th>
                <th width="10%">Remarks</th>
                <th width="20%" className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, i) => (
                <tr key={student.student_key}>
                  <td>{i + 1}</td>
                  <td className="fw-medium">{student.student_name}</td>
                  <td>{student.subject_name}</td>
                  <td className="fw-semibold">{student.grade}</td>
                  <td>
                    <span className={`badge ${student.remarks === 'PASS' ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'}`}>
                      {student.remarks}
                    </span>
                  </td>
                  <td className="text-end">
                    <button className="btn btn-light btn-sm me-2 text-primary fw-medium border-0" onClick={() => handleEdit(student)}>Edit</button>
                    <button className="btn btn-light btn-sm text-danger fw-medium border-0" onClick={() => handleDelete(student.student_key)}>Delete</button>
                  </td>
                </tr>
              ))}
              {students.length === 0 && <tr><td colSpan="6" className="text-center py-4 text-muted">No students found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">{editingId ? 'Edit Student' : 'Add Student'}</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label text-muted fw-semibold">Student Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. John Doe"
                      value={form.student_name}
                      onChange={e => setForm({ ...form, student_name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted fw-semibold">Subject</label>
                    <select
                      className="form-select"
                      value={form.subject_key}
                      onChange={e => setForm({ ...form, subject_key: e.target.value })}
                      required
                    >
                      <option value="">Select Subject</option>
                      {subjects.map(sub => (
                        <option key={sub.subject_key} value={sub.subject_key}>{sub.subject_name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="row g-3 mb-2">
                    <div className="col-md-6">
                      <label className="form-label text-muted fw-semibold">Grade</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="0-100"
                        value={form.grade}
                        onChange={e => setForm({ ...form, grade: e.target.value })}
                        min="0" max="100" required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-muted fw-semibold">Remarks</label>
                      <input 
                        type="text" 
                        className={`form-control fw-bold ${getRemarks(form.grade) === 'PASS' ? 'text-success' : (getRemarks(form.grade) === 'FAIL' ? 'text-danger' : '')}`} 
                        value={getRemarks(form.grade)} 
                        readOnly 
                        placeholder="Auto" 
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-0">
                  <button type="button" className="btn btn-light" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary px-4">
                    {editingId ? 'Update' : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
