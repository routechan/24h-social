import Sidebar from "@/app/components/layouts/Sidebar"
import TimelinePostForm from "./TimelinePostForm"
import TimelinePosts from "./TimelinePosts"
import Header from "@/app/components/layouts/Header"

const Timeline = () => {
  return (
    <div>
      <Header/>
    <div className="max-w-2xl mx-auto px-4 pb-20 ">

       
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