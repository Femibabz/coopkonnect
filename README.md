# Coopkonnect - Society Management Platform

A comprehensive web application for managing cooperative societies, built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

### 🏢 Society Management
- Complete society dashboard with member management
- Application system with accept/reject functionality
- Email notifications for member communications
- Password setup flows for new members
- Document viewing and management

### 👥 Member Management
- Member registration and onboarding
- Role-based access control (Admin/Society/Member)
- Account activation with secure tokens
- Member invitation system

### 📊 Admin Dashboard
- Document viewing with download functionality
- Society oversight and management
- Application monitoring and approval workflows
- Comprehensive reporting features

### 🎨 Modern UI/UX
- Responsive design that works on all devices
- Clean, professional interface using shadcn/ui components
- Intuitive navigation and user experience
- Modern design patterns and accessibility features

## Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Runtime:** Bun
- **Deployment:** Netlify

## Getting Started

### Prerequisites
- Node.js 18+ or Bun
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Femibabz/coopkonnect.git
cd coopkonnect
```

2. Install dependencies:
```bash
bun install
```

3. Start the development server:
```bash
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Demo Credentials

### Society Login
- **Email:** president@lagoseducators.coop
- **Password:** president123

### Admin Login
- **Email:** admin@coopkonnect.com
- **Password:** admin123

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard
│   ├── society/           # Society management
│   ├── login/             # Authentication
│   └── activate-account/  # Account activation
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── layout/           # Layout components
├── contexts/             # React contexts
├── lib/                 # Utilities and services
└── globals.css          # Global styles
```

## Key Features Explained

### Authentication System
- Mock authentication for demo purposes
- Role-based routing and access control
- Secure token-based account activation

### Society Dashboard
- Member application management
- Accept/reject workflows with email notifications
- Member invitation system
- Document management

### Admin Dashboard
- Society oversight
- Document viewing and download
- Comprehensive reporting

## Development

### Available Scripts
- `bun dev` - Start development server
- `bun build` - Build for production
- `bun start` - Start production server
- `bun lint` - Run linting

### Code Quality
- TypeScript for type safety
- Biome for code formatting and linting
- ESLint configuration
- Tailwind CSS for consistent styling

## Deployment

The application is configured for deployment on Netlify with:
- Automatic builds from the main branch
- Environment variable support
- Static site generation

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the GitHub repository.

---

Built with ❤️ using Next.js and TypeScript
