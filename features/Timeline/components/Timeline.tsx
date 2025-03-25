import Sidebar from "@/app/components/layouts/Sidebar"
import TimelinePostForm from "./TimelinePostForm"
import TimelinePosts from "./TimelinePosts"
import TimelineSwitch from "./TimelineSwitch"

const Timeline = () => {
  


  return (
    <div className="w-3/5 mx-auto  border-x min-h-full">
      <Sidebar/>
        <TimelineSwitch/>
        <div className="mt-14">
        <TimelinePostForm/>
            <TimelinePosts/>
            </div>
    </div>
  )
}

export default Timeline