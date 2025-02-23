import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { status, userData } = useSelector((state) => state.auth);

  console.log("Header: userData:", userData); // Debugging

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login")
  };

  return (
    <header className="bg-slate-500 text-white p-4 shadow-md">
      <div className="w-full max-w-[1200px] mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          NGO Donation Platform
        </Link>

        <nav>
          <ul className="flex space-x-6">
            {!status || !userData ? (
              <>
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
              </>
            ) : userData.role === "ngo" ? (
              <>
                <li>
                  <Link to="/donationreq" className="hover:underline">
                    Post Request
                  </Link>
                </li>
                <li>
                  <Link to="/postevent" className="hover:underline">
                    Post Event
                  </Link>
                </li>
                <li>
                  <Link to="/getmypost" className="hover:underline">
                    My Donation
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="hover:underline">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/ngos" className="hover:underline">
                    NGOs
                  </Link>
                </li>
                <li>
                  <Link to="/getevent" className="hover:underline">
                    Events
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="hover:underline">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
