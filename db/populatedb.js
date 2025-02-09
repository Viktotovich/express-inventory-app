#! /usr/bin/env node
const { Client } = require("pg");
require("dotenv").config();

//TODO: REFACTOR dotenv to use prod database, that way I can debug the live system
const query = `
    CREATE TABLE IF NOT EXISTS courses (
        course_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        course_name VARCHAR( 255 ) NOT NULL,
        course_duration SMALLINT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS teachers (
        teacher_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        teacher_name VARCHAR( 255 ) NOT NULL,
    );

    CREATE TABLE IF NOT EXISTS students (
        student_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        student_name VARCHAR(255) NOT NULL,
        teacher_id INT,
        student_course INT,
        CONSTRAINT fk_teacher 
            FOREIGN KEY (teacher_id)
                REFERENCES teachers(teacher_id)
                    ON DELETE SET NULL
        CONSTRAINT fk_course 
            FOREIGN KEY (student_course)
                REFERENCES courses(course_id) 
                    ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS teacher_courses (
        teacher_id INT,
        course_id INT,
        PRIMARY KEY (teacher_id, course_id),
        CONSTRAINT fk_teacher_courses_teacher
            FOREIGN KEY (teacher_id)
                REFERENCES teachers(teacher_id) 
                    ON DELETE CASCADE,
        CONSTRAINT fk_teacher_courses_course
            FOREIGN KEY (course_id)
                REFERENCES courses(course_id)
                    ON DELETE CASCADE
    );
`;

async function start() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`,
  });

  await client.connect();
  await client.query(query);
  await client.end();
  console.log("done");
}

start();
