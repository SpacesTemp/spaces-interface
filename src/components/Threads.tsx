import React, { useState, useReducer } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Slider from '@material-ui/core/Slider';

import Timestamp from "./Timestamp";

type Post = {
  title: string;
  content: string;
  user: string;
  timestamp: any;
};

const Main = styled.div`
  position: relative;
  padding: 10px;
  flex: 1;
  height: calc(100% - 40px);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow: auto;
  align-items: flex-start;
  align-content: flex-start;

  & > h1 {
    margin-top: 0;
    width: 100%;
  }
`;

const FeaturedPosts = styled.fieldset`
  border: 1px solid ${({ theme }) => theme.colors.borderGrey};
`;

const PostDiv = styled.div`
  width: 47%;
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
    width: 97%;
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

const AddPost = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.black};
  position: absolute;
  top: 20px;
  right: 10px;
  padding: 10px 20px;
`;

const Modal = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.modalBackground};
`;

const Close = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const ModalBody = styled.div`
  height: 80%;
  width: 80%;
  margin: auto;
  position: relative;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
`;

const PostForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 24px;

  input, textarea {
    width: 100%;
    border: 1px solid ${({ theme }) => theme.colors.borderGrey};
    border-radius: 4px;
    padding: 8px;
    margin: 8px 0;
  }

  label {
    margin: 16px 0 0;
  }

  button {
    margin: 8px auto;
    border-radius: 8px;
    text-align: center;
    padding: 15px 60px;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const postsReducer = (state: any, action: any) => {
  const newState = { ...state };
  switch (action.type) {
    case 'ADD_POST':
      newState.posts.push(action.post);
      return newState;
  }

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

  let isPaid = false;
  if (id == 2) {
    isPaid = true;
  }

  const [state, dispatch] = useReducer(postsReducer, { posts, featuredPosts });
  const [showPostModal, togglePostModal] = useState(false);

  const submitPost = (event: React.FormEvent) => {
    event.preventDefault();
    const { postTitle, content } = (event.target as HTMLFormElement);
    if (!postTitle.value || !content.value) {
      return;
    }

    dispatch({
      type: 'ADD_POST',
      post: {
        title: (postTitle as HTMLInputElement).value,
        content: (content as HTMLTextAreaElement).value,
        user: 'User2',
        timestamp: Date.now(),
      }
    });
    (event.target as HTMLFormElement).reset();
    togglePostModal(false);
  }

  console.log(state);

  return (
    <Main>
      <h1>Thread {id}</h1>
      <AddPost onClick={() => togglePostModal(!showPostModal)}>
        Add Post
      </AddPost>
      {
        !isPaid &&
        <FeaturedPosts>
          <legend>Featured Posts</legend>
          {state.featuredPosts.map((post: Post, index: number) => {
            return (
              <PostDiv className="featured" key={index}>
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
      }

      {state.posts.map((post: Post, index: number) => {
        return (
          <PostDiv key={index}>
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

      {showPostModal && (
        <Modal>
          <ModalBody>
            <Close onClick={() => togglePostModal(!showPostModal)}>Close</Close>
            <PostForm onSubmit={submitPost}>
              <h3>Add a post</h3>

              <label htmlFor="postTitle">Title:</label>
              <input name="postTitle" type="text" />

              <label htmlFor="content">Content:</label>
              <textarea name="content" rows={10} />
              {
                isPaid && <Slider
                  defaultValue={0.5}
                  aria-labelledby="Donation"
                  valueLabelDisplay="on"
                  step={0.1}
                  marks
                  min={0.00}
                  max={2}
                  name="donation"
                />
              }
              <button type="submit">Submit</button>
            </PostForm>
          </ModalBody>
        </Modal>
      )}
    </Main>
  );
};

export default Thread;
