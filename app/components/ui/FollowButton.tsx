"use client"
import { followUser, removeUser } from '@/app/actions/followActions'
import { mutate } from 'swr';

const FollowButton = ({ followingId, followedId, follower, user }) => {

  if (!user || !follower) return null; // ユーザーが存在しない場合は何も表示しない
  const isFollowed = follower.some(f => f.followingId === user.id);//フォロワーリストの中にログイン中のユーザーが存在するかをチェック




  // フォローボタン押下時
  const followClick = async () => {
    await followUser(followingId, followedId);
    mutate(`/api/profile/${followedId}`)
  }

  //フォロー解除ボタン押下時
  const removeClick = async () =>{
    await removeUser(followingId,followedId)
    mutate(`/api/profile/${followedId}`)
  }


  return (
    <>
      {isFollowed ? (
        <button
        onClick={removeClick}
        className="cursor-pointer px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition"
      >
        フォロー中
      </button>
      ) : (
        <button
        onClick={followClick}
        className="cursor-pointer px-4 py-2 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition"
      >
        フォロー
      </button>
      )}
    </>
  )
}

export default FollowButton;
