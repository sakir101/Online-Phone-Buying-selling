import React, { useState } from "react";
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
  TableSortLabel,
  TextField,
  TablePagination,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

const AllSellers = () => {
  const [orderDirection, setOrderDirection] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const {
    data: sellers = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["sellers"],
    queryFn: async () => {
      const res = await fetch(
        "https://assignment-12-server-silk.vercel.app/allsellers",
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

  const handleVerify = (email) => {
    const update = { verify: "verified" };

    fetch(
      `https://assignment-12-server-silk.vercel.app/sellerverify/${email}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(update),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast("Updated successfully");
          refetch();
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure you want to delete?");
    if (proceed) {
      fetch(`https://assignment-12-server-silk.vercel.app/deleteuser/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast("Deleted successfully");
            refetch();
          }
        });
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortRequest = () => {
    setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredSellers = sellers
    .filter((seller) =>
      seller.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (orderDirection === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full lg:px-10">
      <h2 className="text-lg font-semibold text-center mb-5">All Sellers</h2>
      <TextField
        label="Search by Name"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={handleSearch}
        InputProps={{
          endAdornment: <SearchIcon />,
        }}
      />
      {filteredSellers?.length ? (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={true}
                      direction={orderDirection}
                      onClick={handleSortRequest}
                    >
                      Seller Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredSellers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((seller, i) => (
                    <TableRow key={seller._id}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{seller.name}</TableCell>
                      <TableCell>{seller.email}</TableCell>
                      <TableCell>
                        {seller.verify === "none" ? (
                          <button
                            className="btn btn-sm bg-orange-600"
                            onClick={() => handleVerify(seller.email)}
                          >
                            Verify
                          </button>
                        ) : (
                          <p className="font-bold text-blue-700">Verified</p>
                        )}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="secondary"
                          onClick={() => handleDelete(seller._id)}
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
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredSellers?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <div className="text-center text-red-500 text-lg font-semibold">
          <h1>No seller to show</h1>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default AllSellers;
