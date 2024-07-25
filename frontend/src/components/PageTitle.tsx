import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const fakebook = "| Fakebook";

const pageTitles = {
  "/": `Profile ${fakebook}`,
  "/login": `Login ${fakebook}`,
  "/posts": `Posts ${fakebook}`,
  "/users": `Users ${fakebook}`,
};

const PageTitle = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const pathNameWithNarrowedType = pathname as keyof typeof pageTitles;
    document.title = pageTitles[pathNameWithNarrowedType];
  }, [pathname]);

  return null;
};

export default PageTitle;
