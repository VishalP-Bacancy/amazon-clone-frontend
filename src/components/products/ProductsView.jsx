import { Button, Card, Container, Grid, Typography } from "@mui/material";
import * as React from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import "../../align.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";
import axios from "axios";
import { AuthContextExport } from "../../util/context/AuthContext";
import { useDispatch } from "react-redux";
import { addToCartApi } from "../../util/redux/reducers/CartApi";

const ProductsView = () => {
  const { token } = AuthContextExport();
  const [data, setData] = React.useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = React.useState("");
  const [totalProduct, setTotalProduct] = React.useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const queryParams = {
    page,
    rowsPerPage,
    search,
  };

  React.useEffect(() => {
    for (const [key, value] of Object.entries(queryParams)) {
      if (!searchParams.has(key)) {
        searchParams.set(key, value);
      }
    }

    setSearchParams(searchParams);
  }, [searchParams]);

  React.useEffect(() => {
    const page = +searchParams.get("page");
    const rowsPerPage = +searchParams.get("rowsPerPage");
    const search = searchParams.get("search") || "";

    setPage(+page);
    setRowsPerPage(+rowsPerPage);
    setSearch(search);

    axios
      .get(
        `http://localhost:3000/products?page=${
          page + 1
        }&productsPerPage=${rowsPerPage}&search=${search}`
      )
      .then((response) => {
        setData(response.data.products);
        setTotalProduct(+response.data.totalProduct);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [searchParams]);

  const addProduct = (index) => {
    const newProduct = {
      image: data[index].image,
      price_per_unit: data[index].price,
      product_id: data[index].id,
      product_name: data[index].name,
      quantity: 1,
    };
    dispatch(addToCartApi(data[index], newProduct));
  };

  const handleChangePage = (event, newPage) => {
    searchParams.set("page", newPage.toString());
    setSearchParams(searchParams);
  };

  const handleChangeRowsPerPage = (event) => {
    searchParams.set("page", 0);
    searchParams.set("rowsPerPage", event.target.value);
    setSearchParams(searchParams);
  };

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "black",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  const cardBackgroundColor = "#ffffff";
  const buttonPrimaryBackground = "#FF9900";
  const buttonSecondaryBackground = "#333";

  return (
    <Container maxWidth="lg">
      <br />
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          value={search}
          autoFocus
          onChange={(event) => {
            searchParams.set("search", event.target.value);
            searchParams.set("page", 0);
            setSearchParams(searchParams);
          }}
        />
      </Search>
      <Grid container spacing={5} style={{ marginTop: "20px" }}>
        {data.map((result, index) => (
          <Grid item xs={12} sm={4} ms={4} key={index}>
            <Card
              sx={{ maxWidth: 345, backgroundColor: cardBackgroundColor }}
              style={{ padding: "10px", marginBottom: "30px" }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={result.image}
                  alt="green iguana"
                  style={{ borderRadius: "5px" }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {result.name}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    Price: ${result.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActionArea sx={{ mb: 2 }}>
                <div className="button-parent">
                  <div className="align-left">
                    <Button
                      size="medium"
                      variant="contained"
                      onClick={() => {
                        navigate(`/product/${result.id}`);
                      }}
                      sx={{
                        marginLeft: "10px",
                        backgroundColor: buttonPrimaryBackground,
                        color: "white",
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                  {token ? (
                    <>
                      <div className="align-right">
                        <Button
                          size="medium"
                          variant="contained"
                          onClick={() => {
                            addProduct(index);
                          }}
                          sx={{
                            marginRight: "10px",
                            backgroundColor: buttonSecondaryBackground,
                            color: "white",
                          }}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div className="align-center">
        <TablePagination
          component="div"
          count={+totalProduct || 0}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 15]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </Container>
  );
};

export default ProductsView;
