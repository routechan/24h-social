"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import CommentsArea from "./CommentsArea";
import CardHeader from "./CardHeader";
import { motion } from "framer-motion";
import { animationVariants } from "@/lib/animationVariants";


// ランダムで文字アニメーションを決定
const getRandomVariant = () =>
  animationVariants[Math.floor(Math.random() * animationVariants.length)];

const Card = ({
  userId,
  nextCard,
  card,
  disabled = false,
  showComments,
  setShowComments,
}: {
  userId:string;
  nextCard:boolean;
  card: any;
  disabled?: boolean;
  showComments: boolean;
  setShowComments: (show: boolean) => void;
}) => {

  const animation = getRandomVariant();

  return (
    <div
      className={`bg-white rounded-2xl shadow-lg px-6 py-6 md:p-4 flex flex-col w-full h-full select-none cursor-grab active:cursor-grabbing ${
        disabled ? "pointer-events-none " : ""
      }`}
    >
      <CardHeader
      userId={userId}
      time={card.createdAt}
        likes={card.likes}
        commentCount={card.replies.length}
      />

      <div className="flex flex-col items-center gap-2 mt-6">
        <Link href={`/user/${card.user?.id}`}>
          <Avatar className="w-25 h-25 md:w-20 md:h-20 rounded-full overflow-hidden duration-200 hover:scale-105">
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
        </Link>
        <p className=" text-[#0d0d0d]">{card.user?.name}</p>
      </div>

      <motion.div
        className="mt-15 md:mt-10 px-2 text-center"
        initial={animation.initial}
        animate={animation.animate}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className={`text-xl md:text-lg font-bold text-[#0d0d0d] ${nextCard && "hidden"} `}>
          {card.content}
        </p>
      </motion.div>

      {showComments && (
        <CommentsArea
          postId={card.id}
          comments={card.replies}
          setShowComments={setShowComments}
        />
      )}
    </div>
  );
};

export default Card;
