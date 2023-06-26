import { nanoid } from "nanoid"
import { SupabaseStorage } from "./supabase"

export type Uploader = (file: File) => Promise<{data: any, error: any}>

export async function supabaseUpload (file: File, option?: {filePath?: string}){
    const fileExt = file.name.split('.').pop()
    const fp = option?.filePath||`${nanoid(5)}-${Math.random()}.${fileExt!}`
    return await SupabaseStorage.upload(fp, file)
}