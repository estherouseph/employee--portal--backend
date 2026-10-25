# Employee Dashboard with Backend API

This project includes the supplied React/Vite frontend and an Express + MongoDB backend. The original frontend source files are preserved in this package.

## Requirements
- Node.js 18 or newer
- MongoDB Atlas cluster

## Install packages
From this folder, run:

```bash
npm install
```

## Configure MongoDB Atlas
1. Create a MongoDB Atlas cluster and a database user.
2. Under **Network Access**, allow your current IP address.
3. Open **Connect → Drivers** and copy the connection string.
4. Copy `.env.example` to `.env`.
5. Replace the placeholder `MONGODB_URI` with your real connection string and database name.
6. Keep `.env` private. Do not commit it to GitHub. If the password contains special characters, URL-encode them.

## Start the API
```bash
npm run server
```

The API listens on `http://localhost:5000` after a successful Atlas connection. `GET /` displays the available routes.

## CRUD endpoints

| Method | Endpoint | Result |
|---|---|---|
| GET | `/employees` | Return all employees |
| GET | `/employees/:id` | Return one employee by MongoDB ObjectId |
| POST | `/employees` | Create an employee |
| PUT | `/employees/:id` | Update an employee |
| DELETE | `/employees/:id` | Delete an employee |

Example JSON for `POST /employees`:

```json
{
  "name": "Alex Morgan",
  "email": "alex@example.com",
  "designation": "Software Engineer",
  "location": "Kochi, Kerala",
  "salary": 45000
}
```

The API returns MongoDB `_id` values; use the `_id` for GET, PUT, and DELETE by ID.

## Start the frontend
Open another terminal in this folder and run:

```bash
npm run dev
```

**Frontend integration status:** the supplied `src/pages/Home.jsx` still requests JSONPlaceholder and the supplied employee form still performs local validation only. Those frontend files have intentionally not been modified in this backend-only version. The API is available separately at `http://localhost:5000/employees`; connecting the UI to it would require frontend edits.

## Build frontend
```bash
npm run build
```

## MongoDB connection troubleshooting

- `MONGODB_URI is missing`: copy `.env.example` to `.env` and replace the placeholder URI.
- `bad auth` / `Authentication failed`: verify the Atlas **database user** and password (this is not necessarily your Atlas website login).
- `IP ... is not allowed` / `Server selection timed out`: in Atlas, open **Security → Network Access** and add your current IP address. Avoid `0.0.0.0/0` except as a temporary test and remove it afterward.
- `ENOTFOUND` / DNS errors: re-copy the connection string from Atlas and check your internet/DNS connection.
- If the password contains characters such as `@`, `:`, `/`, `?`, `#`, or `%`, URL-encode the password portion before putting it in the URI.
- Never paste your database password or full connection string into chat or commit `.env` to GitHub. Share only the error message after removing credentials.

The backend cannot be confirmed connected to your private Atlas cluster until you configure your own `.env` and run it in your environment. The supplied frontend files remain unchanged and currently use demo behavior; the REST API can be tested separately with the endpoints above.
