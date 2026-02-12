# Company Equipment Tracker

PART (A)

A production-level equipment tracking system built with React.js and Node.js, featuring role-based authentication, real-time request management, and a modern UI.

##  Tech Stack

### Frontend
- **React.js** (Vite) - Modern React framework
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client
- **React Router DOM** - Client-side routing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Sequelize ORM** - Database ORM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Helmet.js** - Security middleware

## 📁 Project Structure

```
company-equipment-tracker/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── context/         # React context
│   │   ├── hooks/           # Custom hooks
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   └── utils/           # Utility functions
│   ├── package.json
│   └── vite.config.js
├── server/                 # Node.js backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── package.json
│   └── server.js
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd company-equipment-tracker
```

### 2. Database Setup
Create a PostgreSQL database:
```sql
CREATE DATABASE equipment_tracker;
```

### 3. Backend Setup

Navigate to the server directory:
```bash
cd server
```

Install dependencies:
```bash
npm install
```

Create environment file:
```bash
cp .env.example .env
```

Update `.env` with your database credentials:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=equipment_tracker
DB_USER=postgres
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# Server Configuration
PORT=5000
NODE_ENV=development
```

Start the backend server:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

### 4. Frontend Setup

Navigate to the client directory:
```bash
cd client
```

Install dependencies:
```bash
npm install
```

Start the frontend development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:3000`

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Equipment
- `GET /api/equipment` - Get all equipment (protected)
- `GET /api/equipment/available` - Get available equipment (protected)
- `POST /api/equipment` - Create equipment (admin only)
- `PUT /api/equipment/:id` - Update equipment (admin only)
- `DELETE /api/equipment/:id` - Delete equipment (admin only)

### Requests
- `GET /api/requests` - Get all requests (admin only)
- `GET /api/requests/my-requests` - Get user requests (protected)
- `POST /api/requests` - Create request (protected)
- `PUT /api/requests/:id` - Update request status (admin only)

## 👥 User Roles

### User
- View available equipment
- Request equipment
- Track personal requests

### Admin
- All user permissions
- Add/Edit/Delete equipment
- View all requests
- Approve/Reject requests

## 🔐 Security Features

- **JWT Authentication** with HttpOnly cookies
- **Password Hashing** using bcryptjs
- **Role-Based Access Control (RBAC)**
- **CORS Configuration**
- **Helmet.js** for security headers
- **Input Validation** and sanitization
- **Error Handling** middleware

## 🎨 UI Features

- **Responsive Design** with Tailwind CSS
- **Modern Sidebar Navigation**
- **Real-time Updates**
- **Toast Notifications**
- **Loading States**
- **Error Handling**
- **Form Validation**

## 📊 Database Schema

### Users
- `id` (UUID, Primary Key)
- `name` (String)
- `email` (String, Unique)
- `password` (String, Hashed)
- `role` (Enum: admin, user)

### Equipment
- `id` (UUID, Primary Key)
- `name` (String)
- `category` (String)
- `description` (Text)
- `status` (Enum: available, unavailable)

### Requests
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key)
- `equipment_id` (UUID, Foreign Key)
- `status` (Enum: Pending, Approved, Rejected)
- `request_date` (DateTime)

## 🚀 Running in Production

### Backend Production Setup
1. Set `NODE_ENV=production` in your environment
2. Update CORS origin to your production domain
3. Use a production database
4. Set secure JWT secrets
5. Use HTTPS

### Frontend Production Setup
1. Build the frontend: `npm run build`
2. Serve static files with a web server
3. Configure environment variables

## 🧪 Testing

The application includes comprehensive error handling and validation. You can test the application by:

1. Creating an admin account
2. Adding equipment items
3. Creating user accounts
4. Making equipment requests
5. Approving/rejecting requests as admin

## 📝 Development Notes

- The backend uses Sequelize ORM with auto-sync enabled for development
- Frontend uses Vite for fast development and hot reload
- All API routes are protected with authentication middleware
- Admin routes have additional role-based protection
- The application follows RESTful API conventions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure PostgreSQL is running
   - Check database credentials in `.env`
   - Verify database exists

