import React, { useState, useMemo, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Rating,
  Chip,
} from "@mui/material";

export default function FeedbackDataGrid() {
  const [feedbackData] = useState([
    {
      id: "fb001",
      date: new Date("2024-10-25T14:30:00"),
      employeeName: "Jane Doe",
      score: 5,
      notes:
        "Great experience! The new dashboard is very intuitive and easy to use.",
    },
    {
      id: "fb002",
      date: new Date("2024-10-24T09:15:00"),
      employeeName: "John Smith",
      score: 4,
      notes: "Good overall, but the mobile version needs some improvements.",
    },
    {
      id: "fb003",
      date: new Date("2024-10-23T16:45:00"),
      employeeName: "Sarah Johnson",
      score: 3,
      notes: "Average experience. Loading times are a bit slow.",
    },
    {
      id: "fb004",
      date: new Date("2024-10-22T11:20:00"),
      employeeName: "Mike Brown",
      score: 5,
      notes: "Excellent work! All features work perfectly.",
    },
    {
      id: "fb005",
      date: new Date("2024-10-21T13:00:00"),
      employeeName: "Emily Davis",
      score: 2,
      notes: "Encountered several bugs. Login issues persist.",
    },
    {
      id: "fb006",
      date: new Date("2024-10-20T10:30:00"),
      employeeName: "David Wilson",
      score: 4,
      notes: "Very good. Would appreciate dark mode support.",
    },
    {
      id: "fb007",
      date: new Date("2024-10-19T15:10:00"),
      employeeName: "Lisa Anderson",
      score: 5,
      notes: "Perfect! Everything works as expected.",
    },
    {
      id: "fb008",
      date: new Date("2024-10-18T08:45:00"),
      employeeName: "Robert Taylor",
      score: 3,
      notes: "Decent but could use better documentation.",
    },
    {
      id: "fb009",
      date: new Date("2024-10-17T14:20:00"),
      employeeName: "Jennifer Martinez",
      score: 4,
      notes: "Good product. Minor UI improvements needed.",
    },
    {
      id: "fb010",
      date: new Date("2024-10-16T12:00:00"),
      employeeName: "Chris Lee",
      score: 1,
      notes: "Poor experience. Multiple crashes and errors.",
    },
    {
      id: "fb011",
      date: new Date("2024-10-15T09:30:00"),
      employeeName: "Amanda White",
      score: 5,
      notes: "Outstanding! Best update so far.",
    },
    {
      id: "fb012",
      date: new Date("2024-10-14T16:15:00"),
      employeeName: "Daniel Garcia",
      score: 4,
      notes: "Very satisfied with the recent changes.",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [scoreFilter, setScoreFilter] = useState("all");

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      renderCell: (params: any) => (
        <span
          style={{
            fontFamily: "monospace",
            fontSize: "0.775rem",
          }}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      width: 180,
      valueGetter: (params: any) => params?.row?.date,
      renderCell: (params: any) => {
        return new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }).format(params.value);
      },
    },
    {
      field: "employeeName",
      headerName: "Employee Name",
      width: 180,
      renderCell: (params: any) => (
        <span className="capitalize font-semibold">{params.value}</span>
      ),
    },
    {
      field: "score",
      headerName: "Score",
      width: 150,
      renderCell: (params: any) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Rating value={params.value} readOnly size="small" />
          <Chip
            label={`${params.value}/5`}
            size="small"
            color={
              params.value >= 4
                ? "success"
                : params.value === 3
                ? "warning"
                : "error"
            }
            sx={{ width: "fit-content", fontSize: "0.75rem" }}
          />
        </Box>
      ),
    },
    {
      field: "notes",
      headerName: "Feedback Notes",
      flex: 1,
      minWidth: 300,
    },
  ];

  // Filter data based on search and score filter
  const filteredRows = useMemo(() => {
    return feedbackData.filter((row) => {
      const matchesSearch =
        row.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesScore =
        scoreFilter === "all" || row.score === parseInt(scoreFilter);

      return matchesSearch && matchesScore;
    });
  }, [feedbackData, searchTerm, scoreFilter]);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const MOBILE_BREAKPOINT = 1024;
    const handleResize = () =>
      setIsSmallScreen(window.innerWidth < MOBILE_BREAKPOINT);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box sx={{ width: "100%", padding: 3 }}>
      <h2
        style={{ marginBottom: "24px", fontSize: "1.5rem", fontWeight: "bold" }}
      >
        Employee Feedback
      </h2>

      {/* Search and Filter Bar */}
      <Box sx={{ marginBottom: 3, display: "flex", gap: 2 }}>
        <TextField
          label="Search"
          variant="outlined"
          placeholder="Search by Name, ID, or Notes"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1, minWidth: "150px" }}
        />

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Filter by Score</InputLabel>
          <Select
            value={scoreFilter}
            label="Filter by Score"
            onChange={(e) => setScoreFilter(e.target.value)}
          >
            <MenuItem value="all">All Scores</MenuItem>
            <MenuItem value="5">5 Stars</MenuItem>
            <MenuItem value="4">4 Stars</MenuItem>
            <MenuItem value="3">3 Stars</MenuItem>
            <MenuItem value="2">2 Stars</MenuItem>
            <MenuItem value="1">1 Star</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* DataGrid */}
      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 25, 50]}
          disableRowSelectionOnClick
          getRowHeight={() => "auto"}
          autoHeight={isSmallScreen}
          sx={{
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "#0d47a1",
              color: "#ffffff",
              fontWeight: "bold",
              alignItems: "center",
            },

            "& .MuiDataGrid-scrollbarFiller": {
              backgroundColor: "#0d47a1 !important",
            },

            "& .MuiDataGrid-row:nth-of-type(even)": {
              backgroundColor: "#e3eaf5",
            },
            "& .MuiDataGrid-row:nth-of-type(odd)": {
              backgroundColor: "#ffffff",
            },

            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#f3f5f0",
              cursor: "pointer",
            },

            "& .MuiDataGrid-cell": {
              padding: "12px",
            },
            // allow the grid to scroll horizontally on very small widths
            ".MuiDataGrid-virtualScroller": {
              overflowX: "auto",
            },
          }}
        />
      </Box>
    </Box>
  );
}
