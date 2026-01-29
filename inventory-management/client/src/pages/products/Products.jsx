import ProductTable from '../../components/table/ProductTable.jsx';

export default function Products() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Products Page</h1>
      {/* Products content goes here */}
      <ProductTable />
    </div>
  );
}