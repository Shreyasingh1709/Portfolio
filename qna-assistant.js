// QnA Assistant Toggle Logic and Q&A
const aiKnowledgeBase = [
    { q: /hello|hi|hey/i, a: "Hello! How can I help you today?" },
    { q: /your name|who are you/i, a: "I'm your AI Assistant! I can answer questions about this portfolio or general topics." },
    { q: /who is shreya|tell me about shreya|her name|owner|portfolio owner|student name/i, a: "Shreya Kumari is a B.Tech Computer Science (AI & ML) student at Alliance University. She is passionate about artificial intelligence, machine learning, coding, and data analysis, and enjoys building innovative projects and participating in hackathons." },
    { q: /contact|email/i, a: "You can contact Shreya via the Contact section at the bottom of this page." },
    { q: /resume|cv/i, a: "You can download the resume from the Home section or the link at the top of this page." },
    { q: /projects?/i, a: "Check out the Projects section to see some of the latest work!" },
    { q: /skills?/i, a: "Skills include Python, C, AI, ML, Data Analysis, and more. See the Skills section for details." },
    { q: /university|college/i, a: "Shreya is a B.Tech CSE (AIML) student at Alliance University." },
    { q: /achievements?/i, a: "Achievements include hackathons, volunteering, and more. See the Achievements section." },
    { q: /certifications?/i, a: "Certifications from Microsoft, Oracle, NPTEL, and more are listed in the Certifications section." },
    { q: /internship|intern/i, a: "Internships include AI for Sustainability (IBM) and Infosys Springboard. See the Internships section." },
    { q: /what do you do|what is your field/i, a: "Shreya is a Computer Science student specializing in AI & ML, focusing on building intelligent and data-driven solutions." },
    { q: /what are your interests|what do you like/i, a: "She is interested in Artificial Intelligence, Machine Learning, Data Science, and building impactful tech projects." },
    { q: /any experience|do you have experience/i, a: "Yes! Shreya has worked on multiple projects, hackathons, and training programs related to AI and software development." },
    { q: /have you done any hackathons/i, a: "Yes, she has participated in SIH, Google Girls Hackathon, and Infosys Springboard Hackathon." },
    { q: /what projects have you made|tell me about your projects/i, a: "Shreya has worked on projects like AI-based waste management systems, healthcare analytics, and smart applications. Check the Projects section for details!" },
    { q: /which programming languages do you know/i, a: "She is comfortable with C, C++, Python, and also has knowledge of web technologies." },
    { q: /are you looking for a job|are you available for hire/i, a: "Yes, Shreya is open to internship and learning opportunities in AI, ML, and software development." },
    { q: /what makes you different|why should we hire you/i, a: "She combines strong technical skills with creativity, problem-solving, and real-world project experience in AI and data-driven systems." },
    { q: /what tools do you use/i, a: "She works with tools like Python, MySQL, ML libraries, and platforms like HackerRank, Sololearn, and more." },
    { q: /how can i reach you|how to contact you/i, a: "You can reach out through the Contact section below for collaborations or opportunities." },
    { q: /do you work on ai|machine learning/i, a: "Yes! AI and Machine Learning are her core areas of interest and she actively builds projects in these domains." },
    { q: /tell me something about yourself/i, a: "Shreya is a passionate AI & ML student who enjoys solving real-world problems using technology and continuously improving her skills." },
    { q: /what are your strengths/i, a: "Her strengths include problem-solving, coding, analytical thinking, and a strong willingness to learn new technologies." },
    { q: /do you have leadership experience/i, a: "Yes, she has mentored in SDG programs and actively participated in organizing and volunteering activities." },
    { q: /can i collaborate with you|open to collaboration/i, a: "Absolutely! Shreya is open to collaborating on interesting tech projects and ideas." },
    { q: /what is your goal|career goal/i, a: "Her goal is to build impactful AI-driven solutions and grow as a skilled software engineer in the tech industry." },
    { q: /are you a fresher/i, a: "Yes, she is currently a student but has strong project and practical experience." },
    { q: /what kind of projects do you like/i, a: "She enjoys working on AI-based, data-driven, and real-world problem-solving projects." },
    { q: /do you know web development/i, a: "Yes, she has basic knowledge of web development and is building full-stack projects." },
    { q: /thank(s| you)/i, a: "You're welcome! 😊" },
    { q: /bye|goodbye/i, a: "Goodbye! Have a great day! 👋" },
    { q: /help/i, a: "You can ask me about Shreya's skills, projects, education, or experience!" },
    // Add more Q&A pairs as needed
];

function qnaFindAnswer(userMsg) {
  for (const pair of aiKnowledgeBase) {
    if (pair.q.test(userMsg)) return pair.a;
  }
  return "Sorry, I don't know the answer to that. Try asking about projects, skills, or contact info!";
}

function qnaAddMessage(msg, sender) {
  const chatBody = document.getElementById('qna-chat-body');
  const msgDiv = document.createElement('div');
  msgDiv.className = sender === 'user' ? 'user-msg' : 'ai-msg';
  msgDiv.textContent = msg;
  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function qnaHandleSend() {
  const input = document.getElementById('qna-chat-input');
  const userMsg = input.value.trim();
  if (!userMsg) return;
  qnaAddMessage(userMsg, 'user');
  input.value = '';
  setTimeout(() => {
    const answer = qnaFindAnswer(userMsg);
    qnaAddMessage(answer, 'ai');
  }, 400);
}

// Toggle logic
const qnaToggleBtn = document.getElementById('qna-assistant-toggle');
const qnaPanel = document.getElementById('qna-assistant-panel');
const qnaCloseBtn = document.getElementById('qna-assistant-close');

function toggleQnAPanel(show) {
  if (show === undefined) {
    qnaPanel.classList.toggle('active');
    qnaToggleBtn.classList.toggle('active');
  } else if (show) {
    qnaPanel.classList.add('active');
    qnaToggleBtn.classList.add('active');
  } else {
    qnaPanel.classList.remove('active');
    qnaToggleBtn.classList.remove('active');
  }
  // Focus input if opening
  if (qnaPanel.classList.contains('active')) {
    setTimeout(() => {
      document.getElementById('qna-chat-input').focus();
    }, 350);
  }
}

qnaToggleBtn.addEventListener('click', () => {
  toggleQnAPanel();
});
qnaCloseBtn.addEventListener('click', () => {
  toggleQnAPanel(false);
});
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && qnaPanel.classList.contains('active')) {
    toggleQnAPanel(false);
  }
});
const chatBody = document.getElementById('qna-chat-body');
const observer = new MutationObserver(() => {
  chatBody.scrollTop = chatBody.scrollHeight;
});
observer.observe(chatBody, { childList: true });
function handleResize() {
  if (window.innerWidth < 600 && qnaPanel.classList.contains('active')) {
    qnaToggleBtn.style.display = 'none';
  } else {
    qnaToggleBtn.style.display = '';
  }
}
window.addEventListener('resize', handleResize);
handleResize();
qnaPanel.addEventListener('transitionend', handleResize);
// Send button and Enter key
const sendBtn = document.getElementById('qna-chat-send');
const input = document.getElementById('qna-chat-input');
if (sendBtn && input) {
  sendBtn.addEventListener('click', qnaHandleSend);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') qnaHandleSend();
  });
}
// Hide panel on load
window.addEventListener('DOMContentLoaded', function () {
  document.getElementById('qna-assistant-panel')?.classList.remove('active');
});
