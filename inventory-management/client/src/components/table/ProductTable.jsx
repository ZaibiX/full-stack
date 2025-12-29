import "../../styles/productTable.css";
import ProductRow from "./ProductRow";
// import { dummyProducts } from "./dummyProducts";
 const dummyProducts = [
  {
    _id: "65f1a1c1a1a1a1a1a1a1a1a1",
    name: "Wireless Headphones",
    price: 120,
    description: "Noise-cancelling wireless headphones with long battery life.",
    quantity: 25,
    category: "Electronics",
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1700000000/products/headphones.jpg",
    cloudinaryId: "products/headphones",
    createdAt: "2024-11-10T08:30:00.000Z",
    updatedAt: "2024-11-10T08:30:00.000Z",
  },
  {
    _id: "65f1a1c2b2b2b2b2b2b2b2b2",
    name: "Men's Cotton T-Shirt",
    price: 25,
    description: "Comfortable cotton t-shirt available in multiple sizes.",
    quantity: 100,
    category: "Clothing",
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1700000000/products/tshirt.jpg",
    cloudinaryId: "products/tshirt",
    createdAt: "2024-11-11T10:15:00.000Z",
    updatedAt: "2024-11-11T10:15:00.000Z",
  },
  {
    _id: "65f1a1c3c3c3c3c3c3c3c3c3",
    name: "JavaScript Fundamentals",
    price: 40,
    description: "Beginner-friendly book covering core JavaScript concepts.",
    quantity: 60,
    category: "Books",
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1700000000/products/js-book.jpg",
    cloudinaryId: "products/js-book",
    createdAt: "2024-11-12T14:45:00.000Z",
    updatedAt: "2024-11-12T14:45:00.000Z",
  },
  {
    _id: "65f1a1c4d4d4d4d4d4d4d4d4",
    name: "Smart Watch",
    price: 180,
    description: "Fitness tracking smartwatch with heart-rate monitor.",
    quantity: 15,
    category: "Electronics",
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1700000000/products/smartwatch.jpg",
    cloudinaryId: "products/smartwatch",
    createdAt: "2024-11-13T09:20:00.000Z",
    updatedAt: "2024-11-13T09:20:00.000Z",
  },
  {
    _id: "65f1a1c5e5e5e5e5e5e5e5e5",
    name: "Hooded Sweatshirt",
    price: 55,
    description: "Warm and stylish hoodie suitable for winter wear.",
    quantity: 40,
    category: "Clothing",
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1700000000/products/hoodie.jpg",
    cloudinaryId: "products/hoodie",
    createdAt: "2024-11-14T16:00:00.000Z",
    updatedAt: "2024-11-14T16:00:00.000Z",
  },
];

export default function ProductTable() {
  return (
    <div className="table-container">
      <h2 className="table-title">Products</h2>

      <div className="table-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price $</th>
              <th>Qty</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {dummyProducts.map((product, index) => (
              <ProductRow
                key={product._id}
                product={product}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
