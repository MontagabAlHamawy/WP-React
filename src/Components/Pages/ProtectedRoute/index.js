
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute({authUser , children}) {

    if(!authUser.token){
        return<Navigate to={'/login'}/>
    }
  return (
    <div>{<Outlet/>}</div>
  )
}

export default ProtectedRoute