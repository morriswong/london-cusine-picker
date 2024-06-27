# Detailed Instructions for Building London Cuisine Picker Slot Machine React App in WSL

## Prerequisites
- WSL installed with a Linux distribution (e.g., Ubuntu)
- Node.js and npm installed in your WSL environment

## Step 1: Set up the project

1. Open your WSL terminal.
2. Create a new directory for your project:
   ```
   mkdir london-cuisine-picker
   cd london-cuisine-picker
   ```
3. Initialize a new React project using Create React App:
   ```
   npx create-react-app .
   ```

## Step 2: Install necessary dependencies

Install the required packages:

```
npm install @radix-ui/react-slot class-variance-authority clsx tailwind-merge lucide-react
npm install -D tailwindcss postcss autoprefixer
```

## Step 3: Set up Tailwind CSS

1. Initialize Tailwind CSS:
   ```
   npx tailwindcss init -p
   ```

2. Open `tailwind.config.js` and replace its content with:
   ```javascript
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: [
       "./src/**/*.{js,jsx,ts,tsx}",
     ],
     theme: {
       extend: {
         colors: {
           yellow: {
             200: '#fef08a',
             300: '#fde047',
             400: '#facc15',
             500: '#eab308',
             700: '#a16207',
           },
           red: {
             500: '#ef4444',
             600: '#dc2626',
           },
           blue: {
             600: '#2563eb',
           },
           green: {
             600: '#16a34a',
           },
         },
       },
     },
     plugins: [],
   }
   ```

