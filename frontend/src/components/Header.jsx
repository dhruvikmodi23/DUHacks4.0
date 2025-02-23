import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-slate-500 text-white p-4 shadow-md my-2">  {/* Darker Blue */}
      <div className="w-full max-w-[1200px] mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          NGO Donation Platform
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/ngos" className="hover:underline">
                NGOs
              </Link>
            </li>
            <li>
              <Link to="/signup" className="hover:underline">
                Sign Up
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
