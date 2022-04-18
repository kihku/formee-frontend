import { ReactNode, useEffect } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface LayoutProps {
  children?: ReactNode;
  title?: string;
}

export const Layout = ({ children, title = "FORMEE" }: LayoutProps) => {
  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    screen.orientation.lock("portrait");
  }, []);

  return (
    <div>
      <head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Formee" />
        {/* <meta name="image" content="/assets/general/web-thumbnail.png" /> */}

        <meta property="og:title" content="FORMEE" key="ogtitle" />
        <meta property="og:description" content="Formee" key="ogdesc" />
        {/* <meta property="og:image" content="/assets/general/web-thumbnail.png" key="ogimg" /> */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <div className="base-layout">
        <div>
          <Header />
        </div>
        <div >{children}</div>
        <div>
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
};
