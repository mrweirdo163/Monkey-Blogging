import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot } from "firebase/firestore";
import PostFeature from "module/post/PostFeature";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Swiper } from "swiper/react";
import Heading from "../../components/layout/Heading";

const HomeFeatureStyles = styled.div`
  .view-all {
    font-size: 1em;
    color: ${(props) => props.theme.tertiary};
    font-weight: 600;
    cursor: pointer;
    position: relative;
    &:before {
      content: "";
      width: calc(1em + 1vw);
      height: 4px;
      background-color: ${(props) => props.theme.accent};
      position: absolute;
      bottom: 0;
      right: 0;
      transform: translate(0, 150%);
    }
  }
`;

const HomeFeature = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "users");
    onSnapshot(colRef, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUserList(results);
    });
  }, []);
  if (userList.length <= 0) return null;
  return (
    <HomeFeatureStyles className="home-block">
      <div className="container">
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          <div className="flex items-center justify-between">
            <Heading>Feature</Heading>
            <span onClick={() => navigate("/blog")} className="view-all">
              View all
            </span>
          </div>
          <div className="grid-layout">
            {userList.slice(0, 2).map((user) => (
              <PostFeature user={user}></PostFeature>
            ))}
          </div>
        </Swiper>
      </div>
    </HomeFeatureStyles>
  );
};

export default HomeFeature;