3. Open `src/index.css` and replace its content with:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   body {
     margin: 0;
     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
       'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
       sans-serif;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
   }

   code {
     font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
       monospace;
   }
   ```

## Step 4: Create necessary components

1. Create a new directory for UI components:
   ```
   mkdir -p src/components/ui
   ```

2. Create the Button component:
   ```
   touch src/components/ui/button.js
   ```
   Copy the following code into `src/components/ui/button.js`:
   ```jsx
   import * as React from "react"
   import { Slot } from "@radix-ui/react-slot"
   import { cva } from "class-variance-authority";
   import { cn } from "../../lib/utils"

   const buttonVariants = cva(
     "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
     {
       variants: {
         variant: {
           default: "bg-primary text-primary-foreground hover:bg-primary/90",
           destructive:
             "bg-destructive text-destructive-foreground hover:bg-destructive/90",
           outline:
             "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
           secondary:
             "bg-secondary text-secondary-foreground hover:bg-secondary/80",
           ghost: "hover:bg-accent hover:text-accent-foreground",
           link: "text-primary underline-offset-4 hover:underline",
         },
         size: {
           default: "h-10 px-4 py-2",
           sm: "h-9 rounded-md px-3",
           lg: "h-11 rounded-md px-8",
           icon: "h-10 w-10",
         },
       },
       defaultVariants: {
         variant: "default",
         size: "default",
       },
     }
   )

   const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
     const Comp = asChild ? Slot : "button"
     return (
       <Comp
         className={cn(buttonVariants({ variant, size, className }))}
         ref={ref}
         {...props}
       />
     )
   })
   Button.displayName = "Button"

   export { Button, buttonVariants }
   ```

3. Create the Card components:
   ```
   touch src/components/ui/card.js
   ```
   Copy the following code into `src/components/ui/card.js`:
   ```jsx
   import * as React from "react"
   import { cn } from "../../lib/utils"

   const Card = React.forwardRef(({ className, ...props }, ref) => (
     <div
       ref={ref}
       className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}
       {...props}
     />
   ))
   Card.displayName = "Card"

   const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
     <div
       ref={ref}
       className={cn("flex flex-col space-y-1.5 p-6", className)}
       {...props}
     />
   ))
   CardHeader.displayName = "CardHeader"

   const CardContent = React.forwardRef(({ className, ...props }, ref) => (
     <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
   ))
   CardContent.displayName = "CardContent"

   const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
     <div
       ref={ref}
       className={cn("flex items-center p-6 pt-0", className)}
       {...props}
     />
   ))
   CardFooter.displayName = "CardFooter"

   export { Card, CardHeader, CardContent, CardFooter }
   ```

4. Create a utils file:
   ```
   mkdir src/lib
   touch src/lib/utils.js
   ```
   Copy the following code into `src/lib/utils.js`:
   ```javascript
   import { clsx } from "clsx"
   import { twMerge } from "tailwind-merge"

   export function cn(...inputs) {
     return twMerge(clsx(inputs))
   }
   ```

## Step 5: Create the CuisinePicker component

1. Create a new file for the CuisinePicker:
   ```
   touch src/CuisinePicker.js
   ```

2. Copy the following code into `src/CuisinePicker.js`:
   ```jsx
   import React, { useState, useEffect, useRef } from 'react';
   import { Button } from './components/ui/button';
   import { Card, CardHeader, CardContent, CardFooter } from './components/ui/card';

   const cuisinesWithRestaurants = [
     { cuisine: "British", restaurant: "Rules" },
     { cuisine: "Italian", restaurant: "Padella" },
     { cuisine: "Indian", restaurant: "Dishoom" },
     { cuisine: "Chinese", restaurant: "Hutong" },
     { cuisine: "Japanese", restaurant: "Nobu" },
     { cuisine: "Thai", restaurant: "Kiln" },
     { cuisine: "French", restaurant: "Brasserie Zédel" },
     { cuisine: "Spanish", restaurant: "Barrafina" },
     { cuisine: "Mexican", restaurant: "Wahaca" },
     { cuisine: "Greek", restaurant: "The Real Greek" },
     { cuisine: "Turkish", restaurant: "Gökyüzü" },
     { cuisine: "Lebanese", restaurant: "Maroush" },
     { cuisine: "Vietnamese", restaurant: "Cây Tre" },
     { cuisine: "Korean", restaurant: "Bibimbap" }
   ];

   const CuisinePicker = () => {
     const [selectedCuisine, setSelectedCuisine] = useState(null);
     const [isSpinning, setIsSpinning] = useState(false);
     const spinInterval = useRef(null);

     const spinSlots = () => {
       setIsSpinning(true);
       let counter = 0;
       spinInterval.current = setInterval(() => {
         const randomIndex = Math.floor(Math.random() * cuisinesWithRestaurants.length);
         setSelectedCuisine(cuisinesWithRestaurants[randomIndex]);
         counter++;
         if (counter > 20) {
           clearInterval(spinInterval.current);
           setIsSpinning(false);
         }
       }, 100);
     };

     useEffect(() => {
       return () => {
         if (spinInterval.current) {
           clearInterval(spinInterval.current);
         }
       };
     }, []);

     return (
       <Card className="w-96 mx-auto bg-gradient-to-b from-yellow-300 to-yellow-500 border-4 border-yellow-700 rounded-xl shadow-2xl">
         <CardHeader className="text-3xl font-bold text-center text-red-600 bg-yellow-400 rounded-t-lg border-b-4 border-yellow-700">
           London Food Slot
         </CardHeader>
         <CardContent className="text-center p-6 bg-yellow-200">
           <div className="mb-4 bg-white p-4 rounded-lg shadow-inner min-h-[150px] flex flex-col justify-center items-center">
             {selectedCuisine ? (
               <>
                 <p className="text-2xl font-bold text-blue-600 mb-2">{selectedCuisine.cuisine}</p>
                 <p className="text-xl text-green-600">Try: {selectedCuisine.restaurant}</p>
               </>
             ) : (
               <p className="text-xl text-gray-600">Spin to pick a cuisine!</p>
             )}
           </div>
         </CardContent>
         <CardFooter className="justify-center bg-yellow-400 rounded-b-lg border-t-4 border-yellow-700">
           <Button 
             onClick={spinSlots} 
             disabled={isSpinning}
             className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transform transition duration-200 ease-in-out hover:scale-105 disabled:opacity-50"
           >
             {isSpinning ? "Spinning..." : "Spin!"}
           </Button>
         </CardFooter>
       </Card>
     );
   };

   export default CuisinePicker;
   ```

## Step 6: Update App.js

Replace the content of `src/App.js` with:

```jsx
import React from 'react';
import CuisinePicker from './CuisinePicker';

function App() {
  return (
    <div className="App flex justify-center items-center min-h-screen bg-gray-100">
      <CuisinePicker />
    </div>
  );
}

export default App;
```

## Step 7: Run the application

1. Start the development server:
   ```
   npm start
   ```

2. Open a web browser and navigate to `http://localhost:3000` to see your application running.

## Features of the London Cuisine Picker Slot Machine

1. **Slot Machine Design**: The app now resembles a slot machine with a yellow gradient background, borders, and a spinning button styled like a lever.

2. **Cuisine and Restaurant Data**: The app includes a list of popular cuisines in London along with a suggested restaurant for each cuisine.

3. **Slot Machine Animation**: When you click the "Spin!" button, the app rapidly cycles through different cuisines and restaurants before settling on a final selection, simulating a slot machine effect.

4. **Responsive UI**: The button changes appearance when spinning or disabled, providing visual feedback to the user.

5. **Restaurant Suggestions**: Along with the cuisine, the app now suggests a famous restaurant in London for that cuisine.

## Troubleshooting

- If you encounter any issues with missing dependencies, install them using `npm install`.
- Make sure your WSL environment has access to a web browser. You might need to configure your Windows Firewall to allow connections from WSL.

Enjoy your London Cuisine Picker Slot Machine app!