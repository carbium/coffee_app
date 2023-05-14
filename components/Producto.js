import Image from "next/image"
import { formatearDinero } from "../helpers"
import useQuiosco from "../hooks/useQuiosco"

const Producto = ({producto}) => {

    const { nombre, imagen, precio } = producto
    const { handleSetProducto, handleChangeModal } = useQuiosco()

    return (
        <div className="border rounded-md p-3">
            <Image className="rounded-lg" src={`/assets/img/${imagen}.jpg`} alt={`Imagen Platillo ${nombre}`} width={400} height={500} priority={true}/>
            <div>
                <h3 className="text-2xl font-bold h-20">{nombre}</h3>
                <p className="mt-5 font-black text-4xl text-red-500">
                    {formatearDinero(precio)}
                </p>
                <button
                    type="button"
                    className="bg-amber-600 hover:bg-amber-700 transition-colors text-white mt-5 p-3 uppercase font-bold w-full"
                    onClick={() => {
                        handleSetProducto(producto)
                        handleChangeModal()
                    }}
                >
                    add to your order 
                </button>
            </div>
        </div>
    )
}

export default Producto