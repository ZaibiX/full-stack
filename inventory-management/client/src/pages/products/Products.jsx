import ProductTable from '../../components/table/ProductTable.jsx';
import ProductFilter from '../../components/ProductFilter.jsx';
import {useState} from "react";

export default function Products() {
  const [activeFilter, setActiveFilter] = useState(null);

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Products Page</h1>

      <ProductFilter activeFilter={activeFilter} onFilterChange={handleFilterChange} />
      {/* Products content goes here */}
      <ProductTable />
    </div>
  );
}