import{useNavigate}from"react-router-dom";import{HiHome,HiSearch}from"react-icons/hi";

export default function NotFound(){
  const nav=useNavigate();
  return(
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-8xl mb-4">🔍</div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">404</h1>
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">Page Not Found</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">The page you're looking for doesn't exist or has been moved.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={()=>nav("/")} className="flex items-center gap-2 px-5 py-3 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition-colors">
            <HiHome size={16}/> Go Home
          </button>
          <button onClick={()=>nav("/search")} className="flex items-center gap-2 px-5 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <HiSearch size={16}/> Search
          </button>
        </div>
      </div>
    </div>
  );
}