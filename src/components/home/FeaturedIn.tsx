import React from 'react';

export function FeaturedIn() {
  return (
    <div className="mt-20 mb-16">
      <p className="text-center text-sm font-medium text-gray-500 mb-8">FEATURED IN</p>
      <div className="flex justify-center items-center gap-12 grayscale opacity-50">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png" alt="Google" className="h-6" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Forbes_logo.svg/2560px-Forbes_logo.svg.png" alt="Forbes" className="h-6" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2560px-Microsoft_logo.svg.png" alt="Microsoft" className="h-6" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/BBC_logo.svg/2560px-BBC_logo.svg.png" alt="BBC" className="h-6" />
      </div>
    </div>
  );
}