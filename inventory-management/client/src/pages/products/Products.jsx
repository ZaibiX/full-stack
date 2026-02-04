import ProductTable from '../../components/table/ProductTable.jsx';
import ProductFilter from '../../components/table/ProductFilter.jsx';
import { useState,useEffect } from "react";
import { Button, CircularProgress } from '@mui/material';
import { Link } from 'react-router';
import Pagination from '../../components/table/Pagination.jsx';
import axiosInstance from '../../utils/axiosInstance.js';
import useAuth from '../../store/authStore.js';

const limit = 10;

export default function Products() {
  const [activeFilter, setActiveFilter] = useState(null);
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

 async function handleDelete(id) {
     // Implement delete functionality here
     if(!confirm("Are you sure you want to delete this product?")){
       return;
     }
     console.log(`Delete product with ID: ${id}`);
 
     try{
      setLoading(true);
       const res= await axiosInstance.delete(`/api/product/${id}`);
       console.log("Delete response:",res.data);
       alert("Product deleted successfully");
       // window.location.reload(); 
       fetchProducts();
 
 
     }catch(err){
       console.error("Error deleting product:", err);
       alert("Failed to delete product");
     } 

     setLoading(false);
   }

  const fetchProducts = async () => {
    setLoading(true);
    try {
      if (activeFilter) {
        const response = await axiosInstance.get(`api/products?page=${page}&limit=10&filter=${activeFilter}`);
        console.log("logging ", response.data)
        setProducts(response.data.products);
        setTotalPages(Math.ceil(response.data.totalProducts / limit));
        setLoading(false);
        return;

      }
      const response = await axiosInstance.get(`api/products?page=${page}&limit=10`);
      console.log("logging ", response.data)
      setProducts(response.data.products);
      setTotalPages(Math.ceil(response.data.totalProducts / limit));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    // In a real application, fetch products from an API here



    fetchProducts();
    // setProducts(dummyProducts);
  }, [page, activeFilter]);

  function handleOnChangePage(newPage) {
    setPage(newPage);

  }
  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
  };

  if(loading){
    return <div className='flex flex-col items-center justify-center h-screen w-full'>
      <CircularProgress />
    </div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Products Page</h1>

      

      <ProductFilter activeFilter={activeFilter} onFilterChange={handleFilterChange} />

       {user.role!=="Employee" && ( <div style={{textAlign:"right", marginBottom:"5px"}}> 
        <Button component={Link} variant="contained" color="success" to="/app/products/add-product" disableElevation={true}>Add New Item</Button>
         </div>)}
      {/* Products content goes here */}
      <ProductTable products={products} userRole={user.role} limit={limit} page={page} handleDelete={handleDelete} />

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={handleOnChangePage} />

    </div>
  );
}