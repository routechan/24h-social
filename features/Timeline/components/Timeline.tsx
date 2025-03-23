import TimelinePostForm from "./TimelinePostForm"
import TimelinePosts from "./TimelinePosts"
import TimelineSwitch from "./TimelineSwitch"

const Timeline = () => {
  


  return (
    <div className="max-w-2xl mx-auto  border-x h-full ">

        <TimelineSwitch/>
        <div className="mt-14">
        <TimelinePostForm/>
            <TimelinePosts/>
            </div>
    </div>
  )
}

export default Timeline