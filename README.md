# Gita-Fy

A full-stack web app for exploring the **Bhagavad Gita** in an interactive way.  
This project includes both a frontend and backend to provide users with meaningful access to verse content and search / playback features.

🔗 Live Demo: https://gita-fy.vercel.app 

---

## 📍 Overview

**Gita-Fy** is a platform that makes accessing the **Bhagavad Gita** easier and more engaging. The application allows users to:

- Search scripture text
- Browse chapters and verses
- View verse translations
- Possibly listen to audio (if implemented)
- Explore teachings in a structured way

> It’s a complete stack app, with a **backend API** serving data and a **frontend UI** consuming it.

---

## 🧠 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React / Next.js (if applicable) |
| Backend | Node.js / Express |
| Database | (Specify if used, e.g., SQLite / MongoDB / JSON) |
| Deployment | Vercel (front), (backend host) |
| Languages | JavaScript, CSS, HTML |

*(Adjust the above based on what’s in `package.json` and your actual tech used.)*

---

## 📁 Project Structure

Gita-Fy/
├── gita-fy/ # Frontend app
├── gita-fy-backend/ # API server
├── .gitignore
├── package.json
├── README.md
└── ...


---

## 🚀 Getting Started

### Clone the Repo

```bash
git clone https://github.com/yashsahane-eng/Gita-Fy.git
cd Gita-Fy
⚙ Backend Setup
cd gita-fy-backend
npm install
Create a .env (if required) with your configuration:

PORT=5000
DB_URL=<your database>
API_KEY=<if needed>
Start the backend:

npm run dev
🛠 Frontend Setup
cd gita-fy
npm install
Start dev server:

npm run dev
Open http://localhost:3000 in your browser.

🧑‍💻 Features
✔ Lookup Bhagavad Gita chapters & verses
✔ Search verses by keywords
✔ Clean, responsive UI
✔ API-driven backend
✔ Easy deployment on Vercel / Node host

📌 Screenshots
<img width="1356" height="650" alt="Screenshot 2025-09-20 103254" src="https://github.com/user-attachments/assets/023c1620-f083-4815-8cbf-4a91923775ab" />
<img width="1364" height="653" alt="Screenshot 2025-09-20 020637" src="https://github.com/user-attachments/assets/b2f309e4-1de0-4d2f-ad06-71623ed97dd1" />

<img width="853" height="397" alt="Screenshot 2025-09-20 025545" src="https://github.com/user-attachments/assets/8ea66689-aac8-43b0-85b6-c9921c0f2e81" />

<img width="969" height="583" alt="image" src="https://github.com/user-attachments/assets/665da12b-62ad-4c67-8dd7-5a8ff1e1e420" />
<img width="620" height="605" alt="image" src="https://github.com/user-attachments/assets/c8f34818-3581-4ed9-9e2b-55f167142a26" />
<img width="603" height="726" alt="image" src="https://github.com/user-attachments/assets/33a67394-2bcb-4043-bd27-453727afef3e" />
<img width="1414" height="862" alt="image" src="https://github.com/user-attachments/assets/a1d0a161-1b79-4dec-a2f6-8c150099dcff" />

🛠️ Built With

React.js

Node.js / Express

CSS / Tailwind / Styled Components

(Database) — if used

📍 Environment Variables


NEXT_PUBLIC_API_URL=http://localhost:5000/api
JWT_SECRET=yourSecret

📜 API Endpoints

(Add actual API routes here)

Method	Endpoint	Description
GET	/api/chapters	List all chapters
GET	/api/verse/:id	Fetch a verse
GET	/api/search?q=	Search verses
📌 Live Demo

Try it live:

👉 https://gita-fy.vercel.app



👤 Author

Yash Sahane
GitHub: https://github.com/yashsahane-eng

🧩 License

This project is licensed under the MIT License — see the LICENSE file for details.

❤️ Contribute

Want to help build features? Great!
Fork → Branch → PR → Review → Merge

