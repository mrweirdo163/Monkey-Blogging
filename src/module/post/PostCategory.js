import { db } from "firebase-app/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

const PostCategoryStyles = styled.div`
  display: inline-block;
  border-radius: calc(0.2vw + 0.3em);
  padding: 4px 10px;
  color: #6b6b6b;
  font-size: calc(0.5vw + 0.5em);
  font-weight: 600;

  @media screen and (max-width: 1070px) {
    margin-right: calc(0.5em + 0.5vw);
  }
  a {
    font-weight: inherit;
    display: block;
  }
  ${(props) =>
    props.type === "primary" &&
    css`
      background-color: ${(props) => props.theme.grayF3}; ;
    `};
  ${(props) =>
    props.type === "secondary" &&
    css`
      background-color: white;
    `};
  ${(props) =>
    props.type === "light" &&
    css`
      background-color: ${(props) => props.theme.grayLight};
    `};
`;

const PostCategory = ({
  children,
  type = "primary",
  className = "",
  categoryId = "",
}) => {
  console.log(categoryId);
  const [category, setCategory] = useState("");
  useEffect(() => {
    async function fetch() {
      const docRef = doc(db, "categories", categoryId);
      const docSnap = await getDoc(docRef);
      setCategory(docSnap.data());
    }
    fetch();
  }, [categoryId]);
  console.log(category);
  return (
    <PostCategoryStyles type={type} className={`post-category ${className}`}>
      {children || category?.name}
    </PostCategoryStyles>
  );
};

export default PostCategory;
