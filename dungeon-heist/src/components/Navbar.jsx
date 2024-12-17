import { useAuth } from "../contexts/AuthContext";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { CustomAvatar } from "../components/CustomAvatar";
import "./navbar.css";

const Navbar = () => {
	const { user, logout } = useAuth();
	const { openConnectModal } = useConnectModal();

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
						<div className="flex items-center gap-2">
							<CustomAvatar address={user.address} size={32} />
							<span className="text-sm text-gray-300">
								{user.address.slice(0, 2)}...{user.address.slice(-4)}
							</span>
						</div>
						<button className="google-login" onClick={handleLogout}>
							Disconnect
						</button>
					</div>
				) : (
					<button className="google-login" onClick={openConnectModal}>
						Connect Wallet
					</button>
				)}
			</div>
		</div>
	);
};

export default Navbar;
