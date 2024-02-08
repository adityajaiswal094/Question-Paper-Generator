-- create dabatabase
CREATE DATABASE questionpaper;

-- connect to database
-- \c questionpaper

-- create table for storing questions
CREATE TABLE questions(
    qID SERIAL PRIMARY KEY NOT NULL,
    question VARCHAR(255) NOT NULL,
    subject_name VARCHAR(255) NOT NULL,
    topic_name VARCHAR(255) NOT NULL,
    difficulty VARCHAR(255) NOT NULL,
    marks NUMERIC(3) NOT NULL);

-- select all from questions table
SELECT * FROM questions;