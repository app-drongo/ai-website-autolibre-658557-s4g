'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

// Define the interface for a car object
interface Car {
  id: string;
  name: string;
  type: string; // e.g., Sedan, SUV, Electric
  imageUrl: string;
  seats: number;
  doors: number;
  transmission: 'Automatic' | 'Manual';
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  pricePerDay: number;
}

// Dummy data for the car fleet (using Unsplash images as requested)
const carFleetData: Car[] = [
  {
    id: 'car-1',
    name: 'Toyota Camry',
    type: 'Sedan',
    imageUrl:
      'https://images.unsplash.com/photo-1583121274602-3e2820c691e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTc2MDZ8MHwxfHNlYXJjaHwxfHxzZWRhbiUyMGNhcnxlbnwwfHx8fDE3MTc4NjY4ODJ8MA&ixlib=rb-4.0.3&q=80&w=1080',
    seats: 5,
    doors: 4,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    pricePerDay: 45,
  },
  {
    id: 'car-2',
    name: 'Tesla Model 3',
    type: 'Electric',
    imageUrl:
      'https://images.unsplash.com/photo-1617704543003-33924376371c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTc2MDZ8MHwxfHxlbGVjdHJpYyUyMGNhcnxlbnwwfHx8fDE3MTc4NjY5MTJ8MA&ixlib=rb-4.0.3&q=80&w=1080',
    seats: 5,
    doors: 4,
    transmission: 'Automatic',
    fuelType: 'Electric',
    pricePerDay: 70,
  },
  {
    id: 'car-3',
    name: 'BMW X5',
    type: 'SUV',
    imageUrl:
      'https://images.unsplash.com/photo-1542239600-978189689255?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTc2MDZ8MHwxfHxzdXYlMjBjYXJ8ZW53MHx8fHwxNzE3ODY2OTM4fDA&ixlib=rb-4.0.3&q=80&w=1080',
    seats: 5,
    doors: 4,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    pricePerDay: 80,
  },
  {
    id: 'car-4',
    name: 'Mercedes-Benz C-Class',
    type: 'Luxury Sedan',
    imageUrl:
      'https://images.unsplash.com/photo-1599494396216-78720173879f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTc2MDZ8MHwxfHxsdXh1cnklMjBzZWRhbiUyMGNhcnxlbnwwfHx8fDE3MTc4NjY5NjV8MA&ixlib=rb-4.0.3&q=80&w=1080',
    seats: 5,
    doors: 4,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    pricePerDay: 95,
  },
  {
    id: 'car-5',
    name: 'Volkswagen Golf',
    type: 'Hatchback',
    imageUrl:
      'https://images.unsplash.com/photo-1593694494723-a55d2d790497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTc2MDZ8MHwxfHxoYXRjaGJhY2slMjBjYXJ8ZW53MHx8fHwxNzE3ODY2OTg5fDA&ixlib=rb-4.0.3&q=80&w=1080',
    seats: 5,
    doors: 5,
    transmission: 'Manual',
    fuelType: 'Petrol',
    pricePerDay: 35,
  },
  {
    id: 'car-6',
    name: 'Ford Transit Custom',
    type: 'Van',
    imageUrl:
      'https://images.unsplash.com/photo-1607874987514-63806733230a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTc2MDZ8MHwxfHNlYXJjaHwxfHxtaW5pdmFuJTIwY2FyfGVufDB8fHx8MTcxNzg2NzAxN3ww&ixlib=rb-4.0.3&q=80&w=1080',
    seats: 9,
    doors: 4,
    transmission: 'Manual',
    fuelType: 'Diesel',
    pricePerDay: 110,
  },
];

// Props interface for the CarCard sub-component
interface CarCardProps {
  car: Car;
  navigate: ReturnType<typeof useSmartNavigation>;
}

// CarCard sub-component for displaying individual car details
function CarCard({ car, navigate }: CarCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out h-full flex flex-col">
      <CardHeader className="p-0">
        <div className="relative w-full h-48 bg-muted">
          <Image
            src={car.imageUrl}
            alt={car.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority // Prioritize loading for initial fleet display
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-2xl font-bold mb-2">
          <span data-editable={`car-${car.id}-name`}>{car.name}</span>
        </CardTitle>
        <p className="text-muted-foreground mb-4">
          <span data-editable={`car-${car.id}-type`}>{car.type}</span>
        </p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <p>
            <span className="font-medium">Seats:</span>{' '}
            <span data-editable={`car-${car.id}-seats`}>{car.seats}</span>
          </p>
          <p>
            <span className="font-medium">Doors:</span>{' '}
            <span data-editable={`car-${car.id}-doors`}>{car.doors}</span>
          </p>
          <p>
            <span className="font-medium">Trans:</span>{' '}
            <span data-editable={`car-${car.id}-transmission`}>{car.transmission}</span>
          </p>
          <p>
            <span className="font-medium">Fuel:</span>{' '}
            <span data-editable={`car-${car.id}-fuelType`}>{car.fuelType}</span>
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-6 bg-card-foreground/5">
        <p className="text-2xl font-bold text-primary">
          $<span data-editable={`car-${car.id}-price`}>{car.pricePerDay}</span>
          <span className="text-base text-muted-foreground">/day</span>
        </p>
        <Button
          onClick={() => navigate(`/book?carId=${car.id}`)}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          <span data-editable={`car-${car.id}-bookButton`}>Book Now</span>
        </Button>
      </CardFooter>
    </Card>
  );
}

// Main CarFleet component
export default function Carfleet() {
  const navigate = useSmartNavigation();

  return (
    <section id="car-fleet" className="bg-background text-foreground py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            <span data-editable="fleetTitle">Our Premium Car Fleet</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            <span data-editable="fleetDescription">
              Discover our diverse selection of vehicles, from economical city cars to luxurious
              SUVs, perfect for any journey.
            </span>
          </p>
        </div>

        {/* Car Display - Carousel for larger screens, Grid for smaller */}
        <div className="hidden md:block">
          {' '}
          {/* Desktop Carousel */}
          <Carousel
            opts={{
              align: 'start',
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {carFleetData.map(car => (
                <CarouselItem key={car.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <CarCard car={car} navigate={navigate} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:hidden">
          {' '}
          {/* Mobile Grid */}
          {carFleetData.map(car => (
            <CarCard key={car.id} car={car} navigate={navigate} />
          ))}
        </div>
      </div>
    </section>
  );
}
