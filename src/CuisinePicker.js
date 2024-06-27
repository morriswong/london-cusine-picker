import React, { useState, useEffect, useRef } from 'react';
import { Button } from './components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from './components/ui/card';

const cuisinesWithRestaurants = [
  { cuisine: "British", restaurant: "Fish and Chips" },
  { cuisine: "Italian", restaurant: "Pasta" },
  { cuisine: "Indian", restaurant: "Butter Chicken" },
  { cuisine: "Chinese", restaurant: "Egg Fried Rice" },
  { cuisine: "Japanese", restaurant: "Ramen" },
  { cuisine: "Thai", restaurant: "Pad Thai" },
  { cuisine: "French", restaurant: "Crossiant" },
  { cuisine: "Spanish", restaurant: "Tapas" },
  { cuisine: "Mexican", restaurant: "Enchiladas" },
  { cuisine: "Greek", restaurant: "Souvlaki" },
  { cuisine: "Turkish", restaurant: "Doner Kebab" },
  { cuisine: "Lebanese", restaurant: "Kafta" },
  { cuisine: "Vietnamese", restaurant: "Pho" },
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