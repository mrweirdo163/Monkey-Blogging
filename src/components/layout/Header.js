import { Button } from "components/button";
import { useAuth } from "contexts/auth-context";
import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
const menuLinks = [
  {
    url: "/",
    title: "Home",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    url: "/blog",
    title: "Blog",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    url: "/contact",
    title: "Contact",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
        />
      </svg>
    ),
  },
  {
    url: "/dashboard",
    title: "Dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
    ),
  },
];

const HeaderStyles = styled.header`
  padding: 20px 0;

  display: flex;
  align-items: center;
  justify-content: center;

  .header-main {
    display: flex;
    align-items: center;
  }
  .header-auth {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .logo,
  .logo-sidebar {
    display: block;
    max-width: 40px;
  }
  .sidebarBtn {
    display: none;
  }
  .sidebar {
    position: fixed;
    width: fit-content;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 100;
    transform: translateX(-200%);

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    background: #ffffff;
    transition: all 0.3s linear;
    ${(props) =>
      props.show === true &&
      css`
        transform: translateX(0);
      `};
  }

  .menu {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-left: 40px;
    list-style: none;
    font-weight: 500;
  }

  .search {
    margin-left: auto;
    width: 100%;
    max-width: 320px;
    display: flex;
    align-items: center;
    position: relative;
    margin-right: 20px;
  }
  .link {
    line-height: 1.5em;
    padding: 1em 2em;
    font-weight: 600;
    color: ${(props) => props.theme.gray80};
    margin-bottom: 20px;
    cursor: pointer;

    &.active,
    &:hover {
      background: #f1fbf7;
      color: ${(props) => props.theme.primary};
    }
  }
  .search-input {
    border-radius: 8px;
    padding: 15px 20px;
    flex: 1;
    padding-right: 45px;
    font-weight: 500;
    background-color: ${(props) => props.theme.grayLight};
    border: 1px solid transparent;
    transition: all 0.2s linear;

    &:focus {
      border-color: ${(props) => props.theme.primary};
      background-color: transparent;
    }
  }
  .about {
    background-color: ${(props) => props.theme.grayLight};
  }
  .search-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 25px;
  }
  @media screen and (max-width: 950px) {
    .menu,
    .logo {
      display: none;
    }
    .sidebarBtn {
      display: inline-block;
      margin-right: 1em;
      font-size: 2em;
    }
  }
  @media screen and (max-width: 540px) {
    .header-button {
      display: none;
    }
  }
`;
const Header = () => {
  const { userInfo } = useAuth();
  const [show, setShow] = useState(false);
  return (
    <HeaderStyles show={show}>
      <div className="container">
        <div className="header-main">
          <button className="sidebarBtn" onClick={() => setShow(true)}>
            <i class="bx bx-menu"></i>
          </button>
          <NavLink to="/">
            <img src="./logo.png" alt="monkey-blogging" className="logo" />
          </NavLink>
          <ul className="menu">
            {menuLinks.slice(0, 3).map((item) => (
              <li className="menu-item" key={item.title}>
                <NavLink to={item.url} className="menu-link">
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
          <ul className="sidebar">
            <div>
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-x-4">
                  <NavLink to="/">
                    <img
                      srcSet="/logo.png 2x"
                      alt="monkey-blogging"
                      className="logo-sidebar"
                    />
                  </NavLink>
                  <h2 className="font-semibold">Monkey Blogging</h2>
                </div>
                <span
                  className="text-3xl font-semibold cursor-pointer"
                  onClick={() => setShow(false)}
                >
                  <i class="bx bx-chevron-left"></i>
                </span>
              </div>
              <div className="px-5">
                <div className="search">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search posts..."
                  />
                  <span className="search-icon">
                    <svg
                      width="18"
                      height="17"
                      viewBox="0 0 18 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <ellipse
                        cx="7.66669"
                        cy="7.05161"
                        rx="6.66669"
                        ry="6.05161"
                        stroke="#999999"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893"
                        stroke="#999999"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826"
                        stroke="#999999"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="mt-5">
                {menuLinks.map((item) => (
                  <li
                    className="flex items-center justify-between link"
                    key={item.title}
                  >
                    <div className="flex items-center gap-x-4">
                      <span>{item.icon}</span>
                      <NavLink to={item.url} className="menu-link">
                        {item.title}
                      </NavLink>
                    </div>
                    <span>
                      <i class="bx bx-chevron-down"></i>
                    </span>
                  </li>
                ))}
              </div>
            </div>
            <div className="flex items-center p-5 about gap-x-4">
              <div className="w-10 h-10 rounded-full">
                <img
                  src="./technophile.png"
                  alt=""
                  className="object-cover w-full h-full rounded-full"
                />
              </div>
              <div>
                <h2 className="font-semibold">Huynh Vinh Do</h2>
                <span className="text-xs text-gray-600">
                  huynhvinhdo1603@gmail.com
                </span>
              </div>
            </div>
          </ul>
          <div className="search">
            <input
              type="text"
              className="search-input"
              placeholder="Search posts..."
            />
            <span className="search-icon">
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="7.66669"
                  cy="7.05161"
                  rx="6.66669"
                  ry="6.05161"
                  stroke="#999999"
                  strokeWidth="1.5"
                />
                <path
                  d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>
          {!userInfo ? (
            <Button
              type="button"
              height="56px"
              className="header-button"
              to="/sign-in"
            >
              Login
            </Button>
          ) : (
            <div className="header-auth">
              <Button
                type="button"
                height="56px"
                className="header-button"
                to="/dashboard"
              >
                Dashboard
              </Button>
            </div>
          )}
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;
