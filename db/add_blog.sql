-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL DEFAULT 'Cogniskills Team',
    category TEXT NOT NULL DEFAULT 'General',
    cover_image TEXT,
    is_published INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1,
    display_order INTEGER DEFAULT 0,
    published_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Sample blog posts
INSERT INTO blog_posts (slug, title, excerpt, content, author, category, is_published, published_at) VALUES
(
  'what-is-auditory-processing',
  'What is Auditory Processing and Why Does It Matter for Reading?',
  'Many children who struggle to read are not lazy or slow — their brains simply have not developed the auditory processing skills that reading depends on.',
  '<p>When a child struggles to read, the first instinct is often to get them more reading practice. But for many children, the problem is not reading itself — it is the brain skill that makes reading possible: <strong>auditory processing</strong>.</p><h2>What is Auditory Processing?</h2><p>Auditory processing is the brain''s ability to hear, distinguish, and make sense of sounds. It includes skills like:</p><ul><li>Hearing the difference between similar sounds (e.g. /b/ and /d/)</li><li>Breaking words into individual sounds (auditory segmenting)</li><li>Blending sounds together to form words (auditory blending)</li><li>Identifying the order and number of sounds in a word</li></ul><p>These skills are the foundation of reading. Before a child can decode a written word, their brain must be able to process the sounds that word represents.</p><h2>Why Auditory Processing Affects Reading</h2><p>Reading is not a visual skill — it is an auditory skill that uses visual symbols. When a child sees the word "cat", their brain must connect the letters c-a-t to the sounds /k/ /a/ /t/ and blend them into a word. If auditory processing is weak, this connection breaks down.</p><p>This is why children with dyslexia often have no problem with spoken language but struggle significantly with written text. The issue is not intelligence — it is a specific gap in how the brain processes sound.</p><h2>How Cognigym Trains Auditory Processing</h2><p>The Cognigym program uses structured auditory procedures to train these skills directly. The Auditory Instruction Code (AIC) drills the 17 core sounds used in language. Auditory Segment Word (ASW) trains the brain to hear individual sounds within words. Auditory Blend Read (ABR) builds the ability to blend sounds into words for reading.</p><p>Every procedure is metronome-paced to build processing speed and embed skills automatically — so children do not just improve, they rewire.</p><p>If your child is struggling to read, the answer may not be more reading practice. It may be training the brain skill that reading depends on.</p>',
  'Cogniskills Team',
  'Learning & Development',
  1,
  CURRENT_TIMESTAMP
),
(
  'adhd-attention-is-trainable',
  'ADHD: Why Attention is a Trainable Brain Skill',
  'ADHD is often treated as a fixed condition. But attention is a cognitive skill — and like any skill, it can be trained.',
  '<p>When a child is diagnosed with ADHD, the conversation often turns immediately to medication or management strategies. But there is another approach that is less discussed: training attention as a cognitive skill.</p><h2>The Three Types of Attention</h2><p>Attention is not a single ability — it is three distinct skills:</p><ul><li><strong>Sustained attention</strong> — the ability to stay on task over time</li><li><strong>Selective attention</strong> — the ability to focus despite distractions</li><li><strong>Divided attention</strong> — the ability to handle two things at once</li></ul><p>Children with ADHD typically have weaknesses in one or more of these. The Cognigym program trains all three, starting at the child''s current level and systematically extending their capacity.</p><h2>The Focus Game</h2><p>One of the most effective Cognigym techniques for ADHD is what we call the focus game. We time exactly how long a child stays on task, tell them precisely what caused them to lose focus, and set a goal just beyond their current attention span. If they lose focus at 30 seconds, the goal becomes 35 seconds.</p><p>This incremental approach builds attention the same way physical training builds endurance — gradually, measurably, and permanently.</p><h2>The Role of the Metronome</h2><p>The metronome is central to every Cognigym session. It creates intensity, prevents mental breaks, and trains the brain to stay on task automatically. Children with ADHD often respond remarkably well to the structure and rhythm the metronome provides.</p><p>Attention is not fixed. With the right training, it can be built.</p>',
  'Cogniskills Team',
  'ADHD',
  1,
  CURRENT_TIMESTAMP
),
(
  'working-memory-school-performance',
  'Working Memory: The Hidden Driver of School Performance',
  'Working memory is one of the strongest predictors of academic success — yet most parents have never heard of it.',
  '<p>Ask most parents what cognitive skills matter for school, and they will mention intelligence, focus, or reading ability. Very few will mention working memory. Yet research consistently shows that working memory is one of the strongest predictors of academic achievement.</p><h2>What is Working Memory?</h2><p>Working memory is the brain''s ability to hold information in mind while using it. It is what allows a child to:</p><ul><li>Follow multi-step instructions without forgetting the earlier steps</li><li>Hold a math problem in mind while calculating the answer</li><li>Remember what they read at the start of a paragraph by the time they reach the end</li><li>Take notes while listening to a teacher</li></ul><p>Without strong working memory, learning becomes exhausting. The child has to re-read, re-ask, and re-process constantly — not because they are not trying, but because their brain cannot hold enough information at once.</p><h2>Signs of Weak Working Memory</h2><p>Children with weak working memory often appear inattentive or forgetful. They may:</p><ul><li>Forget instructions mid-task</li><li>Lose their place when reading</li><li>struggle with multi-step maths problems</li><li>Have difficulty copying from the board</li><li>Seem to understand in class but forget by homework time</li></ul><p>These children are often labelled as not trying hard enough. In reality, their brain is working very hard — it just does not have the capacity to hold everything it needs.</p><h2>Training Working Memory with Cognigym</h2><p>The Cognigym program includes specific procedures designed to build working memory capacity. Memory Divided Attention (MDA), Memory Computation Columns (MCC), and Memory Spatial Digits (MSD) all target different aspects of working memory, progressively increasing the load as the child''s capacity grows.</p><p>Working memory can be trained. And when it is, the effect on school performance is often dramatic.</p>',
  'Cogniskills Team',
  'Learning & Development',
  1,
  CURRENT_TIMESTAMP
);
