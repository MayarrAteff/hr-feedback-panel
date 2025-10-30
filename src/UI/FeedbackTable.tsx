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
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import db from "../firebase";

type Feedback = {
  id: string;
  employeeName: string;
  score: number;
  notes: string;
  date: any;
};

export default function FeedbackDataGrid() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    // Listen in real-time to the `feedback` collection, ordered by date (newest first)
    const feedbackCollection = collection(db, "feedback");
    const q = query(feedbackCollection, orderBy("date", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data: Feedback[] = snapshot.docs.map((doc) => {
          const docData: any = doc.data();
          return {
            id: doc.id,
            employeeName: docData.employeeName,
            score: docData.score,
            notes: docData.notes,
            date: docData.date,
          };
        });
        setFeedbacks(data);
      },
      (error) => {
        console.error(
          "Realtime listener error for feedback collection:",
          error
        );
      }
    );

    // Clean up the listener when component unmounts
    return () => unsubscribe();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [scoreFilter, setScoreFilter] = useState("all");

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 180,
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
      renderCell: (params: any) => {
        const timestamp = params.row?.date;
        const date = timestamp?.toDate?.();
        return date
          ? new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }).format(date)
          : "—";
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
      minWidth: 200,
    },
  ];

  // Filter data based on search and score filter
  const filteredRows = useMemo(() => {
    return feedbacks.filter((row) => {
      const matchesSearch =
        row.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesScore =
        scoreFilter === "all" || row.score === parseInt(scoreFilter);

      return matchesSearch && matchesScore;
    });
  }, [feedbacks, searchTerm, scoreFilter]);

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

            ".MuiDataGrid-virtualScroller": {
              overflowX: "auto",
            },
          }}
        />
      </Box>
    </Box>
  );
}
