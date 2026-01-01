export default function ProductRow({ product, index, page, limit }) {
  const rowNumber = (page - 1) * limit + index + 1;

  return (
    <tr className="product-row">
      <td data-label="#">{rowNumber}</td>

      <td data-label="Name">{product.name}</td>
      <td data-label="Category">{product.category}</td>
      <td data-label="Price">{product.price}</td>
      <td data-label="Qty">{product.quantity}</td>

      <td data-label="Actions" className="actions">
        <Link to={`/view-product/${product._id}`} className="btn view">
          View
        </Link>
        <Link to={`/edit-product/${product._id}`} className="btn edit">
          Edit
        </Link>
        <button className="btn delete">Delete</button>
      </td>
    </tr>
  );
}
