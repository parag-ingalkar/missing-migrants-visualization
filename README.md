# Missing Migrants World Map Visualization

An interactive data visualization displaying missing migrants incidents across the globe over time, built with React, Vite, and D3.js.

## 📊 Features

- **Interactive World Map**: Displays missing migrants data on a world map with proportional bubble markers
- **Time-based Filtering**: Interactive histogram with brush functionality to filter data by date range
- **Real-time Data Loading**: Fetches live data from external sources
- **Responsive Design**: Clean, modern interface with smooth interactions
- **Data Aggregation**: Monthly histogram showing total casualties over time

## 🛠️ Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and development server
- **D3.js v7** - Data visualization and geographical projections
- **TopoJSON** - Geographical data format
- **CSS3** - Styling and animations

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/parag-ingalkar/missing-migrants-visualization.git
cd missing-migrants-visualization
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   ├── AxisComponents.jsx  # Axis & Elements of histogram chart
│   ├── Bubbles.jsx         # Incident markers on map
│   ├── Countries.jsx       # Landmasses and oceans boundaries
│   ├── Histogram.jsx       # Time-based histogram with brush
│   └── WorldGraticule.jsx  # World sphere, latitudes and longitudes
├── hooks/
│   ├── useWorldAtlas.js     # World geographical data loader
│   └── useData.js           # Missing migrants data loader
├── utils/
│   ├── dataAccessors.js     # Modify migrants data
│   └── projectionUtils.js   # Create projections
├── App.jsx                  # Main application component
├── main.jsx                 # Application entry point
└── index.css                # Global styles
```

## 📋 Data Sources

- **World Atlas**: [world-atlas package](https://unpkg.com/world-atlas@2.0.2/countries-50m.json)
- **Missing Migrants Data**: [Missing Migrants Dataset 2023](https://gist.githubusercontent.com/kristen149/4d01f7061114ac0131f784abe8b68f4d/raw/e73d8b0277050c10db08719010f0a2ab07911e58/MissingMigrant2023.csv)

## 🎯 Key Components

### Map Visualization

- **Projection**: Natural Earth projection for optimal world map display
- **Bubble Markers**: Square-root scaled circles representing incident severity
- **Geographic Accuracy**: Precise coordinate mapping from location data

### Interactive Timeline

- **Histogram**: Monthly aggregation of incidents
- **Brush Selection**: Click and drag to filter time periods
- **Real-time Updates**: Map automatically updates based on selected time range

### Data Processing

- **Coordinate Parsing**: Converts location coordinates to map projections
- **Date Handling**: Processes incident dates for temporal analysis
- **Data Validation**: Handles missing or invalid data points

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Performance Optimizations

- **React.useMemo**: Memoized expensive calculations (scales, projections, data processing)
- **Efficient Re-rendering**: Optimized component updates for smooth interactions
- **Data Caching**: Cached external data requests

## 📊 Data Format

The application expects CSV data with the following key columns:

- `Location Coordinates`: Comma-separated latitude, longitude
- `Total Dead and Missing`: Number of casualties
- `Reported Date`: Date of incident (MM/DD/YYYY format)
