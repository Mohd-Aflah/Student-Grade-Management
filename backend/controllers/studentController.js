const db = require('../db');

exports.getStudents = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT s.*, sub.subject_name FROM mst_student s 
      JOIN mst_subject sub ON s.subject_key = sub.subject_key
      ORDER BY s.student_key DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.addStudent = async (req, res) => {
  let { student_name, subject_key, grade } = req.body;
  if (!student_name?.trim() || !subject_key || isNaN(grade) || grade < 0 || grade > 100) {
    return res.status(400).json({ error: 'Invalid input data' });
  }
  
  grade = Number(grade);
  const remarks = grade >= 75 ? 'PASS' : 'FAIL';
  try {
    const [result] = await db.query(
      'INSERT INTO mst_student (student_name, subject_key, grade, remarks) VALUES (?, ?, ?, ?)',
      [student_name.trim(), subject_key, grade, remarks]
    );
    res.json({ student_key: result.insertId, student_name: student_name.trim(), subject_key, grade, remarks });
  } catch (err) {
    if (err.code === 'ER_NO_REFERENCED_ROW_2') return res.status(400).json({ error: 'Invalid subject' });
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateStudent = async (req, res) => {
  let { student_name, subject_key, grade } = req.body;
  if (!student_name?.trim() || !subject_key || isNaN(grade) || grade < 0 || grade > 100) {
    return res.status(400).json({ error: 'Invalid input data' });
  }
  
  grade = Number(grade);
  const remarks = grade >= 75 ? 'PASS' : 'FAIL';
  try {
    await db.query(
      'UPDATE mst_student SET student_name=?, subject_key=?, grade=?, remarks=? WHERE student_key=?',
      [student_name.trim(), subject_key, grade, remarks, req.params.id]
    );
    res.json({ message: 'Student updated' });
  } catch (err) {
    if (err.code === 'ER_NO_REFERENCED_ROW_2') return res.status(400).json({ error: 'Invalid subject' });
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    await db.query('DELETE FROM mst_student WHERE student_key = ?', [req.params.id]);
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
