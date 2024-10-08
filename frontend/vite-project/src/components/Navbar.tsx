import { useAuth } from "./AuthContext";
import { NavContainer, NavItem, NavLinks, NavMenu } from "./NavbarStyles";

export const Navbar = () => {
  const { logout, isAuthenticated } = useAuth();
  return (
    <NavContainer>
      <NavLinks to="/">SocialSync</NavLinks>
      <NavMenu>
        <NavItem>
          <NavLinks to="/post">Post</NavLinks>
        </NavItem>
        <NavItem>
          <NavLinks to="/friends">Friends</NavLinks>
        </NavItem>
        <NavItem>
          {!isAuthenticated && <NavLinks to="/login">Login</NavLinks>}
          {isAuthenticated && (
            <NavLinks to="/login" onClick={logout}>
              Logout
            </NavLinks>
          )}
        </NavItem>
      </NavMenu>
    </NavContainer>
  );
};
