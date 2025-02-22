import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
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
            {/* <li>
              <Link to="/donate" className="hover:underline">
                Donate
              </Link>
            </li> */}
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
