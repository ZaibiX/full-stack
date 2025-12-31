import ProductTable from "../components/table/ProductTable" 
import "../styles/dashboard.css"
export default function Dashboard() {
    

    return(
        <div>
            <h1 className="page-heading">Inventory Management Dashboard</h1>
            

            <ProductTable />
        </div>
    )
}