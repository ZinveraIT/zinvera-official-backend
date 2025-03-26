# Zinvera IT Backend

`Production URL -` = https://zinvera.vercel.app/api/

# creadiantial

admin = test.admin@gmail.com
user = test.user@gmail.com

# English Documentation

## Overview

A comprehensive backend system for Zinvera IT Solutions, featuring user management, portfolio management, service listings, and job postings.

## Technologies

- TypeScript
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- Cloudinary for Media Storage
- Multer for File Handling

## Data Models

### User Model

```typescript
{
  userName: string;
  email: string;
  image: string;
  password: string;
  role: "admin" | "user";
  position: string;
  phone: string;
  location: string;
  socialLinks: string[];
  isBlocked: boolean;
  isDeleted: boolean;
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
  team: ObjectId[];
  techStack: string[];
  tags: string[];
  category: ObjectId;
  isDeleted: boolean;
}
```

### Job Model

```typescript
{
  title: string;
  category: ObjectId;
  description: string;
  keyFeatured: string[];
  experienceNeed: string[];
  skills: string[];
  companyName: string;
  location: string;
  employmentType: "Full-time" | "Part-time" | "Internship";
  salary: number | string;
  Vacancy: number;
  status: "pending" | "completed";
  submissionDate: Date;
}
```

### Service Model

```typescript
{
  image: string;
  title: ObjectId;
  description: string;
  keyFeatured: string[];
  benifits: string[];
  isDeleted: boolean;
}
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### User Management

- `GET /api/admin/users` - Get all users (Admin)
- `DELETE /api/admin/users/:userId` - Delete user (Admin)
- `PATCH /api/admin/users/:userId` - Block/Unblock user (Admin)
- `PATCH /api/user/:userId` - Update user profile
- `PATCH /api/update-password/:userId` - Update password

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

### Services

- `POST /api/service` - Create service (Admin)
- `GET /api/service` - Get all services
- `GET /api/service/:id` - Get single service
- `PUT /api/service/:id` - Update service (Admin)
- `DELETE /api/service/:id` - Delete service (Admin)

### Categories

- `POST /api/category` - Create category (Admin)
- `GET /api/category` - Get all categories
- `GET /api/category/:id` - Get single category
- `PUT /api/category/:id` - Update category (Admin)
- `DELETE /api/category/:id` - Delete category (Admin)

### Subscription

- `POST /api/subscription` - Request subscription
- `GET /api/subscription` - Get all subscriptions (Admin)
- `PATCH /api/subscription/:subscriptionId` - Update subscription status (Admin)

## Authentication & Authorization

- JWT-based authentication
- Role-based access control (Admin/User)
- File upload with Cloudinary integration

---

# বাংলা ডকুমেন্টেশন

## পরিচিতি

জিনভেরা আইটি সলিউশন্সের জন্য একটি পূর্ণাঙ্গ ব্যাকএন্ড সিস্টেম, যার মধ্যে রয়েছে ইউজার ম্যানেজমেন্ট, পোর্টফোলিও ম্যানেজমেন্ট, সার্ভিস লিস্টিং এবং জব পোস্টিং।

## প্রযুক্তি

- টাইপস্ক্রিপ্ট
- নোড.জেএস এবং এক্সপ্রেস.জেএস
- মঙ্গোডিবি এবং মঙ্গুস
- জেডব্লিউটি অথেনটিকেশন
- ক্লাউডিনারি মিডিয়া স্টোরেজ
- মাল্টার ফাইল হ্যান্ডলিং

## ডাটা মডেল

### ইউজার মডেল

```typescript
{
  userName: string; // ইউজারনেম
  email: string; // ইমেইল
  image: string; // ছবি
  password: string; // পাসওয়ার্ড
  role: "admin" | "user"; // রোল
  position: string; // পজিশন
  phone: string; // ফোন
  location: string; // লোকেশন
  socialLinks: string[]; // সোশ্যাল লিংক
  isBlocked: boolean; // ব্লক স্টেটাস
  isDeleted: boolean; // ডিলিট স্টেটাস
}
```

### পোর্টফোলিও মডেল

```typescript
{
  title: string;
  image: string;
  video: string;
  description: string;
  keyFeatured: string[];
  team: ObjectId[];
  techStack: string[];
  tags: string[];
  category: ObjectId;
  isDeleted: boolean;
}
```

### জব মডেল

```typescript
{
  title: string;
  category: ObjectId;
  description: string;
  keyFeatured: string[];
  experienceNeed: string[];
  skills: string[];
  companyName: string;
  location: string;
  employmentType: "Full-time" | "Part-time" | "Internship";
  salary: number | string;
  Vacancy: number;
  status: "pending" | "completed";
  submissionDate: Date;
}
```

### সার্ভিস মডেল

```typescript
{
  image: string;
  title: ObjectId;
  description: string;
  keyFeatured: string[];
  benifits: string[];
  isDeleted: boolean;
}
```

## এপিআই এন্ডপয়েন্ট

### অথেনটিকেশন

- `POST /api/auth/register` - নতুন ইউজার রেজিস্টার
- `POST /api/auth/login` - ইউজার লগইন

### ইউজার ম্যানেজমেন্ট

- `GET /api/admin/users` - সকল ইউজার দেখুন (এডমিন)
- `DELETE /api/admin/users/:userId` - ইউজার ডিলিট (এডমিন)
- `PATCH /api/admin/users/:userId` - ইউজার ব্লক/আনব্লক (এডমিন)
- `PATCH /api/user/:userId` - ইউজার প্রোফাইল আপডেট
- `PATCH /api/update-password/:userId` - পাসওয়ার্ড আপডেট

### পোর্টফোলিও

- `POST /api/create-portfolio` - পোর্টফোলিও তৈরি (এডমিন)
- `GET /api/get-portfolio` - সকল পোর্টফোলিও দেখুন
- `GET /api/get-portfolio/:id` - একক পোর্টফোলিও দেখুন
- `PATCH /api/update-portfolio/:id` - পোর্টফোলিও আপডেট (এডমিন)
- `DELETE /api/delete-portfolio/:id` - পোর্টফোলিও ডিলিট (এডমিন)

### জব

- `POST /api/create-Job` - জব পোস্ট তৈরি (এডমিন)
- `GET /api/get-Job` - সকল জব দেখুন
- `GET /api/get-Job/:id` - একক জব দেখুন
- `PATCH /api/update-Job/:id` - জব আপডেট (এডমিন)
- `DELETE /api/delete-Job/:id` - জব ডিলিট (এডমিন)

### সার্ভিস

- `POST /api/service` - সার্ভিস তৈরি (এডমিন)
- `GET /api/service` - সকল সার্ভিস দেখুন
- `GET /api/service/:id` - একক সার্ভিস দেখুন
- `PUT /api/service/:id` - সার্ভিস আপডেট (এডমিন)
- `DELETE /api/service/:id` - সার্ভিস ডিলিট (এডমিন)

### ক্যাটাগরি

- `POST /api/category` - ক্যাটাগরি তৈরি (এডমিন)
- `GET /api/category` - সকল ক্যাটাগরি দেখুন
- `GET /api/category/:id` - একক ক্যাটাগরি দেখুন
- `PUT /api/category/:id` - ক্যাটাগরি আপডেট (এডমিন)
- `DELETE /api/category/:id` - ক্যাটাগরি ডিলিট (এডমিন)

### সাবস্ক্রিপশন

- `POST /api/subscription` - সাবস্ক্রিপশন রিকুয়েস্ট
