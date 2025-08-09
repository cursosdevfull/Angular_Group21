-- Insertar cursos de ejemplo
INSERT INTO course (name) VALUES 
('Angular Fundamentals'),
('React Basics'),
('Vue.js Complete Guide'),
('Node.js Backend Development'),
('TypeScript Advanced');

-- Insertar horarios de ejemplo
INSERT INTO schedule (courseId, name, frequency, duration, resume, price) VALUES 
(1, 'Grupo Mañana - Angular', 'Lunes a Viernes 9:00-12:00', '3 meses', 'Curso intensivo de Angular con enfoque práctico y proyectos reales. Aprenderás desde los conceptos básicos hasta técnicas avanzadas.', 299.99),
(1, 'Grupo Noche - Angular', 'Lunes, Miércoles y Viernes 19:00-22:00', '4 meses', 'Curso de Angular para profesionales que trabajan. Horarios flexibles con clases nocturnas.', 349.99),
(2, 'React Intensivo', 'Sábados 9:00-17:00', '2 meses', 'Curso intensivo de React en fines de semana. Ideal para aprender rápidamente esta popular librería.', 399.99),
(3, 'Vue.js Weekend', 'Sábados y Domingos 10:00-14:00', '6 semanas', 'Aprende Vue.js en fines de semana con proyectos prácticos y ejercicios hands-on.', 249.99),
(4, 'Node.js Full-time', 'Lunes a Viernes 14:00-18:00', '8 semanas', 'Desarrollo backend completo con Node.js, Express, MongoDB y despliegue en la nube.', 449.99);
