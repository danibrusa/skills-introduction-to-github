# ProductCare

ProductCare is a React application that helps you manage product expiration dates by scanning barcodes or QR codes.

## Features

- **Scan Products**: Use your device's camera to scan product barcodes or QR codes, or enter information manually
- **Product Management**: Store product information including name, expiration date, and description
- **Archived Products View**: View all products that expired more than 10 days ago, sorted by expiration date (descending)
- **Local Storage**: All data is stored locally in your browser
- **Clean Architecture**: Separated interface components from data access services using custom hooks

## Architecture

The application follows a clean architecture pattern with separation of concerns:

- **Components**: UI components for different pages (`ScanPage`, `ViewPage`, `Navigation`)
- **Hooks**: Custom React hooks for state management (`useProducts`)
- **Services**: Data access layer for localStorage operations (`LocalStorageService`)
- **Types**: TypeScript interfaces for type safety (`Product`)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the productcare directory:
```bash
cd productcare
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

This builds the app for production to the `build` folder.

## Usage

### Scanning Products

1. Navigate to the "Scan" page
2. Click "Start Camera Scan" to use your device's camera, or "Manual Entry" to enter information manually
3. If scanning, point your camera at a barcode or QR code
4. Fill in the product details:
   - Product Name
   - Expiration Date
   - Description
5. Click "Save Product" to store the product

### Viewing Archived Products

1. Navigate to the "Archived" page
2. View all products that expired more than 10 days ago
3. Products are sorted by expiration date in descending order (most recently expired first)
4. Delete products by clicking the × button on each card

## Technologies Used

- **React** - UI framework
- **TypeScript** - Type safety
- **React Router** - Navigation between pages
- **html5-qrcode** - Barcode and QR code scanning
- **LocalStorage API** - Data persistence

## Project Structure

```
productcare/
├── src/
│   ├── components/
│   │   ├── Navigation.tsx/css    # Navigation bar component
│   │   ├── ScanPage.tsx/css      # Product scanning page
│   │   └── ViewPage.tsx/css      # Archived products view
│   ├── hooks/
│   │   └── useProducts.ts        # Custom hook for product management
│   ├── services/
│   │   └── LocalStorageService.ts # LocalStorage data access
│   ├── types/
│   │   └── Product.ts            # Product type definition
│   ├── App.tsx                   # Main application component
│   ├── App.css                   # Application styles
│   └── index.tsx                 # Application entry point
└── package.json
```

## Available Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## License

MIT
