import React, { useContext } from 'react';
import styled from 'styled-components';

import { DataContext, Post as PostType } from '../App';
import { ThreadContext } from './Threads';
import Timestamp from "./Timestamp";

interface Props {
  post: PostType,
}

const PostDiv = styled.div`
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 0 4px ${({ theme }) => theme.colors.shadowGrey};
  padding: 10px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 5px;

  h6 {
    width: 100%;
    margin-top: 0;
    margin-bottom: 10px;
  }

  .content {
    width: 100%;
    min-height: 100px;
    color: ${({ theme }) => theme.colors.postTextColor};
    font-size: 14px;
    line-height: 1.6em;
  }
`;

const User = styled.div`
  display: flex;
  align-items: flex-end;
  font-style: italic;
  width: 50%;
`;

const UserImage = styled.div`
  border-radius: 50%;
  height: 30px;
  width: 30px;
  background-color: ${({ theme }) => theme.colors.secondaryDarkColor};
  margin-right: 5px;
`;

const Replies = styled.fieldset`
  border: 1px solid ${({ theme }) => theme.colors.borderGrey};
  padding: 10px;
  margin-top: 20px;
  width: 100%;
`;

const ReplyButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 4px;
  padding: 10px 20px;
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.white};
`;

const Post: React.FC<Props> = ({ post }) => {
  const { id, title, content, user, timestamp, replies } = post;

  const threadContext = useContext(ThreadContext);
  const dataContext = useContext(DataContext);

  const { thread } = threadContext;
  console.log(replies.length);
  return (
    <PostDiv>
      <h4>{title ? title : `${content.substr(0, 10)}...`}</h4>
      <div className="content">{content}</div>
      <User>
        <UserImage />
        {user}
        <Timestamp timestamp={timestamp} />
      </User>
      <ReplyButton onClick={() => dataContext.openPostEditor(true, id, thread.id)}>Reply</ReplyButton>

      {
        replies && replies.length > 0 &&
        <Replies>
          <legend>Replies</legend>
          {
            replies.map((replyId) => {
              return <Post key={replyId} post={thread.posts[replyId - 1]} />
            })
          }
        </Replies>
      }
    </PostDiv>
  );
}

export default Post;