const db = require('../db');

exports.getGrades = async (req, res) => {
  const { search = '', filter = 'All' } = req.query;
  
  let query = 'SELECT * FROM vw_student_grades WHERE 1=1';
  let params = [];

  if (search.trim()) {
    query += ' AND student_name LIKE ?';
    params.push(`%${search.trim()}%`);
  }
  if (filter !== 'All') {
    query += ' AND remarks = ?';
    params.push(filter);
  }

  try {
    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
