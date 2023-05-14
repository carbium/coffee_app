import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { formatearDinero } from "../helpers";

export default function Orden({orden}) {
    const { id, nombre, pedido, total} = orden;

    const completarOrden = async () => {
        try {
            await axios.post(`/api/ordenes/${id}`)
            toast.success('🍕 Order Ready!', {
                position: "top-right",
                autoClose: 2000,
                theme: "colored",
                className: "custom-toast-background"
                });
        } catch (error) {
            toast.error('There´s an error :(')
        }
    }

    return (
        
        <div className="border rounded-lg p-10 my-5">
            <h3 className="text-2xl font-bold text-white ">Order: {id}</h3>
            <p className="text-lg my-10 text-white">Client: {nombre}</p>

            <div>
                {pedido.map(platillo => (
                    <div key={platillo.id} className="py-3 flex items-center border-b last-of-type:border-0">
                        <div className="w-32 rounded-md">
                            <Image
                                width={400}
                                height={500}
                                priority={true}
                                alt="imagen orden"
                                src={`/assets/img/${platillo.imagen}.jpg`}
                            />
                        </div>

                        <div className="p-5 space-y-2">
                            <h4 className="text-xl font-bold text-red-500">{platillo.nombre}</h4>
                            <p className="text-lg font-bold text-red-500">Qty: {platillo.cantidad}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="md:flex md:items-center md:justify-between my-10">
                <p className="mt-5 font-black text-3xl text-red-600">Total to pay: {formatearDinero(total)}</p>

                <button
                    className="bg-amber-600 hover:bg-amber-800 hover:cursor-pointer text-white mt-5 md:mt-0 py-3 px-10 uppercase font-bold rounded-lg transition-all"
                    type="button"
                    onClick={() => completarOrden()}
                >
                    Order ready
                </button>

            </div>

        </div>
    )
}
