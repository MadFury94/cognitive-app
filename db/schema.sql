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
