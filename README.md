# Company Equipment Tracker

A production-level equipment tracking system built with React.js and Node.js, featuring role-based authentication, real-time request management, and a modern UI.

## 🚀 Tech Stack

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

**Built with ❤️ for internship submission**
