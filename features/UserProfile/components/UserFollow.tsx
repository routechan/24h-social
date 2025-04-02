import React from 'react'

const UserFollow = () => {
  return (
    <div className="mt-4 flex space-x-6 border-t border-gray-100 pt-4">
    <div>
      <span className="font-bold text-gray-900">33</span>
      <span className="text-gray-600 ml-1">フォロー中</span>
    </div>
    <div>
      <span className="font-bold text-gray-900">12</span>
      <span className="text-gray-600 ml-1">フォロワー</span>
    </div>
  </div>
  )
}

export default UserFollow