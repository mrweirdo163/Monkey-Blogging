import React, { useEffect, useState } from "react";
import img from "../assets/blog_image.jpg";
import styled from "styled-components";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
import PostFeature from "module/post/PostFeature";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import BigTitle from "subComponent/BigTitle";

const MainContainer = styled.div`
  background-image: url(${img});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
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

const Container = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding-bottom: 5rem;
`;

const SearchInput = styled.input`
  position: absolute;
  padding: 0.5em 2em;
  top: 2em;
  right: 2em;
  background: transparent;
  border-radius: 8px;
  border: 2px solid black;

  ::placeholder {
    color: ${(props) => props.theme.grayDark};
  }
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10rem;

  @media (max-width: 40em) {
    padding-top: 7rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(calc(10rem + 15vw), 1fr));
  grid-gap: calc(1rem + 2vw);

  @media (max-width: 50em) {
    grid-template-columns: 100%;
  }
`;

const BlogPage = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    document.title = "Blogs";
  }, []);

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
  console.log(userList);

  const handleSearchPost = debounce((e) => {
    setFilter(e.target.value);
  }, 250);

  return (
    <MainContainer>
      <Container>
        <SearchInput
          placeholder="Search post..."
          onChange={handleSearchPost}
        ></SearchInput>
        <Center className="container">
          <Grid>
            {userList.map((user) => (
              <PostFeature filter={filter} user={user}></PostFeature>
            ))}
          </Grid>
        </Center>
        <BigTitle text="BLOG" top="3rem" left="5rem" />
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
      </Container>
    </MainContainer>
  );
};

export default BlogPage;
