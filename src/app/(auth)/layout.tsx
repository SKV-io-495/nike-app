"use client";

import { usePathname } from "next/navigation";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isSignUp = pathname === "/sign-up";

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {isSignUp ? (
        // Nike Sign-up Layout
        <>
          {/* Left Sidebar - Nike */}
          <div className="hidden lg:flex lg:flex-1 bg-gray-400 relative">
            {/* Nike Logo */}
            <div className="absolute top-8 left-8 w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.8 5.1C2.1 5.8 2.1 6.9 2.8 7.6l7.6 7.6c.7.7 1.8.7 2.5 0l7.6-7.6c.7-.7.7-1.8 0-2.5-.7-.7-1.8-.7-2.5 0L12 11.1 6 5.1c-.7-.7-1.8-.7-2.5 0-.5.7-.5 1.8.3 2.5z"/>
              </svg>
            </div>
            
            {/* Content */}
            <div className="flex flex-col justify-center px-12 text-white">
              <h1 className="text-6xl font-bold mb-4">Just Do It</h1>
              <p className="text-lg opacity-90">
                Join millions of athletes and fitness enthusiasts who trust Nike for their performance needs.
              </p>
              
              {/* Dots indicator */}
              <div className="flex space-x-2 mt-12">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                <div className="w-2 h-2 bg-white/50 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="flex-1 lg:flex-1 bg-white flex items-center justify-center p-8">
            {children}
          </div>
        </>
      ) : (
        // Orion Sign-in Layout
        <div className="flex-1 bg-gray-200 flex items-center justify-center p-4">
          <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid lg:grid-cols-2 min-h-[600px]">
              {/* Left Sidebar - Orion Dashboard */}
              <div className="hidden lg:flex bg-gray-900 relative overflow-hidden">
                {/* Orion Logo */}
                <div className="absolute top-8 left-8 w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>
                </div>
                
                {/* Content */}
                <div className="flex flex-col justify-center px-12 text-white relative z-10">
                  <h1 className="text-4xl font-bold mb-2">
                    One Platform to <span className="text-gray-400">Streamline</span>
                  </h1>
                  <h2 className="text-4xl font-bold mb-6">
                    All Product <span className="text-gray-400">Analytics</span>
                  </h2>
                  <p className="text-gray-300 text-sm max-w-sm">
                    Your revenue are set to grow by 20% next month. Your revenue is increase by next month with our campaign tools.
                  </p>
                  
                  {/* Dots indicator */}
                  <div className="flex space-x-2 mt-12">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                    <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                  </div>
                </div>

                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
              </div>

              {/* Right Side - Form */}
              <div className="bg-white flex items-center justify-center p-8 lg:p-12">
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}