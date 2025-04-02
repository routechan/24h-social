import PostReply from './PostReply'

const PostReplies = ({replies}) => {

  return (
    <>
    {replies.map((reply)=>(
<PostReply key={reply.id} reply={reply}/>
  ))}
  </>
    
  )
}

export default PostReplies