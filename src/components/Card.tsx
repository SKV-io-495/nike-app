'use client';

import { useState } from 'react';
import Image from 'next/image';

interface CardProps {
  id: number;
  title: string;
  category?: string;
  price: string | number;
  image?: string;
  description?: string;
  badge?: string;
  colors?: number;
  onAddToCart?: (id: number) => void;
  className?: string;
  subtitle?: string;
  meta?: string;
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  category = "Men's Shoes",
  price,
  image,
  description,
  badge,
  colors,
  onAddToCart,
  className = '',
  subtitle,
  meta,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(id);
    }
  };

  const formatPrice = (price: string | number): string => {
    if (typeof price === 'number') {
      return `$${price.toFixed(2)}`;
    }
    return price.startsWith('$') ? price : `$${price}`;
  };

  return (
    <div
      className={`group relative bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge */}
      {badge && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {badge}
          </span>
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        {image ? (
          <>
            <Image
              src={image}
              alt={title}
              fill
              className={`object-cover transition-all duration-500 group-hover:scale-105 ${
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setIsImageLoaded(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {!isImageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {/* Overlay with Add to Cart button */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={handleAddToCart}
            className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="space-y-2">
          {/* Title */}
          <h3 className="font-semibold text-lg text-gray-900 leading-tight group-hover:text-gray-700 transition-colors duration-200">
            {title}
          </h3>

          {/* Category/Subtitle */}
          <p className="text-sm text-gray-600">{subtitle}</p>

          {/* Description */}
          {description && (
            <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
          )}

          {/* Meta (Colors/Additional info) */}
          {meta && (
            <p className="text-sm text-gray-600">{meta}</p>
          )}

          {/* Price */}
          <div className="pt-2">
            <span className="text-xl font-bold text-gray-900">
              {formatPrice(price)}
            </span>
          </div>
        </div>

        {/* Mobile Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="md:hidden mt-4 w-full bg-black text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
