import React from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

import jsPDF from "jspdf";
import "jspdf-autotable";

const Setting = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "name", headerName: "Level Name", flex: 1, cellClassName: "name-column--cell" },


        { field: "address", headerName: "Comment", flex: 1 },
        { field: "city", headerName: "Questions", flex: 1 },
    ];

    const exportToPDF = () => {
        const doc = new jsPDF();

        const title = "Contacts List";
        const headers = columns.map((column) => column.headerName);

        const data = mockDataContacts.map((row) => columns.map((column) => row[column.field]));

        doc.autoTable({
            head: [headers],
            body: data,
            startY: 20,
            theme: "grid",
            styles: {
                lineColor: theme.palette.text.primary,
                lineWidth: 0.1,
            },
        });

        doc.text(title, 14, 10);
        doc.save("contacts.pdf");
    };

    return (
        <Box m="20px">
            <Header title="SETTINGS" subtitle="List of Settings" />

            <Box m="40px 0 0 0" height="75vh" sx={{
                "& .MuiDataGrid-root": { border: "none" },
                "& .MuiDataGrid-cell": { borderBottom: "none" },
                "& .name-column--cell": { color: colors.greenAccent[300] },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.blueAccent[700],
                    borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.blueAccent[700],
                },
                "& .MuiCheckbox-root": { color: `${colors.greenAccent[200]} !important` },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": { color: `${colors.grey[100]} !important` },
            }}>

                <Box m="20px 0">
                    <Button variant="contained" color="primary" onClick={exportToPDF}>
                        Export to PDF
                    </Button>
                </Box>
                <DataGrid rows={mockDataContacts} columns={columns} components={{ Toolbar: GridToolbar }}


                />

            </Box>

        </Box>
    );
};

export default Setting;
