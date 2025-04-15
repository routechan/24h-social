import React from "react";
import { motion } from "framer-motion"; 
import Comment from "./Comment";
import CommentSubmit from "./CommentSubmit";

const CommentsArea = ({postId,comments, setShowComments }) => {
  return (
    <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="absolute inset-0 bg-white rounded-2xl overflow-y-auto"
          >
            <div className="p-4 border-b sticky top-0 bg-white z-10 flex justify-between items-center">
              <h3 className="font-semibold">コメント</h3>
              <button
                onClick={() => setShowComments(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                ×
              </button>
            </div>
            <div className="p-4 space-y-4">
                <CommentSubmit postId={postId}/>
                {/* 一つ一つのコメント */}
            {comments.map((comment) => (
<Comment key={comment.id} comment={comment}/>
            ))
            }
            </div>
            </motion.div>
  );
};

export default CommentsArea;
