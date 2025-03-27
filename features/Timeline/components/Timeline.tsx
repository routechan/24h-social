import Sidebar from "@/app/components/layouts/Sidebar"
import TimelinePostForm from "./TimelinePostForm"
import TimelinePosts from "./TimelinePosts"
import Header from "@/app/components/layouts/Header"

const Timeline = () => {
  return (
    <div>
      <Header/>
    <div className="w-3/5 mx-auto h-full ">

       
        <div className="mt-14">
        <TimelinePostForm/>
            <TimelinePosts/>
            </div>
    </div>
    <Sidebar/>
    </div>
  )
}

export default Timeline