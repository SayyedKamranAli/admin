import {
  Box,
  Typography,
  Button,
  useTheme,
  IconButton,
  Modal,
} from "@mui/material";
import { DataGrid, GridToolbarExport } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ReactDraft from "../../components/reactDraft/index";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import AppConstants from "../../utils/app-constants";
import {  GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { GridToolbarContainer } from "@mui/x-data-grid";
import SearchBar from "material-ui-search-bar";


const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [editorState, setEditorState] = useState("");
  const [catData, setCatData] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSunmit = () => {
    alert("hello");
  };

  const rows = [];
  catData && catData.forEach((item, index)=>{
    rows.push({
      id: index+1,
      name: item.name,
      description: item.description,
      icon: item.icon,
      banner:item.banner,
      status:item.status
    })

  })
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
  };
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true
    },
    {
      field: "description",
      headerName: (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <span>Description</span>
            <IconButton onClick={handleOpen}>
              <CreateOutlinedIcon />
            </IconButton>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <ReactDraft></ReactDraft>
              </Box>
            </Modal>
          </div>
        </>
      ),
      // type: "text",
      // headerAlign: "left",
      // align: "left",
      flex: 1,
      sortable: false,
    },
    {
      field: "icon",
      headerName: "Icon",
      flex: 1,
    },
    {
      field: "banner",
      headerName: "Banner",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
            style={{ cursor: "pointer" }}
          >
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              active
            </Typography>
          </Box>
        );
      },
    },
  ];

  useEffect(() => {
    try {
      axios({
        method: "get",
        url: `${AppConstants.apibaseURL}/categoryData`,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((result) => {
        setCatData(result?.data?.data);
      });
    } catch (error) {}
  },[]);
  return (
    <Box m="20px">
      {/* <Header title="TEAM" subtitle="Managing the Team Members" /> */}
     <Box sx={{display: "flex",
          justifyContent: "end"}}>
      <IconButton
        style={{
          padding: "7px",
          fontSize: "18px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#3da58a",
        }}
        onClick={handleSunmit}
      >
        Add
        <AddOutlinedIcon />
      </IconButton>
      </Box>
      
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}

       >
   {/* <SearchBar/> */}
        <DataGrid rows={rows} columns={columns} components={{ Toolbar: GridToolbar }}/>
      </Box>
     
    </Box>
  );
};

export default Team;
