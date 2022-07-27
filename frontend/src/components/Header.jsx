import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onlogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Goalsetter</Link>
      </div>
      <ul>
        {user ? ( // if user then show (somethin):else (something)
          <li>
            <div>
              <button className="btn btn-primary btn-block" onClick={onlogout}>
                <Link to="/login">
                  <FaSignOutAlt /> Logouts
                </Link>
              </button>
            </div>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>

            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
