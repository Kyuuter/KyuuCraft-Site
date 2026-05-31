import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Menu, XCircle } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";
import "@/components/NavBar.css";

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key == "Enter") {
      setClick(!click);
    }
  };

  const closeMobileMenu = () => setClick(false);

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
                to="/projects"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                TEMP Left
              </Link>
            </li>
          </menu>
        </div>

        <div className="navbar-right-container">
          <menu
            className={
              click
                ? "nav-menu-active bg-foreground"
                : "nav-menu-inactive divide-x-2"
            }
          >
            <li className="nav-item">
              <Link to="/about" className="nav-links" onClick={closeMobileMenu}>
                TEMP RIGHT
              </Link>
            </li>
          </menu>
          <button
            className="menu-icon"
            onClick={handleClick}
            onKeyDown={handleKeyPress}
          >
            {click ? (
              <XCircle height={40} color="black" />
            ) : (
              <Menu height={40} className="text-foreground" />
            )}
          </button>
          <div className="navbar-image">
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
