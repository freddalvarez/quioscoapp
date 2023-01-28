import useSWR from "swr"
import AdminLayout from "@/layout/AdminLayout"
import axios from "axios"
import Orden from "@/components/Orden"

export default function Admin(req, res) {

    const fetcher = () => axios.get('/api/ordenes').then(res => res.data)
    const { data, error,isLoading } = useSWR("/api/ordenes", fetcher,{
        refreshInterval: 1000
    })

    return (
        <div>
            <AdminLayout pagina="Admin">
                <h1 className="text-4xl font-black">Panel de Administracion</h1>
                <p className="text-2xl my-10">Administra tus ordenes</p>

                {isLoading && <p>Cargando...</p>}
                {error && <p>Hubo un error</p>}
                {data && data.length ? (
                    data.map(orden => (
                        <Orden key={orden.id} orden={orden} />
                    ))
                    ) : (
                        <p>No hay ordenes</p>
                    )
                }           
            </AdminLayout>
        </div>
    )
}