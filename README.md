# bitbox-wallet-frontend

This project is a React-based digital wallet application for managing Digital Shekels. It's built using Vite as the build tool and npm as the package manager.

## Prerequisites

- Node.js (version 20.16 or later)
- npm (comes with Node.js)

## Getting Started

To get the project up and running on your local machine, follow these steps:

1. Clone the repository:

   ```
   git clone [https://github.com/QED-it/bitbox-wallet-frontend.git]
   cd
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:

   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production to the `dist` folder.

## Project Structure

The project is structured as a typical Vite + React application. Key directories and files include:

- `src/`: Contains the source code for the application.
- `public/`: Contains static assets that will be served directly.
- `index.html`: The main HTML file.
- `vite.config.js`: Configuration file for Vite.
- `package.json`: Defines npm behaviors and packages for the project.

## Dependencies

This project uses several key dependencies:

- React (v18.3.1)
- React Router (v6.26.1)
- Axios (v1.7.7)
- Moment.js (v2.30.1)
- Styled Components (v6.1.12)

For a full list of dependencies and their versions, refer to the `package.json` file.

## Development

This project uses ESLint for code linting. The configuration can be found in the project root.

## Building for Production

To create a production build, run:

```
npm run build
```

This will generate a `dist` folder with all the built assets, optimized for production.
