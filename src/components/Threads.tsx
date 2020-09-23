import React, { useReducer } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Timestamp from "./Timestamp";

type Post = {
  title: string;
  content: string;
  user: string;
  timestamp: any;
};

const Main = styled.div`
  padding: 10px;
  flex: 1;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow: auto;

  & > h1 {
    margin-top: 0;
    width: 100%;
  }
`;

const FeaturedPosts = styled.fieldset`
  border: 1px solid ${({ theme }) => theme.colors.borderGrey};
`;

const PostDiv = styled.div`
  width: 48%;
  border-radius: 8px;
  box-shadow: 0 0 4px ${({ theme }) => theme.colors.shadowGrey};
  padding: 10px;

  display: flex;
  flex-direction: column;
  margin: 10px;

  h6 {
    margin-top: 0;
    margin-bottom: 10px;
  }

  .content {
    min-height: 100px;
    color: ${({ theme }) => theme.colors.postTextColor};
    font-size: 14px;
    line-height: 1.6em;
  }

  &.featured {
    width: 100%;
  }
`;

const User = styled.div`
  display: flex;
  align-items: flex-end;
  font-style: italic;
`;

const UserImage = styled.div`
  border-radius: 50%;
  height: 30px;
  width: 30px;
  background-color: ${({ theme }) => theme.colors.secondaryDarkColor};
  margin-right: 5px;
`;

const postsReducer = (state: any, action: any) => {
  return state;
};

const Thread = () => {
  const { id } = useParams();
  const posts = [
    {
      title: "hello world",
      content:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos quidem optio aliquam reprehenderit natus modi! Quidem odio, fugiat explicabo veritatis provident ullam ut nemo quisquam, distinctio perspiciatis culpa delectus deleniti!",
      user: "User1",
      timestamp: 1600342039783,
    },
    {
      title: "Something exciting",
      content:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos quidem optio aliquam reprehenderit natus modi! Quidem odio, fugiat explicabo veritatis provident ullam ut nemo quisquam, distinctio perspiciatis culpa delectus deleniti!",
      user: "User2",
      timestamp: 1600342039783,
    },
  ];
  const featuredPosts = [
    {
      title: "Featured hello world",
      content:
        "Featured Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos quidem optio aliquam reprehenderit natus modi! Quidem odio, fugiat explicabo veritatis provident ullam ut nemo quisquam, distinctio perspiciatis culpa delectus deleniti!",
      user: "User2",
      timestamp: 1600842039783,
    },
  ];

  const [state, dispatch] = useReducer(postsReducer, { posts, featuredPosts });

  return (
    <Main>
      <h1>Thread {id}</h1>
      <FeaturedPosts>
        <legend>Featured Posts</legend>
        {state.featuredPosts.map((post: Post) => {
          return (
            <PostDiv className="featured">
              <h4>{post.title}</h4>
              <div className="content">{post.content}</div>
              <User>
                <UserImage />
                {post.user}
                <Timestamp timestamp={post.timestamp} />
              </User>
            </PostDiv>
          );
        })}
      </FeaturedPosts>

      {state.posts.map((post: Post) => {
        return (
          <PostDiv>
            <h4>{post.title}</h4>
            <div className="content">{post.content}</div>
            <User>
              <UserImage />
              {post.user}
              <Timestamp timestamp={post.timestamp} />
            </User>
          </PostDiv>
        );
      })}
    </Main>
  );
};

export default Thread;
