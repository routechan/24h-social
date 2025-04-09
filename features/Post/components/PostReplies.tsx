import PostReply from './PostReply'

const PostReplies = ({replies}) => {

  return (
    <>
   {Array.isArray(replies) ? (
    replies.map((reply) => (
      <PostReply key={reply.id} reply={reply} />
    ))
  ) : (
    <p>返信がありません</p>
  )}
  </>
    
  )
}

export default PostReplies