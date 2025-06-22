import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setProductDetail, toggleFavorite } from '../redux/productsSlice';

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const products = useSelector(state => state.products.products);
  const product = useSelector(state => state.products.selectedProduct);
  const favorites = useSelector(state => state.products.favorites);
  const isFavorite = product ? favorites.includes(product.id) : false;

  useEffect(() => {
    const prodIdNum = parseInt(productId);

    // Buscar en el store primero
    const productFromStore = products.find(p => p.id === prodIdNum);

    if (productFromStore) {
      dispatch(setProductDetail(productFromStore));
    } else {
      // Si no está, hacer fetch a la API
      const fetchProduct = async () => {
        try {
          const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
          const data = await response.json();
          dispatch(setProductDetail(data));
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };
      fetchProduct();
    }
  }, [productId, dispatch, products]);

  const handleFavoriteToggle = () => {
    if (product) {
      dispatch(toggleFavorite(product.id));
    }
  };

  if (!product) return <p>Cargando producto...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} style={{ maxWidth: '300px' }} />
      <p><strong>Descripción:</strong> {product.description}</p>
      <p><strong>Categoría:</strong> {product.category}</p>
      {product.rating && product.rating.count !== undefined && (
        <p><strong>Stock:</strong> {product.rating.count}</p>
      )}
      <label style={{ cursor: 'pointer', userSelect: 'none' }}>
        <input
          type="checkbox"
          checked={isFavorite}
          onChange={handleFavoriteToggle}
          style={{ marginRight: '5px' }}
        />
        Marcar como favorito
      </label>
    </div>
  );
};

export default ProductDetail;
