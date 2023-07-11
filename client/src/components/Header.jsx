import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="fixed inset-x-0 py-4 px-8 border-b flex items-center justify-between">
        <div className="font-medium text-2xl">CollaboSphere</div>
        <Link to={'/login'} className="bg-[#407bff] text-white py-1 px-3 rounded-md">Sign in</Link>
    </header>
  )
}

export default Header