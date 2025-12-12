import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Navigate } from "react-router-dom";
import { updateToken } from "../redux/Slice/authSlice";
import { useEffect } from "react";
import { Scissors } from "lucide-react";

interface Props {
	allowedRoles: string[];
	layout: React.ComponentType;
}

// export const RoleBasedLayout: React.FC<Props> = ({
//   allowedRoles,
//   layout: Layout,
// }) => {
//   let { user, token } = useAppSelector((state) => state.auth);
//   const dispatch = useAppDispatch();
//   // if(!token){
//   //   token=localStorage.getItem("token")
//   // }
// console.log("i am here ")
//   if (!user) {
//     dispatch(updateToken());
//   }
// // setTimeout( ()=>{},2000)
//   if (!token) return <Navigate to="/" replace />;
//   if (user && !allowedRoles.includes(user.role))
//     return <Navigate to="/unauthorized" replace />;

//   return <Layout />;
// };

export const RoleBasedLayout: React.FC<Props> = ({
	allowedRoles,
	layout: Layout,
}) => {
	const dispatch = useAppDispatch();
	const { user, token, loading } = useAppSelector((state) => state.auth);

	// Restore user/token on initial load
	useEffect(() => {
		if (!token || !user) {
			dispatch(updateToken());
		}
	}, []);

	// 🔥 IMPORTANT: Wait until Redux loads token
	if (loading) {
		// return <div>Loading...</div>;
		return (
			<div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
				<div className="flex flex-col items-center">
					<div className="animate-bounce">
						<Scissors className="w-16 h-16 text-pink-600 animate-spin-slow" />
					</div>

					<p className="mt-3 text-base font-semibold text-gray-700 animate-pulse">
						Loading...
					</p>
				</div>
			</div>
		);
	}

	if (!token) return <Navigate to="/" replace />;

	if (user && !allowedRoles.includes(user.role))
		return <Navigate to="/unauthorized" replace />;

	return <Layout />;
};
