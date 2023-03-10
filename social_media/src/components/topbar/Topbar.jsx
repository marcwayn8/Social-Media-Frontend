import Logout from "@mui/icons-material/Logout";
import Search from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../context/appContext";
import "./topbar.css";
import logo from "../../assets/newLogo.png";
import profileImage from "./img.jpg"


export default function Topbar() {
  const { user, setIsAuth, setUser, theme, toggleTheme, searchTerm, setSearchTerm } = useContext(AppContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo"   onClick={(e) => navigate("/home")}>
         <img src={logo} alt="logo" style={{
              width: "150px",
              marginLeft: "25px"
            }}></img>

        </span>
      </div>
      {/* <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for recent posts / complaints"
            className="searchInput"
            value={searchTerm}
                        onChange={(e)=>setSearchTerm(e.target.value)}
          />
        </div>
      </div> */}
      <div className="topbarRight">
        <>
          <div>
            <input type="checkbox" class="checkbox" id="chk" onChange={toggleTheme}/>
            <label class="label" for="chk" >
              <i class="fas fa-moon"></i>
              <i class="fas fa-sun"></i>
              <div class="ball"></div>
            </label>
          </div>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 1 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <img src = {profileImage} alt="" className="topbarImg" />
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 16,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleClose} className="profile">
              <img alt="" className="dropDownImg" />
              <Link className="dropDownLink" to={`/profile/${user.id}`}>
                {" "}
                Profile
              </Link>
            </MenuItem>
            <Divider />
            <MenuItem
              className="profile"
              onClick={() => {
                handleClose();
                setUser({});
                setIsAuth(false);
                window.localStorage.clear();
                navigate("/login");
              }}
            >
              <ListItemIcon onClick={() => {
                handleClose();
                setUser({});
                setIsAuth(false);
                window.localStorage.clear();
                navigate("/login");
              }}>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </>
      </div>
    </div>
  );
}
