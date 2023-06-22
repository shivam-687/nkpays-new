import { z } from "zod";

export const CreateExtensionSchema = z.object({
    title: z.string(),
    data: z.record(z.any()),
    active: z.boolean().default(true).optional()
})

export const CreateGoogleMapExtensionSchema = z.object({
    title: z.string().default('Google Map'),
    data: z.object({
        apiKey: z.string().optional(),
        latitude: z.string().optional(),
        longitude: z.string().optional()
    }),
    active: z.boolean().default(true).optional()
})

export type CreateGoogleMapExtensionInput = z.TypeOf<typeof CreateGoogleMapExtensionSchema>;

export type GoogleMapExtensionOutput = {
    id: number,
    title: string,
    data: {
        apikey?: string,
        latitude?: string,
        longitude?: string,
    },
    active: boolean
}


export const CreateTwakTooSettingSchema = z.object({
    title: z.string().default('twak_too'),
    data: z.object({
        propertyId: z.string().optional(),
        widgetId: z.string().optional()
    }),
    active: z.boolean().default(true).optional()
})
export type CreateTwakTooSettingInput = z.TypeOf<typeof CreateTwakTooSettingSchema>;


export const UpdateTwakTooSettingSchema = z.object({
    id: z.number()
}).merge(CreateTwakTooSettingSchema)
export type UpdateTwakTooSettingInput = z.TypeOf<typeof UpdateTwakTooSettingSchema>;

export type TwakTooSettingOutput = {
    id: number,
    title: string,
    data: {
        propertyId?: string,
        widgetId?: string,
    },
    active: boolean
}


export const CreateWhatsappSettingSchema = z.object({
    title: z.string().default('twak_too'),
    data: z.object({
        number: z.string().optional()
    }),
    active: z.boolean().default(true).optional()
})
export type CreateWhatsappSettingInput = z.TypeOf<typeof CreateWhatsappSettingSchema>;


export const UpdateWhatsappSettingSchema = z.object({
    id: z.number()
}).merge(CreateWhatsappSettingSchema);

export type UpdateWhatsappSettingInput = z.TypeOf<typeof UpdateWhatsappSettingSchema>;


export type WhatsappSettingOutput = {
    id: number,
    title: string,
    data: {
        number?: string
    },
    active: boolean
}


export type CreateExtensionInput = z.TypeOf<typeof CreateExtensionSchema>;

export const UpdateExtensionSchema = z.object({
    id: z.number()
}).merge(CreateExtensionSchema);

export type UpdateExtensionInput = z.TypeOf<typeof UpdateExtensionSchema>;

export const DeleteExtensionSchema = z.object({
    id: z.number()
})

