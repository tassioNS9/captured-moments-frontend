# Captured Moments Frontend

A web application that allows users to register and preserve their travel memories by creating digital records of their journeys, including photos, stories, and locations visited.

## 🚀 Technologies

This project is built with:

- [React](https://reactjs.org/) - Frontend library
- [TypeScript](https://www.typescriptlang.org/) - Programming language
- [Vite](https://vitejs.dev/) - Build tool and development environment
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Axios](https://axios-http.com/) - HTTP client
- [React Router DOM](https://reactrouter.com/) - Routing
- [React Modal](https://reactcommunity.org/react-modal/) - Modal component
- [React Icons](https://react-icons.github.io/react-icons/) - Icon components
- [React Day Picker](https://react-day-picker.js.org/) - Date picker component
- [React Toastify](https://fkhadra.github.io/react-toastify/) - Toast notifications

## 🔧 Setup

1. Clone the repository:
```bash
git clone https://github.com/tassioNS9/captured-moments-frontend.git
cd captured-moments-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 🏗️ Project Structure

```
src/
  ├── api/           # API configuration and instances
  ├── assets/        # Static assets (images, svgs)
  ├── components/    # Reusable components
  ├── pages/         # Application pages/routes
  └── utils/         # Utility functions and helpers
```

## 🎯 Features

- User authentication (login/signup)
- Create, view, edit and delete travel memories
- Add photos to travel memories
- Add location tags
- Mark memories as favorites
- Filter memories by date range
- Toast notifications for user feedback

## 📝 Environment Variables

Create a `.env` file in the root directory with:

```
VITE_API_BASE_URL=your_api_base_url
```

## 📦 Build

To build the project for production:

```bash
npm run build
```
