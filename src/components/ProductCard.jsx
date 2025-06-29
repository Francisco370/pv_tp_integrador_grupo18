import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, toggleFavorite } from "../redux/productsSlice";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FavoriteIcon from "@mui/icons-material/Favorite";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.products.favorites);
  const isFavorite = favorites.includes(product.id);

  const handleFavoriteChange = () => {
    dispatch(toggleFavorite(product.id));
  };

  const handleDelete = () => {
    dispatch(deleteProduct(product.id));
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 2, position: "relative" }}>
      <CardMedia
        component="img"
        height="140"
        image={product.image}
        alt={product.title}
        sx={{ objectFit: "contain", padding: 1, backgroundColor: "#f5f5f5" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {product.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          ${product.price}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button size="small" component={Link} to={`/product/${product.id}`}>
          Ver detalles
        </Button>
        <Button size="small" color="success" component={Link} to={`/edit-product/${product.id}`}>
          Editar
        </Button>
        <Button size="small" color="error" onClick={handleDelete}>
          Eliminar
        </Button>
        <Checkbox
          checked={isFavorite}
          onChange={handleFavoriteChange}
          icon={<FavoriteIcon />}
          checkedIcon={<FavoriteIcon color="error" />}
          sx={{ position: "absolute", top: 8, right: 8 }}
        />
      </CardActions>
    </Card>
  );
};

export default ProductCard;
