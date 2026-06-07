import { Link } from "react-router-dom";
import { Home} from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import "@/components/Navbar.css";

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-navbar-start via-navbar-middle to-navbar-end navbar">
      <div className="navbar-container">
        <div className="navbar-left-container">
          <Link to="/" className="navbar-image">
            <Home height={40} className="text-foreground" />
          </Link>
          <menu className="navbar-site-list divide-x-2">
            <li className="nav-item">
              <Link
                to="/LINK-LATER"
                className="nav-links"
              >
                Test Left
              </Link>
            </li>
          </menu>
        </div>
        <div className="navbar-right-container">
          <menu className="navbar-site-list divide-x-2">
            <li className="nav-item">
              <Link
                to="/LINK-LATER"
                className="nav-links"
                >
                Test Right
              </Link>
            </li>
          </menu>
          <div className="navbar-image">
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
