import "../../styles/productTable.css";


export default function ProductRow({ product, index }) {
  return (
    <tr className="product-row">
      <td data-label="#"> {index + 1} </td>
      <td data-label="Name">{product.name}</td>
      <td data-label="Category">{product.category}</td>
      <td data-label="Price">{product.price}</td>
      <td data-label="Qty">{product.quantity}</td>

      <td data-label="Actions" className="actions">
        <button className="btn view">View</button>
        <button className="btn edit">Edit</button>
        <button className="btn delete">Delete</button>
      </td>
    </tr>
  );
}