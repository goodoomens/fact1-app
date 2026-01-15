# Fact1 - Formula 1 Race Tracker 🏁

A modern, responsive Formula 1 application built with Vue 3 that provides a race calendar, driver standings, team standings and additional statistics.

## Live Demo
[Fact1 on Netlify](https://fact1.netlify.app)

## Features

- **📅 Race Calendar** - View F1 races for current and past seasons
- **📅 Season Switcher** - Easily switch between the current season and the last 4 years
- **🏆 Driver Standings** - Championship standings with driver photos and team colors
- **🏁 Team Standings** - Constructor championship standings with team logos and branding
- **🏃‍♂️ Race Details** - Detailed race information including sprint races
- **📱 Responsive Design** - Optimized for desktop and mobile devices
- **🎨 Modern UI** - Built with Tailwind CSS and PrimeVue components
- **🌐 Multi-language Support** - Available in English, German, and Dutch
- **💾 Local Caching** - All API data is cached in local storage for 24 hours to improve performance and reduce API calls

## ToDos

- **👤 Driver Detail Pages** - Individual driver profiles
- **🌤️ Weather Forecast** - Weather predictions for upcoming races

## Tech Stack

- **Frontend**: Vue 3 with Composition API
- **Language**: TypeScript
- **Build Tool**: Vite
- **State Management**: Pinia
- **Styling**: Tailwind CSS
- **UI Components**: PrimeVue
- **HTTP Client**: Axios
- **Routing**: Vue Router
- **Internationalization**: Vue I18n
- **Charts**: Highcharts
- **Excel**: ExcelJS

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
- Global year selection to view different seasons
- Toggle to hide/show past races
- Highlight upcoming and current race

### Driver & Team Standings

- Season-specific championship standings
- Constructor information
- Points and positions
- "No data" hints for upcoming or empty seasons

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
