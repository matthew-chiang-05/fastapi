import { useAuth } from "./AuthContext";
import {
  LogoutButton,
  NavContainer,
  NavItem,
  NavLinks,
  NavMenu,
} from "./NavbarStyles";

export const Navbar = () => {
  const { logout } = useAuth();
  return (
    <NavContainer>
      <NavLinks to="/home">SocialSync</NavLinks>
      <NavMenu>
        <NavItem>
          <NavLinks to="/post">Create</NavLinks>
        </NavItem>
        <NavItem>
          <NavLinks to="/friends">Friends</NavLinks>
        </NavItem>
        <NavItem>
          <NavLinks to="/profile">Profile</NavLinks>
        </NavItem>
        <NavItem>
          <NavLinks to="/login">
            <LogoutButton onClick={logout}>Logout</LogoutButton>
          </NavLinks>
        </NavItem>
      </NavMenu>
    </NavContainer>
  );
};
