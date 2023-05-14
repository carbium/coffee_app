import useSWR from "swr"
import axios from "axios"
import AdminLayout from "../layout/AdminLayout"
import Orden from "../components/Orden"

export default function admin() {

  const fetcher = () => axios('/api/ordenes').then(datos => datos.data)
  const { data, error, isLoading } = useSWR('/api/ordenes', fetcher, {refreshInterval: 100})

  // console.log(data);
  // console.log(error);
  // console.log(isLoading);

  return (
    <AdminLayout>
        <h1 className="text-4xl font-black text-red-600">Admin Panel</h1>
        <p className="text-2xl my-10 text-red-600">Admin Clients orders...</p>

        {data && data.length ? data.map( orden => 
          <Orden
            key={orden.id}
            orden={orden}
          />
          ) : <p className="text-white">There are no pending orders</p> }
    </AdminLayout>
  )
}
