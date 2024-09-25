import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../Contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TextField,
  Button,
  TableSortLabel,
  IconButton,
} from "@mui/material";
import Loading from "../../../../Shared/Loading/Loading";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";

const SellerProducts = () => {
  const { user } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const {
    data: products = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(
        `https://assignment-12-server-silk.vercel.app/allproducts/${user?.email}`,
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

  // Delete Product
  const handleDelete = (id) => {
    const proceed = window.confirm(`Are you sure you want to delete`);
    if (proceed) {
      fetch(
        `https://assignment-12-server-silk.vercel.app/deleteproduct/${id}`,
        {
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast("Deleted Product Successfully");
            deleteAdvertise(id);
            refetch();
          }
        });
    }
  };

  // Advertise Product
  const handleAdvertise = (product, id) => {
    const advertiseItem = {
      productID: id,
      name: product.name,
      img: product.img,
      location: product.location,
      rsPrice: product.rsPrice,
      orgPrice: product.orgPrice,
      yearOfUse: product.yearOfUse,
      sellerName: product.sellerName,
      categoryId: product.categoryId,
      payment: product.payment,
      phoneNumber: product.phoneNumber,
      condition: product.condition,
      purchaseyear: product.purchaseyear,
      sellerEmail: product.sellerEmail,
      desc: product.desc,
    };

    fetch(`https://assignment-12-server-silk.vercel.app/addadvertise/${id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(advertiseItem),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast("Product successfully advertised");
          refetch();
        }
      })
      .catch((err) => console.error(err));
  };

  // Delete Advertise
  const deleteAdvertise = (id) => {
    const proceed = true;
    if (proceed) {
      fetch(
        `https://assignment-12-server-silk.vercel.app/deleteadvertise/${id}`,
        {
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            refetch();
          }
        });
    }
  };

  // Sorting
  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.direction === "asc" ? "desc" : "asc",
    });
  };

  const sortedProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const isAsc = sortConfig.direction === "asc";
      if (a[sortConfig.key] < b[sortConfig.key]) return isAsc ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return isAsc ? 1 : -1;
      return 0;
    });

  // Pagination
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full lg:px-10">
      <h2 className="text-lg font-semibold text-center mb-5">All Products</h2>

      {/* Search Input */}
      <div className="my-4">
        <TextField
          label="Search by Product Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            endAdornment: <SearchIcon />,
          }}
        />
      </div>

      {/* Material-UI Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === "name"}
                    direction={sortConfig.direction}
                    onClick={() => handleSort("name")}
                  >
                    Product Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === "orgPrice"}
                    direction={sortConfig.direction}
                    onClick={() => handleSort("orgPrice")}
                  >
                    Price
                  </TableSortLabel>
                </TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Delete</TableCell>
                <TableCell>Advertise</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedProducts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product, i) => (
                  <TableRow key={product._id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.orgPrice}</TableCell>
                    <TableCell>{product.payment}</TableCell>
                    <TableCell>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDelete(product._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      {product?.advertise ? (
                        <span className="text-blue-500">Advertised</span>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => handleAdvertise(product, product._id)}
                        >
                          Advertise
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={sortedProducts.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Paper>
      <Toaster />
    </div>
  );
};

export default SellerProducts;
