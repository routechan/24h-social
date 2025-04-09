import FollowItem from './FollowItem'

const FollowList = ({followsData}) => {
  return (
    <>
        <h2>フォロー一覧</h2>
    
      {followsData.map((followData) => (
        <FollowItem key={`${followData?.id}`} followData={followData}/>
      ))}
    
    </>
  )
}

export default FollowList