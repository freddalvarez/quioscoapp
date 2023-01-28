
import { formatearDinero } from "@/helpers"
import Image from "next/image"
import axios from "axios"
import { toast } from "react-toastify"

const Orden = ({orden}) => {

    const { id, nombre, total, pedido } = orden

    const completarOrden = async () => {
        try {
            await axios.post(`/api/ordenes/${id}`)
            toast.success('Orden completada')
        }
        catch (error) {
            toast.error('Hubo un error')
        }
    }

    return (
        <div className="border p-10 space-y-5">
            <h3 className="text-2xl font-bold">Orden: {id}</h3>
            <p className="text-lg font-bold">Nombre: {nombre}</p>
            <h4 className="text-xl font-bold">Productos</h4>

            <di>
                {pedido.map(producto => (
                    <div key={producto.id} className="py-3 border-b last-of-type:border-0 flex items-center">
                        <div className="w-32">
                            <Image src={`/assets/img/${producto.imagen}.jpg`} alt={`Imagen producto ${producto.nombre}`} width={400} height={500} />
                        </div>
                        <div className="space-y-2 p-5">
                            <h4 className="text-xg font-bold text-amber-500">{producto.nombre}</h4>
                            <p className="text-lg fon">Cantidad: {producto.cantidad}</p>
                        </div>
                    </div>
                ))}
            </di>

            <div className="md:flex md:items-center md:justify-between my-10">
                <p className="mt-5 text-4xl font-black text-amber-500">Total a pagar: {formatearDinero(total)}</p>
                <button type="button" onClick={completarOrden} className="bg-indigo-600 hover:bg-indigo-800  text-white mt-5 md:mt-0 py-3 px-10 uppercase font-bold rounded-lg">Completar Orden</button>
            </div>
            

        </div>
    )
}

export default Orden