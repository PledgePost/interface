// pages/Dashboard.tsx
import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-10">
      <div className="bg-white p-5 rounded shadow-lg">
        <header className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="text-green-600">•</span>
            <span>Alicia Koch</span>
          </div>
          <nav className="flex space-x-4">
            <a href="#" className="text-gray-600">
              Overview
            </a>
            <a href="#" className="text-gray-600">
              Customers
            </a>
            <a href="#" className="text-gray-600">
              Products
            </a>
            <a href="#" className="text-gray-600">
              Settings
            </a>
          </nav>
        </header>

        <main className="mt-8">
          {/* Main content here... */}
          {/* You can continue by structuring the content as seen in the image. */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