2. **CORS Issues**
   - Check frontend and backend URLs
   - Ensure CORS is properly configured

3. **Authentication Issues**
   - Clear browser cookies
   - Check JWT secret configuration
   - Verify token expiration

4. **Port Conflicts**
   - Change ports in `.env` files
   - Kill processes using the ports

### Getting Help

If you encounter issues:
1. Check the console logs
2. Verify environment configuration
3. Ensure all dependencies are installed
4. Check database connection

---
### Part (B) solution
Qno 1 --Issues Identified

(i).Unnecessary API Calls on Every Keystroke
The API request is triggered on every change in the input field. This leads to excessive network calls and poor performance, especially when users type quickly.

(ii).Unstable Keys in List Rendering
Using Math.random() as a React key causes keys to change on every render, breaking React’s reconciliation process and leading to unnecessary re-renders.

(iii).Lack of Error Handling & Request Cancellation

No error handling if the API fails

No cancellation of previous requests when the search term changes

Can cause race conditions and outdated results to appear
Qno 2--Refactor The Code

import { useEffect, useState } from "react";

const SearchUsers = () => {
  const [users, setUsers] = useState([]);
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!term.trim()) {
      setUsers([]);
      return;
    }

    const controller = new AbortController();
    const debounceTimer = setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://api.example.com/users?q=${term}`,
          { signal: controller.signal }
        );

        const data = await res.json();
        setUsers(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Failed to fetch users");
        }
      } finally {
        setLoading(false);
      }
    }, 400); // Debounce delay

    return () => {
      clearTimeout(debounceTimer);
      controller.abort();
    };
  }, [term]);

  return (
    <div>
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search users..."
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {users.map((u) => (
        <div key={u.id}>{u.name}</div>
      ))}
    </div>
  );
};

export default SearchUsers;

Qno 3 -- Improvements & Benefits
Debouncing API Calls
Prevents unnecessary requests on every keystroke, improving performance and reducing server load.

Stable Keys (u.id)
Enables React to efficiently re-render only the changed items, improving UI performance.

Request Cancellation (AbortController)
Prevents race conditions and avoids outdated API responses overriding newer results.

Error & Loading States
Improves reliability and user experience by handling failures gracefully and providing feedback during data fetch.


Part C – Backend Debug & Security (Node.js / Express)

Security Vulnerabilities & Bad Practices

(i).SQL Injection Vulnerability
User input (category) is directly concatenated into the SQL query string.
This allows attackers to inject malicious SQL (e.g., ?category=' OR 1=1 --).

(ii).Missing Authorization (Admin Access Not Enforced)
The route is meant for admin reports, but only verifyToken is used.
There is no role/permission check to ensure the user is actually an admin.

(iii).Poor Error Handling & Response Practices

Returning generic text responses ("No reports found") is inconsistent with JSON API standards

Error response "Check DB" is vague and does not provide structured error information

No proper HTTP status codes for empty results

(iv).No Input Validation
The category query param is not validated or sanitized before use.

Qno 2--Refactored Secure Code

app.get("/api/admin/reports", verifyToken, verifyAdmin, async (req, res) => {
  const { category } = req.query;

  if (!category) {
    return res.status(400).json({ error: "Category is required" });
  }

  try {
    const query = "SELECT * FROM reports WHERE category = $1";
    const result = await db.query(query, [category]);

    return res.status(200).json({
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("DB Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

Q no 3 -- Security & Reliability Improvements

Prevents SQL Injection
Using parameterized queries ($1) ensures user input is treated as data, not executable SQL.

Proper Authorization (Admin-Only Access)
verifyAdmin middleware ensures only authorized admin users can access sensitive reports.

Input Validation
Checks if category exists before querying the database, preventing unnecessary DB calls.

Consistent API Responses
Always returns structured JSON with proper HTTP status codes.

Safe Error Handling
Internal errors are logged on the server, while clients receive a generic error message to avoid leaking sensitive information.
