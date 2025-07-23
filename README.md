# Fact1 - Formula 1 Race Tracker 🏁

A modern, responsive Formula 1 application built with Vue 3 that provides real-time race information, driver standings, team standings, and race calendars.

## ✨ Features

- **📅 Race Calendar** - View upcoming and past F1 races with circuit information
- **🏆 Driver Standings** - Current championship standings with driver photos and team colors
- **🏁 Team Standings** - Constructor championship standings with team logos and branding
- **🏃‍♂️ Race Details** - Detailed race information including sprint races
- **📱 Responsive Design** - Optimized for desktop and mobile devices
- **🎨 Modern UI** - Built with Tailwind CSS and PrimeVue components

## 📋 Upcoming Features (TODO)

- **🏆 Team Standings Redesign** - Update team standings to fit the overall design
- **🖼️ Missing Assets** - Add missing circuit SVGs and circuit banners
- **⚙️ Settings Tab** - Customize language, units, and display mode (light/dark)
- **👤 Driver Detail Pages** - Individual driver profiles and statistics
- **🏁 Race Results** - Show top 3 results for past races
- **🌤️ Weather Forecast** - Weather predictions for upcoming races
- **⚖️ Driver Comparison** - Compare drivers per circuit performance
- **💻 Desktop Enhancement** - Make the interface more visually appealing for desktop users

## 🛠️ Tech Stack

- **Frontend**: Vue 3 with Composition API
- **Language**: TypeScript
- **Build Tool**: Vite
- **State Management**: Pinia
- **Styling**: Tailwind CSS
- **UI Components**: PrimeVue
- **HTTP Client**: Axios
- **Routing**: Vue Router
- **Internationalization**: Vue I18n

## 🚀 Getting Started

### Prerequisites

- Node.js 22 or higher
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/goodoomens/fact1-app.git
cd fact1-app
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:check` - Type-check and build
- `npm run preview` - Preview production build

## 🏗️ Project Structure

```
src/
├── assets/         # Static assets (images, logos, flags)
├── components/     # Reusable Vue components
├── composables/    # Vue composition functions
├── i18n/          # Internationalization files
├── mappings/      # Data mappings and utilities
├── models/        # TypeScript type definitions
├── router/        # Vue Router configuration
├── stores/        # Pinia state management
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── views/         # Page components
```

## 🎯 Key Features in Detail

### Race Calendar

- Interactive calendar showing all F1 races
- Toggle to hide/show past races
- Highlight upcoming and current race
- Sprint race indicators

### Driver & Team Standings

- Real-time championship standings
- Driver photos and team branding
- Constructor information and team colors
- Points and position tracking

### Responsive Design

- Mobile-first approach
- Optimized for various screen sizes
- Touch-friendly interface

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
