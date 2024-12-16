import { useAuth } from "../contexts/AuthContext";
import "./navbar.css";
const Navbar = () => {
	const { user, loginWithGoogle, logout } = useAuth();

	const handleGoogleLogin = async () => {
		try {
			await loginWithGoogle();
		} catch (error) {
			console.error("Login failed:", error);
			alert("Login failed. Please try again.");
		}
	};

	const handleLogout = async () => {
		try {
			await logout();
		} catch (error) {
			console.error("Logout failed:", error);
			alert("Logout failed. Please try again.");
		}
	};

	return (
		<div className="navbar">
			<div className="navbar-content">
				<div className="game-name">DungeonHeist</div>
				{user ? (
					<div className="flex items-center gap-4">
						{/* <span className="text-sm text-gray-300">{user.email}</span> */}
						{/* Show user profile pic */}
						<button className="google-login" onClick={handleLogout}>
							Logout
						</button>
					</div>
				) : (
					<button className="google-login" onClick={handleGoogleLogin}>
						Login with Google
					</button>
				)}
			</div>
		</div>
	);
};

export default Navbar;
