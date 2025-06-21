export default function ProductCard({ product }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        width: "220px",
        textAlign: "center",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <img
        src={product.image}
        alt={product.title}
        style={{ width: "100px", height: "100px", objectFit: "contain" }}
      />
      <h4 style={{ fontSize: "1rem", margin: "0.5rem 0" }}>
        {product.title.slice(0, 40)}...
      </h4>
      <p style={{ fontWeight: "bold", margin: 0 }}>${product.price}</p>
    </div>
  );
}