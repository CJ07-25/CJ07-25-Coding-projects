# HW2 — Express + MongoDB (CRUD + 8 Questions)

## 1) Install & Run
```bash
npm install
cp .env.example .env
# edit .env if needed
npm run seed   # seeds from data/data-1.json
npm run dev    # starts the server on PORT (default 3000)
```

## 2) CRUD (via Postman or curl)
```bash
# Create
curl -X POST http://localhost:3000/api/cities   -H 'Content-Type: application/json'   -d '{"city":"Springfield","population":150000,"growthRate":2.5,"density":1200,"averageAge":35.6}'

# Read all
curl http://localhost:3000/api/cities

# Read one (replace :id)
curl http://localhost:3000/api/cities/:id

# Update
curl -X PUT http://localhost:3000/api/cities/:id   -H 'Content-Type: application/json'   -d '{"growthRate": 3.2}'

# Delete
curl -X DELETE http://localhost:3000/api/cities/:id
```

## 3) Eight Question Endpoints
```bash
curl http://localhost:3000/questions/q1-fastest-growing
curl http://localhost:3000/questions/q2-largest-population
curl http://localhost:3000/questions/q3-highest-density
curl http://localhost:3000/questions/q4-youngest-city
curl http://localhost:3000/questions/q5-oldest-city
curl http://localhost:3000/questions/q6-top5-densest
curl http://localhost:3000/questions/q7-weighted-average-age
curl http://localhost:3000/questions/q8-density-growth-corr
```

All endpoints return JSON like:
```json
{
  "question": "What is the fastest growing city?",
  "answer": "Springfield",
  "value": 2.5
}
```

## 4) Testing (Jest)
```bash
npm test
```

## 5) Notes
- The dataset must include fields: `city`, `population`, `growthRate` (in %), `density` (people/km²), `averageAge`.
- If your HW1 had different fields, adjust `models/City.js` + the seed script accordingly.
- If your HW1’s “eight questions” differ, re-map them inside `controllers/questionController.js`.
- https://github.com/CJ07-25/CJ07-25-Coding-projects
