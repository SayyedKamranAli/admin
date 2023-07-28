import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InterestsIcon from "@mui/icons-material/Interests";
import PeopleOutlinedIcon from "@mui/icons-material/Category";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useEffect } from "react";
import AppConstants from "../../utils/app-constants";
import SettingsIcon from "@mui/icons-material/Settings";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import axios from "axios";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [userData, setUserData] = useState([]);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

<<<<<<< HEAD



  useEffect(() => {
    setToken(localStorage.getItem("usersdata"));
    setUserId(localStorage.getItem("usersId"));
    if (userId !== "") {
      try {
        const data = axios({
          method: "GET",
          url: `${AppConstants.apibaseURL}/validuser/${userId}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        data.then(function (result) {
          if (result.status === 201) {
            setUserData(result?.data?.ValidUserOne);
          }
        });
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Handle 404 error
          console.log('Resource not found.');
        } else {
          // Handle other errors
          console.log('An error occurred:', error.message);
        }
      }
    }
=======
  useEffect(() => {
    setToken(localStorage.getItem("usersdata"));
    setUserId(localStorage.getItem("usersId"));
    if(userId !== ""){
    try {
      const data = axios({
        method: "GET",
        url: `${AppConstants.apibaseURL}/validuser/${userId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      data.then(function (result) {
        if (result.status === 201) {
          setUserData(result?.data?.ValidUserOne);
        }
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Handle 404 error
        console.log('Resource not found.');
      } else {
        // Handle other errors
        console.log('An error occurred:', error.message);
      }
    }
  }
>>>>>>> 6b2f24819b3e72ab1e9794ed5305bf1385bd4d64
  }, [token]);
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ARCHIKA DIDI
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {userData?.userName}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Interest"
              to="/interest"
              icon={<InterestsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <SubMenu title="Categories" icon={<PeopleOutlinedIcon />}>
              <Item
                title="Main-Category"
                to="/category"
                selected={selected}
                setSelected={setSelected}
<<<<<<< HEAD

=======
                
>>>>>>> 6b2f24819b3e72ab1e9794ed5305bf1385bd4d64
              />
              <Item
                title="Sub-Category"
                to="sub-category"
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>

            <Item
              title="Daily Tips"
              to="/daily-tips"
              icon={<TipsAndUpdatesIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Setting"
              to="/setting"
              icon={<SettingsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
<<<<<<< HEAD


            <SubMenu style={{ position: "relative", bottom: "28px", }} label="Charts">
              <MenuItem style={{ position: "relative", top: "10px", }}> User Level </MenuItem>
              <MenuItem style={{ position: "relative", top: "10px", }}> Status </MenuItem>
            </SubMenu>


=======
           
>>>>>>> 6b2f24819b3e72ab1e9794ed5305bf1385bd4d64
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
