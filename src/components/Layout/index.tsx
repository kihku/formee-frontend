import { ReactNode, useEffect } from "react";
import CommonUtils from "utils/commonUtils";
import { Header } from "./Header";

interface LayoutProps {
  children?: ReactNode;
  title?: string;
}

export const Layout = ({ children, title }: LayoutProps) => {
  useEffect(() => {
    title && CommonUtils.setPageTitle(title);
    // eslint-disable-next-line no-restricted-globals
    screen.orientation.lock("portrait").then(
      success => {},
      fail => {},
    );
  }, [title]);

  return (
    <div>
      {/* <head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="FORMEE" />
        <meta name="image" content="/assets/general/web-thumbnail.png" />

        <meta property="og:title" content="FORMEE" key="ogtitle" />
        <meta property="og:description" content="FORMEE" key="ogdesc" />
        <meta property="og:image" content="/assets/general/web-thumbnail.png" key="ogimg" />
        <link rel="icon" href="/favicon.ico" />
      </head> */}
      <div>
        <div className="layout-header">
          <Header />
        </div>
        <div>{children}</div>
        <div>{/* <Footer /> */}</div>
      </div>
    </div>
  );
};
