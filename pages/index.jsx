import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Products from "../products";
import { item_add } from "../redux/actions/cartAction";

export default function Home() {
  const [products, setProducts] = useState(Products);
  const dispatch = useDispatch();

  const handleAddItem = (e) => {
    dispatch(item_add(e));
  };
  return (
    <div className="container">
      <Typography variant="h2" sx={{ textAlign: "center", marginTop: "100px" }}>
        Products
      </Typography>
      <hr />
      <section>
        <Grid container spacing={4}>
          {products.map((product) => {
            return (
              <Grid item xs={12} md={4} key={product.id}>
                <Card sx={{ minWidth: 275 }}>
                  <CardMedia component="img" height="194" image={product.imgdata} alt="Paella dish" />
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      {product.rname}
                    </Typography>
                    <Typography variant="h5" component="div"></Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {product.price}
                    </Typography>
                    <Typography variant="body2">{product.somedata}</Typography>
                  </CardContent>
                  <CardActions>
                    <Link href={`/productDetails/${product.id}`}>
                      <Button size="small" onClick={() => handleAddItem(product)}>
                        Buy Now
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </section>
    </div>
  );
}
