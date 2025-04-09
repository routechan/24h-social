import TimelinePostForm from "./TimelinePostForm"
import TimelinePosts from "./TimelinePosts"

const Timeline = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 pb-20 ">
        <div className="mt-14">
        <TimelinePostForm/>
            <TimelinePosts/>
            </div>
    </div>
   
  )
}

export default Timeline