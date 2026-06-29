import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import Subjects from './pages/Subjects'
import Students from './pages/Students'
import StudentGrades from './pages/StudentGrades'

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  
  return (
    <nav className="navbar navbar-expand-md navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={() => setIsOpen(false)}>Student Grades</Link>
        <button 
          className="navbar-toggler border-0 shadow-none px-0" 
          type="button" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show mt-3 mt-md-0' : ''}`}>
          <div className="navbar-nav ms-auto">
            <Link className={`nav-link ${location.pathname === '/subjects' ? 'active text-white' : ''}`} to="/subjects" onClick={() => setIsOpen(false)}>Subjects</Link>
            <Link className={`nav-link ${location.pathname === '/students' ? 'active text-white' : ''}`} to="/students" onClick={() => setIsOpen(false)}>Students</Link>
            <Link className={`nav-link ${location.pathname === '/grades' || location.pathname === '/' ? 'active text-white' : ''}`} to="/grades" onClick={() => setIsOpen(false)}>Grades</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="container mt-4 mb-5">
        <Routes>
          <Route path="/" element={<StudentGrades />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/students" element={<Students />} />
          <Route path="/grades" element={<StudentGrades />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
