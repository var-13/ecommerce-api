# ecommerce-api
Thought for 1 second### How to Run the Weather Dashboard in VS Code

Here's a step-by-step guide to set up and run the Weather Dashboard project in Visual Studio Code:

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16.8 or later)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Git](https://git-scm.com/) (optional, for version control)


## Step 1: Create a New Next.js Project

1. Open VS Code
2. Open a terminal in VS Code (Terminal > New Terminal)
3. Create a new Next.js project with the following command:


```shellscript
npx create-next-app weather-dashboard
```

When prompted, select the following options:

- Would you like to use TypeScript? → Yes
- Would you like to use ESLint? → Yes
- Would you like to use Tailwind CSS? → Yes
- Would you like to use `src/` directory? → No
- Would you like to use App Router? → Yes
- Would you like to customize the default import alias? → No (or Yes and use @/* if you prefer)


## Step 2: Navigate to the Project Directory

```shellscript
cd weather-dashboard
```

## Step 3: Install Required Dependencies

Install shadcn/ui and Lucide React icons:

```shellscript
npm install lucide-react
npx shadcn@latest init
```

When prompted during shadcn/ui initialization, select the default options.

Then install the components we used:

```shellscript
npx shadcn@latest add card tabs button input label switch
```

## Step 4: Create the Project Files

1. Create the necessary directories:


```shellscript
mkdir -p components lib
```

2. Copy and paste the code from each file in the project into the corresponding files in your project:


- `app/page.tsx`
- `app/layout.tsx`
- `components/weather-dashboard.tsx`
- `components/weather-forecast.tsx`
- `components/weather-map.tsx`
- `components/theme-toggle.tsx`
- `lib/types.ts`
- `lib/mock-data.ts`


You can create these files in VS Code by right-clicking on the appropriate folder in the Explorer panel and selecting "New File".

## Step 5: Start the Development Server

Run the following command in the terminal:

```shellscript
npm run dev
```

This will start the development server, typically at [http://localhost:3000](http://localhost:3000).

## Step 6: View the Weather Dashboard

Open your browser and navigate to:

```plaintext
http://localhost:3000
```

You should now see the Weather Dashboard running!

## Additional Tips

1. **VS Code Extensions**: Install these helpful extensions for a better development experience:

1. ESLint
2. Prettier
3. Tailwind CSS IntelliSense
4. JavaScript and TypeScript Nightly



2. **Making Changes**: The development server supports hot reloading, so any changes you make to the code will be immediately reflected in the browser.
3. **Using Real Weather API**: To connect to a real weather API:

1. Sign up for a weather API service like OpenWeatherMap, WeatherAPI, or AccuWeather
2. Create an API key
3. Replace the mock data in the `useEffect` hook in `weather-dashboard.tsx` with actual API calls



4. **Debugging**: You can use VS Code's built-in debugger by:

1. Clicking on the Run and Debug icon in the sidebar
2. Selecting "JavaScript Debug Terminal"
3. Running `npm run dev` in this terminal
4. Setting breakpoints in your code





Now you have a fully functional Weather Dashboard running in VS Code that you can customize and extend
