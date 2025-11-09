# Shunmugam Textiles - Web Application

A modern web application for Shunmugam Textiles built with React, Vite, and Tailwind CSS.

## Features

- 🏠 **Public Website**: Home, Products, About, and Contact pages
- 👨‍💼 **Admin Dashboard**: Manage supervisors, weavers, and products
- 📊 **Reports**: View and print receipts with product quantities
- 🔐 **Admin Authentication**: Secure admin login system
- 📱 **Responsive Design**: Mobile-friendly interface
- 🖼️ **Image Management**: Cloudinary integration for product images

## Tech Stack

- **Frontend**: React 19, Vite 7
- **Styling**: Tailwind CSS 4
- **Routing**: React Router DOM 7
- **Backend**: Firebase (Firestore, Authentication)
- **Image Storage**: Cloudinary
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase project (see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md))
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/shunmugam-web.git
   cd shunmugam-web
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
shunmugam-web/
├── public/                 # Static assets
│   ├── logo.jpg           # Company logo
│   ├── product*.jpg       # Product images
│   └── *.jpg              # Team member images
├── src/
│   ├── components/        # Reusable components
│   │   ├── Footer.jsx
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/             # Page components
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Login.jsx
│   │   └── admin/         # Admin pages
│   │       ├── Dashboard.jsx
│   │       ├── Supervisors.jsx
│   │       ├── Weavers.jsx
│   │       ├── Products.jsx
│   │       └── Reports.jsx
│   ├── firebase/          # Firebase configuration
│   │   └── config.js
│   ├── utils/             # Utility functions
│   │   └── cloudinary.js
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Entry point
├── render.yaml            # Render deployment config
└── package.json
```

## Deployment

### Deploy to Render

See [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md) for detailed deployment instructions.

**Quick Steps:**
1. Push code to GitHub/GitLab/Bitbucket
2. Create a new Web Service on Render
3. Connect your repository
4. Set environment variables
5. Deploy!

The `render.yaml` file is included for easy deployment configuration.

## Admin Access

- **URL**: `/login`
- **Default Credentials**: 
  - Username: `admin`
  - Password: `admin123`

> ⚠️ **Important**: Change the admin credentials in production!

## Firebase Collections

The application uses the following Firestore collections:

- `supervisors` - Supervisor accounts
- `weavers` - Weaver information
- `products` - Product catalog
- `receipts` - Receipt records

## Cloudinary Configuration

Product images are uploaded to Cloudinary. Configuration is in `src/utils/cloudinary.js`:

- Cloud Name: `dopkdyew2`
- Upload Preset: `Images`

## Features Overview

### Public Pages
- **Home**: Company introduction with product carousel
- **Products**: Display products from Firestore with filtering
- **About**: Company information and team members
- **Contact**: Contact details and Google Maps integration

### Admin Dashboard
- **Supervisors**: CRUD operations for supervisor accounts
- **Weavers**: CRUD operations for weaver records
- **Products**: Manage product catalog with image uploads
- **Reports**: View and print receipts with product quantities

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is proprietary software for Shunmugam Textiles.

## Support

For issues or questions, please contact the development team.

---

Built with ❤️ for Shunmugam Textiles
