import Layout from "@/layout/Layout"
import useQuiosco from "@/hooks/useQuiosco"
import ResumenProducto from "@/components/ResumenProducto"

export default function Resumen() {

    const { pedido } = useQuiosco()
    return (
        <Layout pagina='Resumen'>
            <h1 className="text-4xl font-black">Resumen</h1>
            <p className="text-2xl my-10">Revisa tu pedido antes de continuar:</p>
            {pedido.length > 0 ? (
                <>
                    {pedido.map(producto => (
                        <ResumenProducto key={producto.id} producto={producto} />
                    ))}
                </>
            ) : (
                <p className="text-2xl text-center mt-10">No hay productos en el pedido</p>
            )}
        </Layout>
    )
}