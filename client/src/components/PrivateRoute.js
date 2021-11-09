import {Route,Redirect} from 'react-router-dom'
import {useLogin} from '../contexts/LoginContext'

export default function PrivateRoute({component:Component,path,role,exact,...rest}) {
	const {isLoggedIn,setToast,userStatus} = useLogin()
	return (
		<Route
			{...path}
			{...exact}
			render={
				(props)=>{
					if(isLoggedIn()){
						if(!role.includes(userStatus?.data?.userRole)){
							setToast({title:'Action disabled',desc:'You are unauthorized to perform this action'})
							return <Redirect to="/" />
						}
						return	<Component {...props} {...rest} />
					}else{
						return <Redirect to='/' />
					} 
				}
			}
		/>
	)
}