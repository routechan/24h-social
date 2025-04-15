import FollowerItem from './FollowerItem'

const FollowerList = ({followersData}) => {
  return (
    <>
    <h2>フォロワー一覧</h2>
      {followersData.map((followerData) => (
        <FollowerItem key={`${followerData?.followingId}`} followerData={followerData}/>
      ))}
    </>
  )
}

export default FollowerList