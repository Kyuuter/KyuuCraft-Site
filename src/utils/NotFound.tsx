import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function NotFound() {
  return (
    <div className="flex flex-col items-center">
      <h1>Error 404: Page Not Found!</h1>
      <img
        className="main-content-image-sq"
        src="vite.svg"
        alt="Error Image"
      />
      <p className="main-content-text pl-25 pr-25">
        The page <span className="italic underline">"{window.location.href}"</span> does not exist! Please return to a
        valid webpage. If you got here by using the webpage buttons, please let 
        <span className="font-bold">{" Spide6667"}</span> know on Discord!
      </p>
      <Link to="/">
        <Button>Home Page</Button>
      </Link>
    </div>
  );
}

export default NotFound;