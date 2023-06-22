/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { TailSpin } from 'react-loader-spinner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

export type ThumbnailUploaderProps = React.InputHTMLAttributes<HTMLInputElement> & {
    onImageUpload?: (imageUrl: string) => void,
    defaultImage?: string,
    value?: string,
    onChange?: (imgUrl: string) => void
}

const ThumbnailUploader = ({
    defaultImage,
    onImageUpload,
    value,
    onChange,
    ...props
}: ThumbnailUploaderProps) => {

    const [previewImage, setPreviewImage] = useState<any>(defaultImage || value);
    const [imageFile, setImageFile] = useState<File>();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrorMessage(undefined)
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            if (file.size > (1024 * 1024 * 3)) {
                setErrorMessage('File must be less than 3mb');
                return;
            }
            setPreviewImage(URL.createObjectURL(file));
            setImageFile(file);
        }
    }

    const upload = async () => {
        if (!imageFile || loading) return;
        
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('file', imageFile);
            const response = await fetch(`/api/upload`,
                {
                    body: formData,
                    method: 'POST',
                }
            );
            const data = await response.json() as {
                data: {
                    fileName: string,
                    mimetype: string
                    url: string
                }
            };
            // console.log({url: data});
            setImageFile(undefined);
            onImageUpload?.(data.data.url)
            setLoading(false);
        } catch (error: any) {
            setErrorMessage(error.message)
            setLoading(false)
        }

    }


    return (
        <>
            <Card className=''>
                <CardHeader>
                    <CardTitle>Thumnail Image for product</CardTitle>
                    <CardDescription>
                        {
                            errorMessage && <p className='py-2 text-xs text-red-700'>{errorMessage}</p>
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center w-full">
                        <label
                            className="flex flex-col bg-center bg-cover bg-no-repeat items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                            style={{ backgroundImage: `url(${previewImage || ''})` }}
                        >
                            {
                                loading
                                    ?
                                    <div className='flex items-center justify-center'>
                                        <TailSpin width={30} height={30} />
                                    </div>
                                    :
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                            }
                            <input id="dropzone-file" type="file" accept='image/*' className="hidden" onChange={handleChange} {...props} />
                        </label>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className='w-full' onClick={() => void upload()} disabled={!imageFile || loading}>Upload</Button>
                </CardFooter>
            </Card>
        </>

    )
}

export default ThumbnailUploader