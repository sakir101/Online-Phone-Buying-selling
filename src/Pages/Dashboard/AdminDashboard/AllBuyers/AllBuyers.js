import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../../../Shared/Loading/Loading";
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

const AllBuyers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const {
    data: buyers = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["buyers"],
    queryFn: async () => {
      const res = await fetch(
        "https://assignment-12-server-silk.vercel.app/allbuyers",
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

  const handleDelete = (id) => {
    const proceed = window.confirm(`Are you sure you want to delete`);
    if (proceed) {
      fetch(`https://assignment-12-server-silk.vercel.app/deleteuser/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast("Delete user Successfully");
            refetch();
          }
        });
    }
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
  const filteredBuyers = useMemo(() => {
    return buyers
      .filter((buyer) => buyer.name.toLowerCase().includes(searchTerm))
      .sort(getComparator(order, orderBy));
  }, [buyers, searchTerm, order, orderBy]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full lg:px-10">
      <h2 className="text-lg font-semibold text-center mb-5">All Buyers</h2>
      <TextField
        label="Search by name"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: <SearchIcon />,
        }}
      />
      {filteredBuyers.length ? (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sr. No</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "name"}
                      direction={orderBy === "name" ? order : "asc"}
                      onClick={() => handleSortRequest("name")}
                    >
                      Buyer Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBuyers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((buyer, i) => (
                    <TableRow key={buyer._id}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{buyer.name}</TableCell>
                      <TableCell>{buyer.email}</TableCell>
                      <TableCell>
                        <IconButton
                          color="secondary"
                          onClick={() => handleDelete(buyer._id)}
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
            count={filteredBuyers.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Paper>
      ) : (
        <div className="text-center text-red-500 text-lg font-semibold">
          <h1>No buyer to show</h1>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default AllBuyers;
