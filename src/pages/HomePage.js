import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../components/layout/Layout";
import HomeBanner from "../module/home/HomeBanner";
import HomeFeature from "../module/home/HomeFeature";
import HomeNewest from "../module/home/HomeNewest";

const HomePageStyles = styled.div`
  .spinner {
    border-color: ${(props) => props.theme.primary};
    border-right-color: transparent;
  }
`;

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    document.title = "Monkey Blogging";
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <HomePageStyles>
      <Layout>
        <HomeBanner></HomeBanner>
        {isLoading ? (
          <div className="w-10 h-10 mx-auto border-4 rounded-full spinner animate-spin "></div>
        ) : (
          <>
            <HomeFeature></HomeFeature>
            <HomeNewest></HomeNewest>
          </>
        )}
      </Layout>
    </HomePageStyles>
  );
};

export default HomePage;
