import { Button } from "components/button";
import React from "react";
import styled from "styled-components";

const HomeBannerStyles = styled.div`
  position: relative;
  margin-bottom: 4em;
  padding: 0 3em;
  display: flex;
  justify-content: center;
  align-items: center;
  .overlay {
    position: absolute;
    inset: 0;
    border-radius: 10px;
    background: linear-gradient(
      179.77deg,
      #6b6b6b 36.45%,
      rgba(163, 163, 163, 0.622265) 63.98%,
      rgba(255, 255, 255, 0) 99.8%
    );
    mix-blend-mode: multiply;
    opacity: 0.6;
  }
  .container-fluid {
    height: min(520px, 100vh);
    width: calc(10em + 70vw);
    padding: 0 20px;
    position: relative;
    border-radius: 10px;
    background-image: url(https://images.unsplash.com/photo-1614624532983-4ce03382d63d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80);
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;

    @media screen and (max-width: 525px) {
      width: 480px;
    }
  }
  .banner {
    display: flex;
    padding: 3em;
    align-items: center;
    position: relative;
    z-index: 10;
    &-content {
      width: min(500px, 60vw);
      display: flex;
      flex-direction: column;
      color: white;
      margin-right: min(4em, 7vw);
      h1 {
        font-size: calc(1.5em + 1.2vw);
        margin-bottom: 0.6em;
      }
      p {
        font-size: min(0.9em, 3vw);
        line-height: min(28px, 4vw);
      }
    }
  }
`;

const HomeBanner = () => {
  return (
    <HomeBannerStyles>
      <div className="container-fluid">
        <div className="overlay"></div>
        <div className="banner">
          <div className="banner-content">
            <h1>Monkey Blogging</h1>
            <p>
              Hi, I am Vinh Do - A front-end developer base in Vietnam. Here is
              my Blogging Project, you can post your blogs, write your feeling
              and sharing interesting things with other people. Click the button
              to explore something new - Have fun my friends!
            </p>
            <Button
              to="/sign-up"
              kind="secondary"
              className="mt-10"
              style={{
                fontSize: "min(1.1em, 3vw)",
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </HomeBannerStyles>
  );
};

export default HomeBanner;
