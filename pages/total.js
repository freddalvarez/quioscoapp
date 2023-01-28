import Layout from '@/layout/Layout'
import { useEffect, useCallback } from 'react'
import useQuiosco from '@/hooks/useQuiosco'
import { formatearDinero } from '@/helpers'

export default function Total() {

    const { pedido,nombre,setNombre, colocarOrden,total } = useQuiosco()

    const comprobarPedido = useCallback(() => {
        return pedido.length === 0 || nombre === '' || nombre.length < 3
    },[pedido,nombre])

    useEffect(() => {
        comprobarPedido()
    }, [pedido,comprobarPedido])

    

    return (
        <Layout pagina='Total y Confirmar Pedido'>
            <h1 className="text-4xl font-black">Total y Confirmar Pedido</h1>
            <p className="text-2xl my-10">Confirma tu Pedido a continuacion</p>

            <form onSubmit={colocarOrden}>
                <div>
                    <label className='block uppercase text-slate-800 font-bold text-xl' htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                        placeholder="Tu Nombre"
                        className='bg-gray-200 w-full lg:w-1/3 p-2 rounded-md mt-3'>
                    </input>
                </div>
                <div className='mt-10'>
                    <p className='text-2xl text-amber-500'>Total a Pagar {''} <span className='font-bold'>{formatearDinero(total)}</span></p>
                </div>
                <div className='mt-5'>
                    <input
                        type="submit"
                        value="Confirmar Pedido"
                        className={`${comprobarPedido() ? 'bg-indigo-100 hover:bg-indigo-100': 'bg-indigo-600 hover:bg-indigo-900'} text-center w-full lg:w-auto p-2 rounded px-5  py-2 mt-3 text-white uppercase font-bold`}
                        disabled={comprobarPedido()}
                        >
                    </input>
                </div>
            </form>
        </Layout>
    )   
}