# Salon Application

A full-stack Salon Management application built with a modern React frontend and a Spring Boot microservices backend. The application is designed to manage salon bookings, services, payments, categories, and user profiles.

## 📁 Project Structure

The repository is divided into two main parts:
- `/frontend`: The React.js frontend web application.
- `/microservices`: The Spring Boot backend consisting of multiple microservices.

---

## 🚀 Architecture

### Frontend
The frontend is built as a Single Page Application (SPA) using modern web technologies to ensure a fast, responsive, and beautiful user interface.
- **Framework**: React 19 + Vite
- **Styling**: Material-UI (MUI), TailwindCSS
- **State Management**: Redux, Redux Thunk
- **Routing**: React Router DOM
- **Forms & Validation**: Formik, Yup
- **Networking**: Axios, WebSockets (SockJS, StompJS)
- **Charts**: Recharts

### Backend
The backend follows a strict Microservices Architecture. Services are decoupled, communicating through REST APIs and managed via an API Gateway and Service Discovery.
- **Core Framework**: Spring Boot, Java
- **API Gateway**: Spring Cloud Gateway
- **Service Discovery**: Spring Cloud Netflix Eureka
- **Database**: MySQL (Each service has its own independent database)
- **Containerization**: Docker & Docker Compose

#### Microservices Overview
- **User Service**: Manages user profiles and authentication.
- **Salon Service**: Manages salon information and business details.
- **Category Service**: Manages service categories.
- **Service Offering**: Manages specific services offered by the salon.
- **Booking Service**: Handles customer appointments and scheduling.
- **Payment Service**: Processes transactions and billing.
- **Review Service**: Manages customer reviews and feedback.
- **Notification Service**: Handles real-time messaging and alerts.

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Java Development Kit (JDK)](https://adoptium.net/) (Java 17 or higher)
- [Maven](https://maven.apache.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)

---

## 💻 Getting Started

### 1. Starting the Backend (Docker)
The easiest way to spin up the entire backend infrastructure (databases, API Gateway, Eureka, and microservices) is via Docker Compose.

```bash
# Navigate to the docker-compose directory
cd microservices/docker-compose/default

# Start all services in the background
docker-compose up -d
```
*Note: This will download the necessary Docker images and start the MySQL databases along with the backend services. The API Gateway will be available at `http://localhost:5000` and the Eureka Dashboard at `http://localhost:8070`.*

### 2. Starting the Frontend
```bash
# Navigate to the frontend directory
cd frontend

# Install Node dependencies
npm install

# Start the Vite development server
npm run dev
```

The frontend application will now be running and accessible at `http://localhost:5173`.

---

## 📡 Essential Endpoints
- **Frontend App**: `http://localhost:5173`
- **Backend API Gateway**: `http://localhost:5000`
- **Eureka Service Registry**: `http://localhost:8070`
