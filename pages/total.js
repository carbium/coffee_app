import { useEffect } from "react";
import Layout from "../layout/Layout"
import useQuiosco from "../hooks/useQuiosco";
import { formatearDinero } from "../helpers";

export default function Total() {

  const { pedido, nombre, setNombre, colocarOrden, total } = useQuiosco()

  //verifica si no hay nada en el array de pedido (retorna false o true)
  const comprobarPedido = () => {
    return pedido.length === 0 || nombre === '' || nombre.length < 3
  }

  useEffect(() => {
   comprobarPedido()
  }, [pedido])

  return (
    <Layout pagina='Total'>
        <h1 className="text-4xl font-black">Total to Pay</h1>
        <p className="text-2xl my-10">Confirm Your Order...</p>

        <form
          onSubmit={colocarOrden}
        >
          <div>
            <label htmlFor="nombre" className="block uppercase text-slate-800 font-bold text-xl">Name</label>
            <input
              id="nombre"
              type="text"
              className="bg-gray-200 w-full lg:w-1/3 p-2 rounded-md"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </div>

          <div className="mt-10 ">
            <p className="text-2xl">Total to pay: {''} <span className="font-bold">{formatearDinero(total)}</span></p>
          </div>

          <div className="mt-5">
            <input
              type="submit"
              value='Confirm Order'
              disabled={comprobarPedido()}
              className={`${comprobarPedido() ? 'bg-red-100' : 'bg-red-500 hover:cursor-pointer hover:bg-red-700 transition-colors'} 
              w-full lg:w-auto px-5 py-2 rounded-md font-bold uppercase text-white  text-center`}
            />
          </div>

        </form>

    </Layout>
  )
}
