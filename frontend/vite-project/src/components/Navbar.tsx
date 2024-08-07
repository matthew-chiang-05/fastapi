import { NavContainer, NavItem, NavLinks, NavMenu } from "./NavbarStyles";

export const Navbar = () => {
  return (
    <NavContainer>
      <NavLinks to="/">SocialSync</NavLinks>
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
      </NavMenu>
    </NavContainer>
  );
};
