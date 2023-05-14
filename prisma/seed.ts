import {categorias} from './data/categorias'
import {productos} from './data/productos'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const main = async() : Promise<void> => {
    try {
        await prisma.categoria.createMany({ //categoria es el nombre del modelo pero en minusculas
            data: categorias
        })
        await prisma.producto.createMany({ 
            data: productos
        })
    } catch (error) {
        console.log(error);
        
    }
}

main()