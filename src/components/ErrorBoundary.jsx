import{Component}from"react";import{HiExclamation}from"react-icons/hi";

export default class ErrorBoundary extends Component{
  constructor(props){
    super(props);
    this.state={hasError:false,error:null};
  }
  static getDerivedStateFromError(error){
    return{hasError:true,error};
  }
  componentDidCatch(error,info){
    console.error("ErrorBoundary caught:",error,info);
  }
  render(){
    if(this.state.hasError){
      return(
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 dark:bg-red-900/30 flex items-center justify-center">
              <HiExclamation size={32} className="text-red-500"/>
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Something went wrong</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">An unexpected error occurred. Please try refreshing the page.</p>
            <details className="text-left mb-4">
              <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-600">Error details</summary>
              <pre className="mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-xs text-red-600 dark:text-red-400 overflow-x-auto whitespace-pre-wrap">
                {this.state.error?.toString()||"Unknown error"}
              </pre>
            </details>
            <button onClick={()=>{this.setState({hasError:false,error:null});window.location.href="/"}} className="px-6 py-3 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition-colors">
              Go to Home
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}