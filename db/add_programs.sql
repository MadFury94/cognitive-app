-- Migration: Add Cognitive Skills Assessment, Teletherapy, and Reading & Spelling programs

INSERT OR IGNORE INTO programs (slug, title, description, duration, sessions_per_week, improvement_stat, improvement_label, icon) VALUES
('cognitive-assessment', 'Cognitive Skills Assessment', 'A comprehensive evaluation of your child''s cognitive profile — auditory processing, working memory, attention, processing speed, and more — to identify the root cause of learning difficulties.', '1-2 sessions', '1 session', 'Full profile', 'COGNITIVE PROFILE', 'Brain'),
('teletherapy', 'Cognitive Skills Teletherapy', 'The full Cognigym training program delivered online. Same structured, evidence-based sessions — accessible from anywhere in Nigeria and beyond.', '12-24 weeks', '2-3 sessions', 'Remote access', 'FLEXIBLE DELIVERY', 'Brain'),
('reading-spelling', 'Reading and Spelling', 'Targeted auditory and phonological training that builds the brain skills behind accurate reading and spelling — using the Auditory Integration Code (AIC) methodology.', '12-20 weeks', '2-3 sessions', '2-4 grade levels', 'AVG. IMPROVEMENT', 'BookOpen');
