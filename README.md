# Zinvera IT Backend

`Production URL -` = https://zinvera.vercel.app/api/

# Credentials

- Admin: test.admin@gmail.com
- User: test.user@gmail.com

# English Documentation

## Overview

A comprehensive backend system for Zinvera IT Solutions, featuring user management, portfolio management, service listings, job postings, and job applications.

## Technologies

- TypeScript
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- Cloudinary for Media Storage
- Multer for File Handling
- Nodemailer for Email Services

## Data Models

### User Model

```typescript
{
  userName: string;
  email: string;
  image?: string;
  password: string;
  role?: 'user' | 'admin';
  position?: string;
  phone?: string;
  location?: string;
  jobType?: 'Full-time' | 'Part-time' | 'Internship';
  socialLinks?: string[];
  isBlocked?: boolean;
  isDeleted?: boolean;
}
```

### Portfolio Model

```typescript
{
  title: string;
  image: string;
  video: string;
  description: string;
  keyFeatured: string[];
  team: mongoose.Types.ObjectId[];
  techStack: string[];
  tags: string[];
  category: mongoose.Types.ObjectId;
  isDeleted?: boolean;
}
```

### Job Model

```typescript
{
  title: string;
  category: Schema.Types.ObjectId;
  description: string;
  keyFeatured: string[];
  experienceNeed: string[];
  skills: string[];
  companyName: string;
  location: string;
  employmentType: 'Full-time' | 'Part-time' | 'Internship';
  salary: number | string;
  Vacancy: number;
  status?: 'pending' | 'completed';
  isDeleted?: boolean;
  submissionDate: Date;
}
```

### Service Model

```typescript
{
  image: string;
  title: Schema.Types.ObjectId;
  description: string;
  keyFeatured: string[];
  benifits: string[];
  isDeleted?: boolean;
}
```

### Application Model

```typescript
{
  jobId: string
  jobTitle: string
  name: string
  email: string
  phone: string
  salaryExpectation: string
  githubUrl: string
  linkedinUrl: string
  portfolioUrl: string
  resumeLink: string
  location: string
  yearsOfExperience: string
  problemSolvingExperience: string
  whyHireYou: string
}
```

### Subscription Model

```typescript
{
  email: string;
  subscriptionType?: boolean;
}
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `DELETE /api/auth/logout` - User logout
- `POST /api/validToken` - Validate token

### User Management

- `GET /api/admin/users` - Get all users (Admin)
- `DELETE /api/admin/users/:userId` - Delete user (Admin)
- `PATCH /api/admin/users/:userId` - Block/Unblock user (Admin)
- `PATCH /api/user/:userId` - Update user profile
- `PATCH /api/update-password/:userId` - Update password
- `POST /api/forgot-password` - Request password reset
- `PATCH /api/reset-password/:userId` - Reset password with token

### Portfolio

- `POST /api/portfolio` - Create portfolio (Admin)
- `GET /api/portfolio` - Get all portfolios
- `GET /api/portfolio/:id` - Get single portfolio
- `PATCH /api/portfolio/:id` - Update portfolio (Admin)
- `DELETE /api/portfolio/:id` - Delete portfolio (Admin)

### Jobs

- `POST /api/job` - Create job posting (Admin)
- `GET /api/job` - Get all jobs
- `GET /api/job/:id` - Get single job
- `PATCH /api/job/:id` - Update job (Admin)
- `DELETE /api/job/:id` - Delete job (Admin)

### Job Applications

- `POST /api/application` - Submit job application
- `GET /api/application` - Get all applications (Admin)
- `GET /api/application/:id` - Get single application (Admin)
- `DELETE /api/application/:id` - Delete application (Admin)

### Services

- `POST /api/service` - Create service (Admin)
- `GET /api/service` - Get all services
- `GET /api/service/:id` - Get single service
- `PUT /api/service/:id` - Update service (Admin)
- `DELETE /api/service/:id` - Delete service (Admin)
- `patch /api/service/:id` - updateStatus service (Admin)

### Categories

- `POST /api/category` - Create category (Admin)
- `GET /api/category` - Get all categories
- `GET /api/category/:id` - Get single category
- `PUT /api/category/:id` - Update category (Admin)
- `DELETE /api/category/:id` - Delete category (Admin)

### Additional Content

- `POST /api/additional` - Add additional content (Admin)
- `GET /api/additional` - Get all additional content
- `GET /api/additional/:id` - Get single additional content
- `PUT /api/additional/:id` - Update additional content (Admin)
- `DELETE /api/additional/:id` - Delete additional content (Admin)

### Subscription

- `POST /api/subscription` - Request subscription
- `GET /api/subscription` - Get all subscriptions (Admin)
- `GET /api/subscription/:id` - Get single subscription (Admin)
- `PATCH /api/subscription/:subscriptionId` - Update subscription status (Admin)
- `DELETE /api/subscription/:subscriptionId` - Delete subscription (Admin)

## Features

### Authentication & Authorization

- JWT-based authentication with HTTP-only cookies
- Role-based access control (Admin/User)
- Token validation and refresh mechanism
- Password reset functionality with email

### File Handling

- Image upload support with Cloudinary
- File type validation
- Automatic cleanup of temporary files

### Security

- Password hashing with bcrypt
- Protected routes with middleware
- CORS configuration
- Input validation with Zod

### Error Handling

- Global error handler
- Custom error classes
- Validation error handling
- MongoDB error handling

### Query Features

- Search functionality
- Pagination
- Filtering
- Field selection
- Sorting

## Setup & Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env` file with required environment variables:
   ```env
   DATABASE_URL=
   PORT=
   NODE_ENV=
   BCRYPT_SALT=
   JWT_SECRET=
   CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=
   ```
4. Run development server: `npm run dev`
5. Build for production: `npm run build`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
