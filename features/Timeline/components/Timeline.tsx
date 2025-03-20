import TimelinePostForm from "./TimelinePostForm"
import TimelinePosts from "./TimelinePosts"

const Timeline = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6 border-x h-dvh">
        <TimelinePostForm/>
            <TimelinePosts/>
    </div>
  )
}

export default Timeline