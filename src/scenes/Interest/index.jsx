import {
  Box,
  Typography,
  Button,
  useTheme,
  IconButton,
  Modal,
  FormControlLabel,
  Switch,
  Paper,
  TextField,
  styled,
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
import { GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { Grid } from "react-loader-spinner";
function Intrest() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [mainBox,setMainbox]=useState(true)
  const [editBox,setEditbox]=useState(false)
  const [addBox,setAddbox]=useState(false)

  const onClickAdd =()=>{

    setMainbox(false)
    setAddbox(true)
  }
  const onClickEdit =()=>{

    setMainbox(false)
    setEditbox(true)
  }


  const onSubmitAddData=()=>{
    setAddbox(false)
    setMainbox(true)

  }
  const onUpdateData=()=>{
    setEditbox(false)
    setMainbox(true)

  }


  const data = [{ id: 1, name: "kamran", status: "new", action: "edit" }];
  const rows = [];
  data &&
    data.forEach((item, index) => {
      rows.push({
        id: item.id,
        name: item.name,
        status: item.status,
        action: item.action,
      });
    });
  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <FormControlLabel
            sx={{
              display: "block",
            }}
            control={
              <Switch
                // checked={loading}
                onChange={(e) => e.tar}
                name="hello"
                color="info"
              />
            }
          />
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box borderRadius="4px" style={{ cursor: "pointer" }}>
            <IconButton onClick={onClickEdit}>
              <CreateOutlinedIcon />
            </IconButton>
          </Box>
        );
      },
      cellClassName: "name-column--cell",
    },
  ];

  const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  });
  return (
    <Box m="20px">
     {mainBox ?(
 <Box id="unique">
 <Header title="Interest List" />
 <Box sx={{ display: "flex", justifyContent: "end" }}>
   <IconButton
     style={{
       padding: "7px",
       fontSize: "18px",
       borderRadius: "5px",
       border: "none",
       backgroundColor: "#3da58a",
     }}
     onClick={onClickAdd}
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
   }}
 >
   <DataGrid rows={rows} columns={columns} />
   {/* <DataGrid {...data} loading={loading}  /> */}
 </Box>
</Box>
     ):("")
        
     }
     
         {editBox ?(  <Box m="20px" >
             <Box sx={{ textAlign: "center", backgroundColor: "#3600000d" }}>
               <Header title="Add Intrest" />
               <Box m="0px 10rem">
                 <CssTextField
                   margin="normal"
                   required
                   fullWidth
                   id="name"
                   label="Name"
                   name="name"
                   autoComplete="name"
                   autoFocus
                 />
                 <Button
                   type="submit"
                   onClick={onUpdateData}
                   variant="contained"
                   color="success"
                   sx={{ mt: 3, mb: 2 }}
                 >
                   Update
                 </Button>
               </Box>
             </Box>
           </Box>) :("")
           
         }


         {addBox ? ( <Box m="20px" >
             <Box sx={{ textAlign: "center", backgroundColor: "#3600000d" }}>
               <Header title="Add Intrest" />
               <Box m="0px 10rem">
                 <CssTextField
                   margin="normal"
                   required
                   fullWidth
                   id="name"
                   label="Name"
                   name="name"
                   autoComplete="name"
                   autoFocus
                 />
                 <Button
                   type="submit"
                   onClick={onSubmitAddData}
                   variant="contained"
                   color="success"
                   sx={{ mt: 3, mb: 2 }}
                 >
                   Submit
                 </Button>
               </Box>
             </Box>
           </Box>) :("")
            
         
         }
    </Box>
  );
}

export default Intrest;
