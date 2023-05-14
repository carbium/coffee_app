import { useRouter } from "next/router"


const pasos = [
    {paso: 1, nombre: "Menu", url: "/"},
    {paso: 2, nombre: "Summary", url: "/resumen"},
    {paso: 3, nombre: "Order Details", url: "/total"}
]

const Pasos = () => {

    const router = useRouter()
    const calcularProgreso = () => {
        let valor
        if(router.pathname === "/") {
            valor = 10
        } else if(router.pathname === "/resumen") {
            valor = 50
        } else {
            valor = 100
        }
        return valor
    }

    return (
        <>
            <div className="flex justify-between mb-8">
                {pasos.map(paso => (
                    <button 
                        key={paso.paso} 
                        className="text-2xl font-bold" 
                        onClick={() => {
                            router.push(paso.url)
                        }}
                        >
                        {paso.nombre}
                    </button>
                ))}
            </div>

            <div className="bg-gray-200 mb-10">
                <div className="bg-amber-600 text-xs rounded-full leading-none h-2 text-center text-white w-20"
                style={{width: `${calcularProgreso()}%`}}
                >

                </div>
            </div>
        </>
    )
}

export default Pasos