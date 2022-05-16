import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cart_delete, item_add, item_remove } from "../../redux/actions/cartAction";
import style from "../../styles/Home.module.css";
const productDetails = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const productId = router.query.productId;

  const getState = useSelector((state) => state.cartReducer.cart);
  console.log("ss", getState);

  const setState = () => {
    const item = getState.filter((pd) => pd.id == productId);
    setProducts(item);
  };
  useEffect(() => {
    setState();
  }, [productId]);
  console.log("ppp", products);

  const dispatch = useDispatch();
  const handleAddItem = (e) => {
    dispatch(item_add(e));
  };
  const handleRemoveItem = (e) => {
    dispatch(item_remove(e));
  };
  const handleCart = (id) => {
    dispatch(cart_delete(id));
    router.push("/");
  };
  return (
    <div className={style.main}>
      {products.map((product) => {
        return (
          <Card key={product.id} style={{ width: "400px" }}>
            <CardMedia component="img" height="194" image={product.imgdata} alt="Paella dish" />
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {product.rname}
              </Typography>
              <Typography variant="h5" component="div"></Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Price: {product.price}
              </Typography>
              <Typography variant="body2">{product.somedata}</Typography>
            </CardContent>
            <CardActions>
              <Link href={`/productDetails/${product.id}`}>
                <Button size="small" className="d-flex justify-content-between bg-primary text-white">
                  <span onClick={product.qtn <= 1 ? () => handleCart(product.id) : () => handleRemoveItem(product)}>-</span>
                  <span>{product.qtn}</span>
                  <span onClick={() => handleAddItem(product)}>+</span>
                </Button>
              </Link>
              <br />
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Total Price: {product.price * product.qtn}
              </Typography>
            </CardActions>
            <DeleteIcon onClick={() => handleCart(product.id)} />
          </Card>
        );
      })}
    </div>
  );
};

export default productDetails;
