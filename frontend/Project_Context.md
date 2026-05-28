Enterprise Customer Management System Project Prompt

Your job is to act as a senior full-stack architect and produce beginner-friendly, reusable, scalable, and enterprise-grade solutions.

The goal is to build a professional customer management module using:

Django
Django REST Framework (DRF)
React
React Router DOM
Axios
Tailwind CSS
Framer Motion

This project will integrate into an already-existing enterprise authentication platform that includes:

JWT authentication
Role-based authorization
Protected routes
Sidebar dashboard architecture
Enterprise session management

The focus of THIS project is:

📌 Customer Management Architecture

Including:

Create customer
Update customer
Delete customer
Search customer
Filter customer
Customer detail page
Enterprise dashboard layout
Reusable React hooks
API service architecture
Scalable frontend/backend structure
🔥 PROJECT GOALS

Build a reusable enterprise customer management system suitable for:

insurance management systems
CRM systems
ERP dashboards
client management platforms
customer service portals
internal management software

The application should follow:

✅ enterprise architecture
✅ scalable folder structure
✅ reusable hooks/components
✅ clean API design
✅ beginner-friendly explanations
✅ production-style patterns

🎯 TECH STACK
Backend
Django
Django REST Framework
PostgreSQL-ready architecture
JWT authentication integration
Frontend
React
React Router DOM
Axios
Tailwind CSS
Framer Motion
React Hot Toast
🧱 DJANGO PROJECT STRUCTURE
backend/
│
├── manage.py
│
├── config/
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
│
├── authentication/
│
├── customers/
│   ├── migrations/
│   │
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   ├── filters.py
│   ├── services.py
│   ├── permissions.py
│   ├── admin.py
│   └── apps.py
│
├── common/
│   ├── utils.py
│   ├── pagination.py
│   └── permissions.py
🔥 DJANGO FEATURES TO IMPLEMENT
Customer Model

Create a Customer model with:

first_name
last_name
email
phone
date_of_birth
address
city
state
zip_code
status
created_at
updated_at
created_by
Customer Status Choices
ACTIVE = "active"
INACTIVE = "inactive"
LEAD = "lead"
Backend Features

Implement:

✅ create customer
✅ update customer
✅ delete customer
✅ retrieve customer
✅ list customers
✅ search customers
✅ filter customers
✅ pagination
✅ sorting

API Endpoints
Customer Endpoints
GET     /api/customers/
POST    /api/customers/
GET     /api/customers/:id/
PUT     /api/customers/:id/
DELETE  /api/customers/:id/
Search & Filter Features

Support:

?search=john
?status=active
?city=miami
?ordering=last_name

Use:

DjangoFilterBackend
SearchFilter
OrderingFilter
Permissions

Protect endpoints with:

IsAuthenticated

Optional role permissions:

IsAdminUserRole
IsAgentUserRole
Serializer Requirements

Validate:

email uniqueness
phone format
required fields

Include clean error handling.

Logging Requirements

Use:

logger.error()
logger.info()

Log:

customer creation
updates
deletes
failed validations
🌐 REACT PROJECT STRUCTURE
frontend/
│
├── src/
│   │
│   ├── animations/
│   │   └── motionVariants.js
│   │
│   ├── components/
│   │   │
│   │   ├── customers/
│   │   │   ├── CustomerCard.jsx
│   │   │   ├── CustomerForm.jsx
│   │   │   ├── CustomerList.jsx
│   │   │   ├── CustomerSearch.jsx
│   │   │   ├── CustomerFilters.jsx
│   │   │   └── CustomerTable.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Topbar.jsx
│   │
│   ├── hooks/
│   │   ├── useCustomers.js
│   │   ├── useCustomerSearch.js
│   │   └── useDebounce.js
│   │
│   ├── lib/
│   │   └── axiosClient.js
│   │
│   ├── pages/
│   │   ├── DashboardPage.jsx
│   │   ├── CustomersPage.jsx
│   │   ├── CustomerDetailPage.jsx
│   │   ├── CreateCustomerPage.jsx
│   │   └── EditCustomerPage.jsx
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx
│   │
│   ├── services/
│   │   └── customerService.js
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── config/
│   │   └── navigation.js
│   │
│   ├── styles/
│   │   └── tailwind.css
│   │
│   ├── App.js
│   └── main.jsx
🔥 FRONTEND FEATURES TO IMPLEMENT
Dashboard Layout

Use enterprise layout:

✅ Sidebar
✅ Topbar
✅ Main content area

Sidebar Navigation

Include:

Dashboard
Customers
Create Customer

Use role-aware navigation architecture.

Customers Page Features

Implement:

✅ customer table
✅ search bar
✅ filters
✅ pagination
✅ loading states
✅ empty states
✅ animated transitions

Customer Search

Use:

Axios
custom hooks
debounced search

Example:

search by:
- first name
- last name
- email
- phone
Customer Filters

Allow filtering by:

status
city
state
Custom React Hooks

Create reusable hooks:

useCustomers()

Handles:

fetching customers
loading states
errors
pagination
useCustomerSearch()

Handles:

debounced searching
query management
filter state
useDebounce()

Reusable debounce hook for enterprise search systems.

Axios Service Layer

Create:

customerService.js

Encapsulate:

getCustomers()
createCustomer()
updateCustomer()
deleteCustomer()
searchCustomers()
Tailwind CSS Requirements

Use:

responsive dashboard design
enterprise card layouts
modern table styling
clean spacing
reusable utility classes
Framer Motion Requirements

Use animations for:

✅ page transitions
✅ fade-in tables
✅ modal animations
✅ hover interactions
✅ sidebar transitions

Customer Form Features

Implement:

✅ reusable form component
✅ validation errors
✅ loading states
✅ success toasts
✅ update mode + create mode

Customer Detail Page

Display:

customer information
contact info
status
creation metadata

Future-ready for:

policies
claims
notes
payments
documents
ERROR HANDLING REQUIREMENTS

Frontend must handle:

API failures
empty searches
validation errors
network issues
unauthorized access

Backend must handle:

invalid payloads
missing fields
permission denial
database validation errors
UI/UX REQUIREMENTS

Design should feel like:

✅ enterprise CRM
✅ insurance dashboard
✅ SaaS management portal

Use:

Tailwind CSS
Framer Motion
responsive layouts
professional tables
reusable cards
clean forms
CODING STYLE REQUIREMENTS
Beginner-friendly
Enterprise structured
Reusable architecture
Clear explanations
Helpful comments explaining WHY
Avoid unnecessary complexity
Follow scalable patterns
OUTPUT REQUIREMENTS

Structure all responses into:

Project Directory Blueprint
Django Backend Implementation
React Frontend Implementation
API Architecture
Customer CRUD System
Search & Filter System
Custom Hooks Architecture
Dashboard Layout System
Tailwind + Framer Motion Integration
Enterprise Best Practices
Recommended Next Enterprise Phase