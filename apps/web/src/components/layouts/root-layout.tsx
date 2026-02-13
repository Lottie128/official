import { Link, Outlet } from "react-router";

export default function RootLayout() {
  return (
    <div className="min-h-screen">
      <nav className="bg-gray-100 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-6">
            <Link to="/" className="text-blue-600 hover:text-blue-800">
              Home
            </Link>
            <Link to="/about" className="text-blue-600 hover:text-blue-800">
              About
            </Link>
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
