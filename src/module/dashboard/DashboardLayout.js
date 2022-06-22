import { useAuth } from "contexts/auth-context";
import { auth } from "firebase-app/firebase-config";
import { signOut } from "firebase/auth";
import PageNotFound from "pages/PageNotFound";
import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import Swal from "sweetalert2";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";

const sidebarLinks = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
  },
  {
    title: "Post",
    url: "/manage/posts",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    title: "Category",
    url: "/manage/category",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
        />
      </svg>
    ),
  },
  {
    title: "User",
    url: "/manage/user",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
  {
    title: "Log out",
    url: "/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
    ),
    onClick: () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1DC071",
        cancelButtonColor: "#ef233c",
        confirmButtonText: "Yes, log out!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          signOut(auth);
          Swal.fire("Logged out!", "You have been logged out.", "success");
        }
      });
    },
  },
];

const DashboardStyles = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  .dashboard {
    &-heading {
      font-weight: bold;
      font-size: 25px;
      margin-bottom: 5px;
      color: ${(props) => props.theme.black};
    }
    &-short-desc {
      font-size: 14px;
      color: ${(props) => props.theme.gray80};
    }
    &-main {
      display: grid;
      grid-template-columns: 300px minmax(0, 1fr);
      padding: 40px 20px;
      gap: 0 40px;
      align-items: start;
    }
    @media screen and (max-width: 1023.98px) {
      &-heading {
        font-size: 20px;
      }
      &-main {
        grid-template-columns: 100%;
        padding: 20px;
      }
    }
  }

  .logo-sidebar {
    display: block;
    max-width: 40px;
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
`;

const HomeStyles = styled.span`
  position: fixed;
  bottom: 1em;
  left: 1em;
  padding: 1em;
  background-color: ${(props) => props.theme.primary};
  border-radius: 100%;
  cursor: pointer;
  z-index: 100;

  svg {
    color: white;
    font-weight: 600;
  }
`;

const MenuStyles = styled.button`
  position: fixed;
  top: 1em;
  left: 1em;
  padding: calc(0.5em + 0.5vw);
  border-radius: 100%;
  cursor: pointer;
  z-index: 100;
  display: none;

  i {
    font-weight: 600;
    font-size: calc(1em + 1vw);
  }

  @media screen and (max-width: 1023.98px) {
    display: inline-block;
  }
`;
const DashboardLayout = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  const { userInfo } = useAuth();
  if (!userInfo) return <PageNotFound></PageNotFound>;

  return (
    <DashboardStyles show={show}>
      <DashboardHeader></DashboardHeader>
      <div className="dashboard-main">
        <HomeStyles onClick={() => navigate("/")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </HomeStyles>
        <MenuStyles onClick={() => setShow(true)}>
          <i class="bx bx-menu"></i>
        </MenuStyles>
        <Sidebar></Sidebar>
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
              {sidebarLinks.map((item) => (
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
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
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
        <div className="dashboard-children">
          <Outlet></Outlet>
        </div>
      </div>
    </DashboardStyles>
  );
};

export default DashboardLayout;
