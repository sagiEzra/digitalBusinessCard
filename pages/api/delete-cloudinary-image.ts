import type { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }
    const { publicIds } = req.body;
    if (!Array.isArray(publicIds) || publicIds.some(id => typeof id !== 'string')) {
        return res.status(400).json({ success: false, error: 'Invalid publicIds' });
    }
    try {
        for (const publicId of publicIds) {
            await cloudinary.uploader.destroy(publicId);
        }
        return res.status(200).json({ success: true });
    } catch (error: any) {
        return res.status(500).json({ success: false, error: error.message });
    }
} 