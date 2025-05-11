import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden pt-32">
      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="text-center relative z-10">
        {/* Decorative Icons */}
        <div className="absolute -top-20 -left-20 w-40 h-40 text-primary/20 animate-float">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 text-secondary/20 animate-float-delayed">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>

        {/* 404 Text */}
        <div className="relative mb-4 md:mb-8">
          <h1 className="text-[8rem] md:text-[12rem] font-black text-primary/10 select-none leading-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
              Oops! Lost in Space
            </h2>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-4">
          <p className="text-base md:text-lg text-muted-foreground max-w-md mx-auto px-4">
            Looks like you've ventured into the void. The page you're seeking has drifted into another dimension.
          </p>
          <p className="text-sm md:text-base text-muted-foreground/80 max-w-md mx-auto px-4">
            Don't worry, even the best explorers get lost sometimes. Let's get you back to familiar territory.
          </p>
        </div>

        {/* Action Button */}
        <Link
          href="/"
          className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-primary/20 text-sm md:text-base mt-8 md:mt-12"
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Return to Base
        </Link>
      </div>
    </div>
  );
} 