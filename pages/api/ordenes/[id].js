import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {
    const prisma = new PrismaClient()

    const id = req.query.id

    if(req.method === 'POST') {
        try {
            const orden = await prisma.orden.update({
                where: {
                    id: Number(id)
                },
                data: {
                    estado: true
                }
            })
            res.status(200).json(orden)
        }
        catch (error) {
            res.status(400).json({error: 'Hubo un error'})
        }
    }
}