
const Header = () => {
  return (
    <header className="bg-white border-b border-purple-100 fixed top-0 w-full z-10">
    <div className="max-w-2xl mx-auto px-4 py-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
         
          <h1 className="text-xl font-bold text-purple-700">24h-social</h1>
        </div>
        <div className="flex space-x-4">
          <button 
           
          >
            すべて
          </button>
          <button >
            フォロー中
          </button>
        </div>
      </div>
    </div>
  </header>
  )
}

export default Header