import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Link, NavLink } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "../align.css";
import { AuthContextExport } from "../util/context/AuthContext";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";

function NavigationBar() {
  const defaultProfilePic = 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/255px-Flag_of_India.svg.png';
  const cartData = useSelector((state) => state.cartReducer);
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));
  const { token, role } = AuthContextExport();
  const pages = token && role=='USER'
    ? ["home", "products", "orders"]
    : token && role=='AFFILIATE'? ["home", "products"]: ["home", "products", "register", "login"];
  const settings = token ? ["dashboard", "logout"] : ["register", "login"];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#fac105" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters> 
          <ShoppingCartIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1, color: "#2a55e5" }}
          />
          <NavLink to={"./"} className={"a"}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#2a55e5",
                textDecoration: "none",
              }}
            >
              FlipZon
            </Typography>
          </NavLink>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none", color: 'black' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <NavLink to={`/${page}`} key={page} className={"a"}>
                    <Typography textAlign="center" sx={{color: "black"}}>{page}</Typography>
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <ShoppingCartIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1, color: "#2a55e5" }}
          />
          <Link to="/" className="a">
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#2a55e5",
                textDecoration: "none",
              }}
            >
              FlipZon
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <NavLink to={`/${page}`} key={page}>
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "#2a55e5", display: "block" }}
                >
                  {page}
                </Button>
              </NavLink>
            ))}
          </Box>
          {!token ? (
            <></>
          ) : role === 'USER' ? (
            <>
              <Link to="/cart" className="a">
                <IconButton aria-label="cart">
                  <StyledBadge
                    badgeContent={cartData.length}
                    color="secondary"
                    sx={{
                      marginRight: "15px",
                      color: "#2a55e5",
                      fontSize: "15px",
                    }}
                  >
                    <ShoppingBagIcon />
                  </StyledBadge>
                </IconButton>
              </Link>
            </>
          ) : (
            <></>
          )}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={defaultProfilePic} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu} >
                  <NavLink to={`/${setting}`} key={setting} className={"b"}>
                    <Typography textAlign="center">{setting}</Typography>
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavigationBar;
