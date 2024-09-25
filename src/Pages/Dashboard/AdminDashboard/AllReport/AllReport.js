import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../Shared/Loading/Loading";
import toast, { Toaster } from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
  TextField,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

// Comparator function for sorting
const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => (a[orderBy] < b[orderBy] ? 1 : -1)
    : (a, b) => (a[orderBy] > b[orderBy] ? 1 : -1);
};

const AllReport = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("itemName");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const {
    data: reports = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const res = await fetch(
        "https://assignment-12-server-silk.vercel.app/allreports",
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });

  const handleDelete = (id, idReport) => {
    const proceed = window.confirm(`Are you sure you want to delete?`);
    if (proceed) {
      fetch(
        `https://assignment-12-server-silk.vercel.app/deleteproducts/${id}`,
        {
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast("Delete Product Successfully");
            deleteReport(idReport, id);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const deleteReport = (idReport, id) => {
    fetch(
      `https://assignment-12-server-silk.vercel.app/deletereport/${idReport}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          deleteReportAd(id);
        }
      });
  };

  const deleteReportAd = (id) => {
    fetch(`https://assignment-12-server-silk.vercel.app/deleteReportAd/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
        }
      });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Memoized filtered and sorted data
  const filteredReports = useMemo(() => {
    return reports
      .filter(
        (report) =>
          report.itemName.toLowerCase().includes(searchTerm) ||
          report.buyerName.toLowerCase().includes(searchTerm)
      )
      .sort(getComparator(order, orderBy));
  }, [reports, searchTerm, order, orderBy]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full lg:px-10">
      <h2 className="text-lg font-semibold text-center mb-5">All Reports</h2>
      <TextField
        label="Search by Item Name or Buyer Name"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: <SearchIcon />,
        }}
      />
      {filteredReports.length ? (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sr. No</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "itemName"}
                      direction={orderBy === "itemName" ? order : "asc"}
                      onClick={() => handleSortRequest("itemName")}
                    >
                      Reported Item
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "buyerName"}
                      direction={orderBy === "buyerName" ? order : "asc"}
                      onClick={() => handleSortRequest("buyerName")}
                    >
                      Buyer Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Buyer Email</TableCell>
                  <TableCell>Report</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredReports
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((report, i) => (
                    <TableRow key={report._id}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{report.itemName}</TableCell>
                      <TableCell>{report.buyerName}</TableCell>
                      <TableCell>{report.buyerEmail}</TableCell>
                      <TableCell>{report.desc}</TableCell>
                      <TableCell>
                        <IconButton
                          color="secondary"
                          onClick={() =>
                            handleDelete(report.productId, report._id)
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={filteredReports.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Paper>
      ) : (
        <div className="text-center text-red-500 text-lg font-semibold">
          <h1>No report to show</h1>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default AllReport;
