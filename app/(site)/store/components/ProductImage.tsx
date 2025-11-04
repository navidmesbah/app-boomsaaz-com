'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  fallbackSrc: string;
  className?: string;
  fill?: boolean;
}

export function ProductImage({ src, alt, fallbackSrc, className = '', fill = true }: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  
  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill={fill}
      className={className}
      unoptimized={src.startsWith('http')}
      onError={() => {
        console.error('Image failed to load:', src);
        setImgSrc(fallbackSrc);
      }}
    />
  );
} 