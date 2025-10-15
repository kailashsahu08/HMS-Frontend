import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  useTheme,
  useMediaQuery,
  Container,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { isAuthenticated, logout, user } = useAuth();
  const { pathname } = useLocation();
  const theme = useTheme();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/doctors", label: "Doctors" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  const userMenuItems = [
    { path: "/profile", label: "Profile", icon: PersonIcon },
    { path: "/settings", label: "Settings", icon: SettingsIcon },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
    setMobileOpen(false);
  };

  const isActive = (path) => pathname === path;

  // Desktop Navigation Items
  const renderNavLinks = () => (
    <Box sx={{ display: "flex", gap: 1 }}>
      {navItems.map(({ path, label }) => (
        <Button
          key={path}
          component={Link}
          to={path}
          sx={{
            color: isActive(path) ? "success.main" : "text.secondary",
            fontWeight: isActive(path) ? 600 : 500,
            fontSize: "0.9375rem",
            textTransform: "none",
            px: 2,
            py: 1,
            borderRadius: 1,
            position: "relative",
            "&:hover": {
              color: "text.primary",
              backgroundColor: "action.hover",
            },
            "&::after": isActive(path)
              ? {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "60%",
                  height: 2,
                  backgroundColor: "success.main",
                  borderRadius: "2px 2px 0 0",
                }
              : {},
          }}
        >
          {label}
        </Button>
      ))}
    </Box>
  );

  // User Menu
  const renderUserMenu = () => (
    <>
      <IconButton
        onClick={handleUserMenuOpen}
        sx={{
          ml: 1,
          border: 1,
          borderColor: "divider",
          "&:hover": {
            borderColor: "primary.main",
            backgroundColor: "action.hover",
          },
        }}
      >
        <Avatar
          sx={{
            width: 32,
            height: 32,
            bgcolor: "success.main",
            fontSize: "0.875rem",
          }}
        >
          {user?.name?.charAt(0) || "U"}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleUserMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            minWidth: 200,
            borderRadius: 2,
            "& .MuiMenuItem-root": {
              px: 2,
              py: 1.5,
              borderRadius: 1,
              mx: 1,
              my: 0.5,
            },
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5, mb: 1 }}>
          <Box sx={{ fontWeight: 600, fontSize: "0.9375rem" }}>
            {user?.name || "User"}
          </Box>
          <Box sx={{ fontSize: "0.8125rem", color: "text.secondary", mt: 0.5 }}>
            {user?.email || "user@example.com"}
          </Box>
        </Box>
        <Divider />
        {userMenuItems.map(({ path, label, icon: Icon }) => (
          <MenuItem
            key={path}
            component={Link}
            to={path}
            onClick={handleUserMenuClose}
          >
            <ListItemIcon>
              <Icon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{label}</ListItemText>
          </MenuItem>
        ))}
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Sign Out</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );

  // Mobile Drawer
  const drawer = (
    <Box sx={{ width: 280, pt: 2 }}>
      <Box sx={{ px: 2, mb: 3 }}>
        <img src="/logo.svg" alt="Logo" style={{ height: 48 }} />
      </Box>
      <Divider />
      <List>
        {navItems.map(({ path, label }) => (
          <ListItem key={path} disablePadding>
            <ListItemButton
              component={Link}
              to={path}
              onClick={handleDrawerToggle}
              selected={isActive(path)}
              sx={{
                mx: 1,
                borderRadius: 1,
                "&.Mui-selected": {
                  backgroundColor: "success.lighter",
                  color: "success.main",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "success.light",
                  },
                },
              }}
            >
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {isAuthenticated && (
        <>
          <Divider sx={{ my: 2 }} />
          <List>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/dashboard"
                onClick={handleDrawerToggle}
                sx={{ mx: 1, borderRadius: 1 }}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            {userMenuItems.map(({ path, label, icon: Icon }) => (
              <ListItem key={path} disablePadding>
                <ListItemButton
                  component={Link}
                  to={path}
                  onClick={handleDrawerToggle}
                  sx={{ mx: 1, borderRadius: 1 }}
                >
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding>
              <ListItemButton
                onClick={handleLogout}
                sx={{ mx: 1, borderRadius: 1 }}
              >
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Sign Out" />
              </ListItemButton>
            </ListItem>
          </List>
        </>
      )}

      {!isAuthenticated && (
        <>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ px: 2 }}>
            <Button
              component={Link}
              to="/login"
              fullWidth
              variant="outlined"
              sx={{
                textTransform: "none",
                borderRadius: 2,
                py: 1.25,
                fontWeight: 500,
              }}
              onClick={handleDrawerToggle}
            >
              Log In
            </Button>
          </Box>
        </>
      )}
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: "background.paper",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: 64, justifyContent: "space-between" }}>
            {/* Logo */}
            <Box
              component={Link}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                mr: 4,
              }}
            >
              <img src="/logo.svg" alt="Logo" style={{ height: 48 }} />
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1 }}>
              {renderNavLinks()}
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* Desktop Auth Actions */}
              {isAuthenticated ? (
                <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1 }}>
                  <Button
                    onClick={() => window.location.href = 'http://localhost:8000/admin'}
                    startIcon={<DashboardIcon />}
                    sx={{
                      color: "text.secondary",
                      textTransform: "none",
                      fontWeight: 500,
                      "&:hover": {
                        color: "text.primary",
                        backgroundColor: "action.hover",
                      },
                    }}
                  >
                    Dashboard
                  </Button>
                  {renderUserMenu()}
                </Box>
              ) : (
                <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
                  <Button
                    component={Link}
                    to="/login"
                    sx={{
                      color: "text.secondary",
                      textTransform: "none",
                      fontWeight: 500,
                      px: 2.5,
                      "&:hover": {
                        color: "text.primary",
                        backgroundColor: "action.hover",
                      },
                    }}
                  >
                    Log In
                  </Button>
                </Box>
              )}

              {/* Mobile Menu Button */}
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  display: { md: "none" },
                  color: "text.primary",
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: 280,
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Spacer to prevent content from going under fixed AppBar */}
      <Toolbar sx={{ minHeight: 64 }} />
    </>
  );
};

export default Header;