-- Active: 1782755560127@@mysql-81b65ea-pdtuae-assessment.l.aivencloud.com@28207@student_grades_db
CREATE DATABASE IF NOT EXISTS student_grades_db;
USE student_grades_db;

CREATE TABLE IF NOT EXISTS mst_subject (
    subject_key INT AUTO_INCREMENT PRIMARY KEY,
    subject_name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS mst_student (
    student_key INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    subject_key INT NOT NULL,
    grade DECIMAL(5,2) NOT NULL,
    remarks VARCHAR(10) NOT NULL,
    FOREIGN KEY (subject_key) REFERENCES mst_subject(subject_key)
);

CREATE OR REPLACE VIEW vw_student_grades AS
SELECT 
    s.student_name AS student_name,
    sub.subject_name AS subject_name,
    s.grade AS grade,
    s.remarks AS remarks
FROM mst_student s
JOIN mst_subject sub ON s.subject_key = sub.subject_key;
