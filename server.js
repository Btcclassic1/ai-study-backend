const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// डमी डेटाबेस (UPSC और NEET के प्रीमियम हिंग्लिश सवाल)
const database = {
  history: [
    {
      q: "Vijayanagar Empire ke kis famous ruler ne Telugu me 'Amuktamalyada' text ki rachna ki thi?",
      options: ["A) Harihara II", "B) Deva Raya II", "C) Krishnadeva Raya", "D) Achyuta Raya"],
      correct: 2,
      exp: "Krishnadeva Raya ne Telugu language me state governance par 'Amuktamalyada' likha tha."
    }
  ],
  polity: [
    {
      q: "Indian Constitution ka kaun sa Article 'Right to Constitutional Remedies' se related hai?",
      options: ["A) Article 21", "B) Article 32", "C) Article 44", "D) Article 226"],
      correct: 1,
      exp: "Article 32 ko Dr. B.R. Ambedkar ne samvidhan ka heart aur soul kaha tha."
    }
  ]
};

// API: Subject ke hisab se questions dena
app.get('/api/questions', (req, res) => {
    const subject = req.query.subject || 'history';
    if (database[subject]) {
        res.json(database[subject]);
    } else {
        res.json(database['history']);
    }
});

// API: 23-घंटे का साइकिल लॉक और स्कोर सबमिट करना
app.post('/api/submit-score', (req, res) => {
    const { userId, subject, score } = req.body;
    console.log(`User ${userId} completed ${subject} with score ${score}`);
    res.json({ 
        success: true, 
        nextCycleAvailable: Date.now() + (23 * 60 * 60 * 1000)
    });
});

app.listen(PORT, () => {
    console.log(`Server is running live on port ${PORT}`);
});
