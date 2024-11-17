"use client";

import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="short-header">
      <div className="gradient-block"></div>

      <div className="row header-content">
        <div className="logo">
          <a href="/">Author</a>
        </div>

        <nav id="main-nav-wrap">
          <ul className="main-navigation sf-menu">
            <li className={pathname === "/" ? "current" : ""}>
              <a href="/" title="">
                Home
              </a>
            </li>
            <li
              className={`has-children ${
                pathname.startsWith("/category") ? "current" : ""
              }`}
            >
              <a href="/category" title="">
                Categories
              </a>
              <ul className="sub-menu">
                <li>
                  <a href="/category">Wordpress</a>
                </li>
                <li>
                  <a href="/category">HTML</a>
                </li>
                <li>
                  <a href="/category">Photography</a>
                </li>
                <li>
                  <a href="/category">UI</a>
                </li>
                <li>
                  <a href="/category">Mockups</a>
                </li>
                <li>
                  <a href="/category">Branding</a>
                </li>
              </ul>
            </li>
            <li
              className={`has-children ${
                pathname.startsWith("/single") ? "current" : ""
              }`}
            >
              <a href="/single-standard" title="">
                Blog
              </a>
              <ul className="sub-menu">
                <li>
                  <a href="/single-video">Video Post</a>
                </li>
                <li>
                  <a href="/single-audio">Audio Post</a>
                </li>
                <li>
                  <a href="/single-gallery">Gallery Post</a>
                </li>
                <li>
                  <a href="/single-standard">Standard Post</a>
                </li>
              </ul>
            </li>
            <li className={pathname === "/style-guide" ? "current" : ""}>
              <a href="/style-guide" title="">
                Styles
              </a>
            </li>
            <li className={pathname === "/about" ? "current" : ""}>
              <a href="/about" title="">
                About
              </a>
            </li>
            <li className={pathname === "/contact" ? "current" : ""}>
              <a href="/contact" title="">
                Contact
              </a>
            </li>
            <li>
              <a href="/admin" title="">
                Admin
              </a>
            </li>
          </ul>
        </nav>

        <div className="search-wrap">
          <form role="search" method="get" className="search-form" action="#">
            <label>
              <span className="hide-content">Search for:</span>
              <input
                type="search"
                className="search-field"
                placeholder="Type Your Keywords"
                defaultValue=""
                name="s"
                title="Search for:"
                autoComplete="off"
              />
            </label>
            <input
              type="submit"
              className="search-submit"
              defaultValue="Search"
            />
          </form>

          <a href="#" id="close-search" className="close-btn">
            Close
          </a>
        </div>

        <div className="triggers">
          <a className="search-trigger" href="#">
            <i className="fa fa-search"></i>
          </a>
          <a className="menu-toggle" href="#">
            <span>Menu</span>
          </a>
        </div>
      </div>
    </header>
  );
}
