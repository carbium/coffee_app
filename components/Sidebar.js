import Image from "next/image"
import useQuiosco from "../hooks/useQuiosco"
import Categoria from "./Categoria"

const Sidebar = () => {

  const { categorias } = useQuiosco()

  return (
    <>
        <Image  width={300} height={270} src="/assets/img/logo3.png" alt="imagen logotipo" priority={true}/>

        <nav className="mt-10  ">
          {categorias.map(categoria => (
            <Categoria
              key={categoria.id}
              categoria={categoria}
            />
          ))}
        </nav>
    </>
  )
}

export default Sidebar
