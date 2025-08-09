-- Crear tabla course
CREATE TABLE course (
    courseId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Crear tabla schedule
CREATE TABLE schedule (
    scheduleId INT AUTO_INCREMENT PRIMARY KEY,
    courseId INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    frequency VARCHAR(50) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    resume TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (courseId) REFERENCES course(courseId) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Índices para mejorar el rendimiento
CREATE INDEX idx_schedule_courseId ON schedule(courseId);
CREATE INDEX idx_course_name ON course(name);
CREATE INDEX idx_schedule_name ON schedule(name);
