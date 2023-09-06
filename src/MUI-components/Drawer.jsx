import { Divider, Drawer, List, useTheme, IconButton } from "@mui/material";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import {
  Brightness4,
  Brightness7,
  Create,
  Home,
  Logout,
  Person2,
  Settings,
} from "@mui/icons-material";

import { useLocation, useNavigate } from "react-router-dom";
import { pink } from "@mui/material/colors";

const Drawerr = ({
  drawerWidth,
  setmyMOde,
  noneORblock,
  drawerType,
  hideDrawer,
}) => {
  const currentLocation = useLocation();

  const navigate = useNavigate();
  const theme = useTheme();

  const myList = [
    { text: "Home", icon: <Home sx={{ color: pink[500] }} />, path: "/" },
    { text: "Create", icon: <Create color="secondary" />, path: "/create" },
    { text: "Profile", icon: <Person2 color="success" />, path: "/profile" },
    { text: "Settings", icon: <Settings color="disabled" />, path: "/settings" },
  ];

  return (
    <Drawer
      sx={{
        display: { xs: noneORblock, sm: "block" },

        width: `${drawerWidth}px`,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: `${drawerWidth}px`,
          boxSizing: "border-box",
        },
      }}
      variant={drawerType}
      anchor="left"
      open={true}
      onClose={() => {
        hideDrawer();
      }}
    >
      <List>
        <ListItem
          sx={{ display: "flex", justifyContent: "center", mb: "14px" }}
          disablePadding
        >
          <IconButton
            onClick={() => {
              localStorage.setItem(
                "currentMode",
                theme.palette.mode === "dark" ? "light" : "dark"
              );

              setmyMOde(theme.palette.mode === "light" ? "dark" : "light");
            }}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7 sx={{ color: "orange" }} />
            ) : (
              <Brightness4 />
            )}
          </IconButton>
        </ListItem>

        <Divider />

        {myList.map((item) => {
          return (
            <ListItem
            key={item.text}
              sx={{
                bgcolor:
                  currentLocation.pathname === item.path
                    ? // @ts-ignore
                      theme.palette.favColor.main
                    : null,
              }}
              disablePadding
            >
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Logout color="error" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Drawerr;
