-- Programs Table
CREATE TABLE IF NOT EXISTS programs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    duration TEXT NOT NULL,
    sessions_per_week TEXT NOT NULL,
    improvement_stat TEXT NOT NULL,
    improvement_label TEXT NOT NULL,
    icon TEXT NOT NULL,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial programs data
INSERT INTO programs (slug, title, description, duration, sessions_per_week, improvement_stat, improvement_label, icon) VALUES
('dyslexia', 'Dyslexia', 'Structured reading and phonological training that rewires how the brain processes text.', '12-24 weeks', '2-3 sessions', '2-4 grade levels', 'AVG. IMPROVEMENT', 'BookOpen'),
('adhd', 'ADHD', 'Focus and executive function training that builds self-regulation for better learning.', '8-16 weeks', '2 sessions', '62% better', 'FOCUS IMPROVEMENT', 'Focus'),
('autism', 'Autism spectrum', 'Social cognition, communication, and sensory processing support tailored to each child.', '16-32 weeks', '2-3 sessions', '3-5 milestones', 'AVG. PROGRESS', 'Users'),
('speech', 'Speech disorders', 'Language processing and articulation therapy for clearer, more confident communication.', '12-20 weeks', '2 sessions', '70% clarity', 'SPEECH IMPROVEMENT', 'MessageSquare'),
('dyspraxia', 'Dyspraxia', 'Motor planning and coordination training to improve physical and written tasks.', '12-24 weeks', '2-3 sessions', '4-6 skills', 'MOTOR SKILLS GAINED', 'Pencil'),
('learning-delays', 'Learning delays', 'Cognitive strengthening across memory, processing speed, and reasoning ability.', '16-28 weeks', '2-3 sessions', '2-3 grade levels', 'AVG. IMPROVEMENT', 'Brain');

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    image_url TEXT,
    is_active INTEGER DEFAULT 1,
    display_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial testimonials data
INSERT INTO testimonials (name, role, content, rating, display_order) VALUES
('Sarah Johnson', 'Mother of 8-year-old', 'My son went from struggling reader to reading above grade level in just 4 months. The transformation has been incredible.', 5, 1),
('Michael Chen', 'Father of 10-year-old', 'The ADHD program gave our daughter tools she uses every day. Her teachers have noticed a huge difference in focus.', 5, 2),
('Emily Rodriguez', 'Mother of 6-year-old', 'We tried everything before finding CogniSkills. Their autism program finally helped our son make real progress.', 5, 3),
('David Thompson', 'Father of 9-year-old', 'Speech therapy here is different. They understand the brain science behind communication challenges.', 5, 4),
('Lisa Anderson', 'Mother of 7-year-old', 'My daughter confidence has soared. She went from avoiding writing to actually enjoying it.', 5, 5),
('James Wilson', 'Father of 11-year-old', 'The cognitive training approach works. Our son is now thriving in school instead of just surviving.', 5, 6),
('Maria Garcia', 'Mother of 8-year-old', 'Professional, caring, and most importantly - effective. Worth every penny.', 5, 7),
('Robert Brown', 'Father of 9-year-old', 'They do not just treat symptoms. They rewire how kids learn. Game changer for our family.', 5, 8);
