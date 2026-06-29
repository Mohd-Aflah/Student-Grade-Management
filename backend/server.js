require('dotenv').config();
const express = require('express');
const cors = require('cors');

const subjectRoutes = require('./routes/subjects');
const studentRoutes = require('./routes/students');
const gradeRoutes = require('./routes/grades');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/subjects', subjectRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/grades', gradeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
