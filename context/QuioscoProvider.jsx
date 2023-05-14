import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {
    
    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({}) 
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)

    const router = useRouter()

    const obtenerCategorias = async () => {
        const {data} = await axios('/api/categorias')
        setCategorias(data);
    }

    //los useeffect se ejecutan por el orden de escritura
    useEffect(() => {
        obtenerCategorias()
    }, [])

    //selecciono categoria actual por defecto, al abrir la pag
    useEffect(() => {
        setCategoriaActual(categorias[0])
    }, [categorias])

    //enviar el total del pedido a cocina
    useEffect(() => {
      const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
      setTotal(nuevoTotal)
    }, [pedido])
    

    //al hacer click muestro la categoria seleccionada
    //comparo el id seleccionado con el id de las categorias
    //asi obtengo toda la info de la cat seleccionada
    const handleClickCategoria = id => {
        const categoria = categorias.filter( cat => cat.id === id)
        setCategoriaActual(categoria[0])
        router.push('/')
    }

    //al hacer click en add order, seteo el state de producto, con esa info
    //para mostrarla en un modal
    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleChangeModal = () => {
        setModal(!modal)
    }

    const handleAgregarPedido = ({categoriaId, ...producto}) => { //saco categoriaId del objeto producto
        
        if(pedido.some(productoState => productoState.id === producto.id )) {
            //actualizar cantidad del pedido
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id 
            ? producto : productoState ) //retorno producto si actualizaron el pedido, o retorno productostate que seria el primer pedido
            setPedido(pedidoActualizado)
            toast.success('🍕 Updating Order!', {
                position: "top-right",
                autoClose: 2000,
                theme: "colored",
                className: "custom-toast-background"
                });
        } else {
            setPedido([...pedido, producto]);
            toast.success('🍕 Adding Order!', {
                position: "top-right",
                autoClose: 2000,                
                theme: "colored",
                className: "custom-toast-background"
                });
        }

        setModal(false)
        
    }

    const handleEditarCantidad = id => {
        const productoActualizado = pedido.filter(producto => producto.id === id)
        setProducto(productoActualizado[0])
        setModal(!modal)
    }

    const handleEliminarProducto = id => {
        const pedidoActualizado = pedido.filter(producto => producto.id !== id)
        setTimeout(() => {
            setPedido(pedidoActualizado)
        }, 1500);
        toast.error('🍕 Deleting Order!', {
            position: "top-right",
            autoClose: 2000,
            theme: "colored"            
            });
    }

    const colocarOrden = async e => {
        e.preventDefault()

        try {
            await axios.post('/api/ordenes', {
                pedido, nombre, total, fecha: Date.now().toString()
            })

            //resetear app
            setCategoriaActual(categorias[0]) 
            setPedido([])
            setNombre('')
            setTotal(0)

            toast.success('🍕 Order Send!', {
                autoClose: 1500,                
                theme: "colored",
                className: "custom-toast-background"
                });
            
            setTimeout(() => {
                router.push('/')
            }, 2000);

        } catch (error) {
            console.log(error);
        }
      }

    return(
        <QuioscoContext.Provider
            value={{
                categorias,
                handleClickCategoria,
                categoriaActual,
                producto,
                handleSetProducto,
                modal,
                handleChangeModal,
                handleAgregarPedido,
                pedido,
                handleEditarCantidad,
                handleEliminarProducto,
                nombre,
                setNombre,
                colocarOrden,
                total
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuioscoContext
