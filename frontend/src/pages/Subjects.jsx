import { useState, useEffect } from 'react'
import api from '../api'

export default function Subjects() {
  const [subjects, setSubjects] = useState([])
  const [subjectName, setSubjectName] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => { fetchSubjects() }, [])

  const fetchSubjects = async () => {
    try {
      const res = await api.get('/api/subjects')
      setSubjects(res.data)
    } catch {
      alert('Failed to load subjects')
    }
  }

  const handleOpenAdd = () => {
    setSubjectName('')
    setEditingId(null)
    setShowModal(true)
  }

  const handleEdit = (sub) => {
    setSubjectName(sub.subject_name)
    setEditingId(sub.subject_key)
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!subjectName.trim()) return

    try {
      if (editingId) {
        await api.put(`/api/subjects/${editingId}`, { subject_name: subjectName })
      } else {
        await api.post('/api/subjects', { subject_name: subjectName })
      }
      setShowModal(false)
      fetchSubjects()
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to save subject')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return
    try {
      await api.delete(`/api/subjects/${id}`)
      fetchSubjects()
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete')
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Subjects</h2>
        <button className="btn btn-primary" onClick={handleOpenAdd}>
          + Add Subject
        </button>
      </div>

      <div className="table-wrapper">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th width="10%">#</th>
                <th width="60%">Subject Name</th>
                <th width="30%" className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((sub, i) => (
                <tr key={sub.subject_key}>
                  <td>{i + 1}</td>
                  <td className="fw-medium">{sub.subject_name}</td>
                  <td className="text-end">
                    <button className="btn btn-light btn-sm me-2 text-primary fw-medium border-0" onClick={() => handleEdit(sub)}>Edit</button>
                    <button className="btn btn-light btn-sm text-danger fw-medium border-0" onClick={() => handleDelete(sub.subject_key)}>Delete</button>
                  </td>
                </tr>
              ))}
              {subjects.length === 0 && <tr><td colSpan="3" className="text-center py-4 text-muted">No subjects found</td></tr>}
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
                  <h5 className="modal-title fw-bold">{editingId ? 'Edit Subject' : 'Add Subject'}</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label text-muted fw-semibold">Subject Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Mathematics"
                      value={subjectName}
                      onChange={e => setSubjectName(e.target.value)}
                      required
                      autoFocus
                    />
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
