import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function NotFound() {
  return (
    <div className="page-content-holder">
      <div className="subheader">Error 404: Page Not Found!</div>
      <img
        className="main-content-image-sq"
        src="/favicon.png"
        alt="Error Image"
      />
      <h4 className="main-content-text">
        The page "{window.location.href}" does not exist! Please return to a
        valid webpage.
      </h4>
      <Link to="/">
        <Button>Home Page</Button>
      </Link>
    </div>
  );
}

export default NotFound;
