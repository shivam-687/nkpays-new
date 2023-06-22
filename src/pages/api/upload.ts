/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NextApiRequest, NextApiResponse } from 'next';
import {createRouter, expressWrapper} from 'next-connect';
import multer, { FileFilterCallback } from 'multer';
import { NextRequest, NextResponse } from "next/server";
import { existsSync } from "fs";
import fs from "fs/promises";
import path from "path";
import { nanoid } from 'nanoid';





// Initialize multer
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 10, // 10 MB
//   },
// });

const upload = multer({
    storage: multer.diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => {
            const fileName = `${nanoid(10)}.${file.originalname.split('.').pop()}`
            cb(null, fileName)
        },
      }),
    limits: {
        fileSize: 1024 * 1024 * 10
    }
})

const router =  createRouter<NextApiRequest, NextApiResponse>();
const uploadMiddleware = upload.single('file');

router.use( (req: any, res:any, next) => {
     uploadMiddleware(req, res, next)
});

router.post((req:any, res) => {
    // console.log({req})
    res.json({data: {
      fileName: req.file.filename,
      mimetype: req.file.mimetype,
      url: `/uploads/${req.file.filename}`
    }})
})


export default router.handler();


export const config = {
  api: {
    bodyParser: false
  }
}
