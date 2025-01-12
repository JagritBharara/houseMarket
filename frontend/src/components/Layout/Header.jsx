import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status on component mount
  useEffect(() => {
    const token = localStorage.getItem('token'); // Assume token is stored in localStorage
    setIsLoggedIn(!!token); // Set login status based on token presence
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users/logout', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (response.status === 200) {
        localStorage.removeItem('token'); // Remove token from localStorage
        setIsLoggedIn(false); // Update login state
        navigate('/signin'); // Redirect to sign-in page
      }
    } catch (err) {
      console.error('Logout failed:', err.message);
    }
  };

  return (
    <>
      <header className="bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          {/* Home Icon */}
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Home</span>
              <img
                className="h-8 w-auto"
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F022%2F750%2F436%2Foriginal%2F3d-home-icon-free-png.png&f=1&nofb=1&ipt=c40a7c0fd634ac0c84e5ca74e70070c79699223006ed52bf5eaa913ac3045728&ipo=images"
                alt="Home Icon"
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-12">
            <Link to="/profile" className="text-sm font-semibold text-gray-900">
              Profile
            </Link>
            <Link to="/offers" className="text-sm font-semibold text-gray-900">
              Offers
            </Link>
          </div>

          {/* Right side: Login/Logout */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-sm font-semibold text-gray-900"
              >
                Logout
              </button>
            ) : (
              <Link to="/signin" className="text-sm font-semibold text-gray-900">
                Log in <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile menu */}
        <div className={`lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`} role="dialog" aria-modal="true">
          <div
            className="fixed inset-0 z-10 bg-black opacity-50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Home</span>
                <img
                  className="h-8 w-auto"
                  src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F022%2F750%2F436%2Foriginal%2F3d-home-icon-free-png.png&f=1&nofb=1&ipt=c40a7c0fd634ac0c84e5ca74e70070c79699223006ed52bf5eaa913ac3045728&ipo=images"
                  alt="Home Icon"
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-6 space-y-6">
              <Link to="/profile" className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold text-gray-900 hover:bg-gray-50">
                Profile
              </Link>
              <Link to="/offers" className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold text-gray-900 hover:bg-gray-50">
                Offers
              </Link>
              <Link to="/explore" className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold text-gray-900 hover:bg-gray-50">
                Explore
              </Link>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="text-base font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Logout
                </button>
              ) : (
                <Link to="/signin" className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold text-gray-900 hover:bg-gray-50">
                  Log in
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
