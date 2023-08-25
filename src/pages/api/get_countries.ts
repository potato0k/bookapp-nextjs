//Books data API
import type { NextApiRequest, NextApiResponse } from 'next'
import BooksData from '@/lib/data'


export default function handler (req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({BooksData})
}
