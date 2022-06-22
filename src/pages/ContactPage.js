import { Button } from "components/button";
import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";

const ContactStyles = styled.div`
  position: fixed;
  inset: 0;
  background-color: black;
  z-index: -1;
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    background-image: url(https://images.unsplash.com/photo-1651527567557-769ea053b0ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80);
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 80%;
    max-width: 1260px;
    padding: 2em;

    display: flex;
    justify-content: space-between;

    @media screen and (max-width: 800px) {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .left-content {
        display: none;
      }
      .right-content {
        width: 100%;
      }
    }
  }

  .left-content,
  .right-content {
    padding: 2em;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 50%;
  }

  .right-content {
    background-color: white;
    padding: 8em 3em;
    position: relative;

    form {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      row-gap: 2em;
    }
    .social-links {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: black;
      z-index: 100;
      bottom: 1em;
      right: 1em;
    }

    input {
      width: 100%;
      background-color: transparent;
      padding: 0.5em 0;
      border-bottom: 2px solid #ccc;
      color: gray;
      font-size: 0.9em;
    }
  }
`;

const HomeStyles = styled.span`
  position: fixed;
  bottom: 1em;
  right: 1em;
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

const ContactPage = () => {
  const navigate = useNavigate();
  const handleContact = () => {
    toast.success("Your feedbacks has been sent. Thank you so much!");
  };

  useEffect(() => {
    document.title = "Contact Me";
  }, []);
  return (
    <ContactStyles>
      <div className="content">
        <div className="justify-between left-content">
          <h2 className="font-semibold text-white uppercase">
            Monkey Blogging
          </h2>
          <h1 className="text-5xl font-semibold text-white">
            Don't be shy!<br></br> Let's say hi to me.
          </h1>
          <span className="text-sm text-white">huynhvinhdo1603@gmail.com</span>
        </div>
        <div className="right-content">
          <form onSubmit={() => handleContact()}>
            <h2 className="text-base font-semibold">
              Do you have any questions, suggestions or feedbacks? I'd love to
              hear from you!
            </h2>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="email@gmail.com" />
            <input type="text" placeholder="Your message" />
            <Button type="submit">Submit</Button>
          </form>
          <ul className="social-links">
            <li>
              <NavLink
                to={{ pathname: "https://github.com/Hvdodeptrai" }}
                className="mr-3"
              >
                <i className="font-semibold bx bxl-instagram"></i>
              </NavLink>
              <NavLink to="youtube.com">
                <i className="font-semibold bx bxl-facebook-circle"></i>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
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
    </ContactStyles>
  );
};

export default ContactPage;
