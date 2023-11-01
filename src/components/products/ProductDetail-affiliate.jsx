import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Typography, Paper, Button } from "@mui/material";
import axios from "axios";
import Rating from "@mui/material/Rating";
import "../../align.css";
import { AuthContextExport } from "../../util/context/AuthContext";
import { useDispatch } from "react-redux";
import { addToCartApi } from "../../util/redux/reducers/CartApi";
import Cookies from 'js-cookie';
import { useCookies } from "react-cookie";

const ProductDetailAffiliate = () => {
  const { token } = AuthContextExport();
  const params = useParams();
  const productId = params.id;
  const [isLoggedIn, setIsLoggedIn] = useState({});
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['refer_code']);
  const dispatch = useDispatch();
  // const [searchParams, setSearchParams] = useSearchParams();
  const [role, setRole] = useState('USER')

  //Cookies.set('name', 'value', { expires: 7 });
  //const name = Cookies.get('name');
  //Cookies.remove('name');
  useEffect(() => {
    const productId = params.id; // Replace with your product ID
    const searchParams = new URLSearchParams(window.location.search);
    const affiliateId = searchParams.get('ref');

    setCookie('refer_code', {
      productId: productId,
      affiliateId: affiliateId,
    }, { maxAge: 7 * 24 * 60 * 60 }); // Expires in 7 days
  }, []);

  // Get the cookie
  useEffect(() => {
    console.log('AAAAAAAAAA', cookies.refer_code);
  }, [cookies]);

  useEffect(() => {

    axios
      .get('http://localhost:3000/api/affiliate/user', {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log('lopopopopp',response.data.status)
        setIsLoggedIn(response.data.status)
        setRole('AFFILIATE')
      })
      .catch((error) => {
        console.error("Error:", error);
      });


    axios
      .get(`http://localhost:3000/products/${productId}`)
      .then((response) => {
        setData(response.data);
      })
      .catch(() => {
        navigate("/*");
      });
  }, [navigate, productId]);
  return (
    <div>
      <div style={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          {data.name}
        </Typography>
        <img src={data?.image} alt="Product" style={{ maxWidth: "100%" }} />
        <div>
          <Rating name="read-only" value={+data.ratings} readOnly />
        </div>
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
          <Typography variant="body1">{data.description}</Typography>
          <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
            ${data.price}
          </Typography>
          {token && role === 'USER' ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  const newProduct = {
                    image: data.image,
                    price_per_unit: data.price,
                    product_id: data.id,
                    product_name: data.name,
                    quantity: 1,
                  };
                  dispatch(addToCartApi(data, newProduct));
                }}
              >
                Add to Cart
              </Button>
            </>
          ) : (
            <></>
          )}
          {/* {
            isLoggedIn && role === 'AFFILIATE' ? <>
           
          <div className="button-parent">
            <div className="align-right">
              <Button
                onClick={() => {
                  dispatch(generateReferralLink(data))
                }}
                size="medium"
                variant="contained"
                sx={{ marginTop: "10px" }}
              >
                Generate Referral Link
              </Button>
            </div>
          </div> </> : <></>
          } */}
          <div className="button-parent">
            <div className="align-right">
              <Button
                onClick={() => {
                  navigate(-1);
                }}
                size="medium"
                variant="contained"
                sx={{ marginTop: "10px" }}
              >
                Back
              </Button>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default ProductDetailAffiliate;
