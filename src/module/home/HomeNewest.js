import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Heading from "../../components/layout/Heading";
import PostNewestItem from "../post/PostNewestItem";
import PostNewestLarge from "../post/PostNewestLarge";

const HomeNewestStyles = styled.div`
  .layout {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 40px;
    margin-bottom: 64px;
    align-items: start;
  }
  .sidebar {
    padding: 28px 20px;
    background-color: #f3edff;
    border-radius: 16px;
  }
  @media screen and (max-width: 1023.98px) {
    .layout {
      grid-template-columns: 100%;
    }
    .sidebar {
      padding: 14px 10px;
    }
  }
`;

const HomeNewest = () => {
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

  const random = Math.floor(Math.random(0, 1) * 2);
  const user = userList[random];

  if (userList.length <= 0) return null;
  return (
    <HomeNewestStyles className="home-block">
      <div className="container">
        <Heading>Newest Update</Heading>
        <div className="layout">
          <PostNewestLarge userList={userList}></PostNewestLarge>
          <div className="sidebar">
            <PostNewestItem user={user}></PostNewestItem>
          </div>
        </div>
      </div>
    </HomeNewestStyles>
  );
};

export default HomeNewest;
