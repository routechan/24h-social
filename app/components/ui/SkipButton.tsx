import React from 'react'

const SkipButton = ({onClickSkip,translateX}) => {
  return (
    <button onClick={onClickSkip} className={`flex gap-1 cursor-pointer  shadow-md rounded-full w-18 h-18 absolute -bottom-6 left-8  justify-center items-center z-40 duration-200 hover:scale-105 active:bg-blue-100
      ${translateX == 0 && "bg-white/80"}
        ${translateX >= 1 && "scale-90 opacity-30"}
        ${translateX <= -1 && "scale-120 bg-gradient-to-br from-sky-400 to-blue-400"}
    `}>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  fill={`${translateX <= -1 ? "white" : "oklch(67.3% 0.182 276.935)"}`} className="size-12">
  <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clipRule="evenodd" />
</svg>


  </button>
  )
}

export default SkipButton