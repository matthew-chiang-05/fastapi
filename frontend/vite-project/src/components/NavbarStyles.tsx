import { styled } from "styled-components";
import { Link } from "react-router-dom";

export const NavContainer = styled.nav`
  background-color: #333;
  height: 60px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  z-index: 10;
  padding: 0 20px;
  top: 0;
  left: 0;
  font-size: 1.25rem;
`;

export const NavLogo = styled.a``;

export const NavMenu = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  height: 100%;
  margin-right: 30px;
  list-style: none;
`;

export const NavItem = styled.li`
  height: 60px;
`;

export const NavLinks = styled(Link)`
  color: white;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  font-size: 1.25rem;
`;
