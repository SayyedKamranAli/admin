import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import AppConstant from "../../utils/app-constants";
import axios from "axios";
import { toast } from "react-toastify";
const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  let history = useNavigate();
  let token = localStorage.getItem("usersdata");
  const logout = async () => {
    try {
      const data = await axios({
        method: "GET",
        url: `${AppConstant.apibaseURL}/logout`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (data.status === 201) {
        localStorage.removeItem("usersdata")
        localStorage.removeItem("usersId");
        toast.info("Logout Successfully ", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => {
          history("/");
          window.location.reload();
        }, 1000);
      }
    } catch (error) {}
  };
  const handleClick = () => {
    history("/signin");
  };
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        {token === "" || token === null ? (
          <>
            <IconButton>
              <PersonOutlinedIcon onClick={handleClick} />
            </IconButton>
          </>
        ) : (
          <><Tooltip title="Logout">
            <IconButton onClick={logout}>
              <LogoutIcon />
            </IconButton>
            </Tooltip>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Topbar;
