import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { objectName } = req.query
    const ossUrl = `https://aweb-tlias-demon.oss-cn-hangzhou.aliyuncs.com/photos/${objectName}`

    try {
        const response = await fetch(ossUrl)
        const buffer = await response.arrayBuffer()

        res.setHeader('Content-Type', 'image/jpeg')
        res.send(Buffer.from(buffer))
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch image' })
    }
} 