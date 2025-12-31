import "../../styles/productTable.css";
import { Link, NavLink } from "react-router";

export default function ProductRow({ product, index }) {
  return (
    <tr className="product-row">
      <td data-label="#"> {index + 1} </td>
      <td data-label="Name">{product.name}</td>
      <td data-label="Category">{product.category}</td>
      <td data-label="Price">{product.price}</td>
      <td data-label="Qty">{product.quantity}</td>

      <td data-label="Actions" className="actions">
        {/* <button className="btn view">View</button> */}
        <Link to={`/view-product/${product.id}`} className="btn view">
          View
        </Link>
        {/* <button className="btn edit"><Link to={`/edit-product/${product.id}`}>Edit</Link></button> */}

        <Link to={`/edit-product/${product.id}`} className="btn edit">
          Edit
        </Link>
        <button className="btn delete">Delete</button>
      </td>
    </tr>
  );
}