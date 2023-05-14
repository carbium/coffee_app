import Image from "next/image"
import useQuiosco from "../hooks/useQuiosco"

const Categoria = ({categoria}) => {

    const { categoriaActual, handleClickCategoria } = useQuiosco()
    const { nombre, icono, id } = categoria
  
    return (
        <div className={`${categoriaActual?.id === id ? 'bg-red-500' : ''} flex items-center gap-4 w-full p-5 hover:bg-red-500 transition-colors border-b-2 border-amber-500 last-of-type:border-none`}>
            <Image
                width={70}
                height={70}
                src={`/assets/img/icono_${icono}.svg`}
                alt="Imagen Icono"
            />

            <button
                type="button"
                className="text-2xl font-bold hover:cursor-pointer"
                onClick={() => handleClickCategoria(id)}
            >
                {nombre}
            </button>
        </div>
    )
}

export default Categoria