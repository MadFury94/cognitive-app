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
