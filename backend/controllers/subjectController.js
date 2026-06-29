const db = require('../db');

exports.getSubjects = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM mst_subject ORDER BY subject_key DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.addSubject = async (req, res) => {
  const { subject_name } = req.body;
  if (!subject_name?.trim()) return res.status(400).json({ error: 'Name required' });

  try {
    const [result] = await db.query('INSERT INTO mst_subject (subject_name) VALUES (?)', [subject_name.trim()]);
    res.json({ subject_key: result.insertId, subject_name: subject_name.trim() });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateSubject = async (req, res) => {
  const { subject_name } = req.body;
  if (!subject_name?.trim()) return res.status(400).json({ error: 'Name required' });

  try {
    await db.query('UPDATE mst_subject SET subject_name = ? WHERE subject_key = ?', [subject_name.trim(), req.params.id]);
    res.json({ message: 'Subject updated' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteSubject = async (req, res) => {
  try {
    await db.query('DELETE FROM mst_subject WHERE subject_key = ?', [req.params.id]);
    res.json({ message: 'Subject deleted' });
  } catch (err) {
    if (err.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(400).json({ error: 'Subject is in use by students' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};
