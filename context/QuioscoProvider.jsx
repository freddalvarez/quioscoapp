import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});
  const [producto, setProducto] = useState({});
  const [modal, setModal] = useState(false);
  const [pedido, setPedido] = useState([]);
  const [nombre, setNombre] = useState("");
  const [total, setTotal] = useState(0);

    const router = useRouter();

  const obtenerCategorias = async () => {
    const { data } = await axios("/api/categorias");
    setCategorias(data);
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  useEffect(() => {
    setCategoriaActual(categorias[0]);
  }, [categorias]);

  const handleClickCategoria = (id) => {
    const categoria = categorias.filter((cat) => cat.id === id);
    setCategoriaActual(categoria[0]);
    router.push('/');
  };

  const handleSetProducto = (producto) => {
    setProducto(producto);
  };

  const handleChangeModal = () => {
    setModal(!modal);
  };
  const handleAgregarPedido = ({ categoriaId,...producto }) => {
    if (pedido.some((productoState) => productoState.id === producto.id)) {
      const pedidoActualizado = pedido.map((productoState) =>
        productoState.id === producto.id ? producto : productoState
      );
      setPedido(pedidoActualizado);
      toast.success("Guardado correctamente");
        setModal(false);
      return;
    }
    setPedido([...pedido, producto]);
    toast.success("Producto agregado al pedido");
    setModal(false);
  };

  const handleEditarCantidades = (id) => {
    const pedidoActualizar= pedido.filter((producto) => producto.id === id);
    setProducto(pedidoActualizar[0]);
    setModal(!modal);
  }
  const handleEliminarProducto = (id) => {
    const pedidoActualizado= pedido.filter((producto) => producto.id !== id);
    setPedido(pedidoActualizado);
  }

  useEffect(() => {
    const totalPedido = pedido.reduce((acc, producto) => {
      return acc + producto.cantidad * producto.precio;
    }, 0);
    setTotal(totalPedido);
  }, [pedido])

const colocarOrden = async (e) => {
    e.preventDefault()
    try {
        await axios.post('/api/ordenes', {
            nombre,
            pedido,
            total,
            fecha: Date.now().toString()
        })
        setPedido([])
        setCategoriaActual(categorias[0])
        setNombre('')
        toast.success('Orden colocada correctamente')
        setTimeout(() => {
            router.push('/')
        }
        , 6000)
    } catch (error) {
        console.log(error)
    }
    
}

  return (
    <QuioscoContext.Provider
        value={{
            categorias,
            categoriaActual,
            handleClickCategoria,
            producto,
            handleSetProducto,
            modal,
            handleChangeModal,
            handleAgregarPedido,
            pedido,
            handleEditarCantidades,
            handleEliminarProducto,
            nombre,
            setNombre,
            colocarOrden,
            total
        }}
    >
        {children}
    </QuioscoContext.Provider>
);
};

export { QuioscoProvider };

export default QuioscoContext;
