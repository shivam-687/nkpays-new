import { ContactQueryRouter } from './routers/contactQuery';
import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { ProductRouter } from './routers/product';
import { LoginLinkRouter } from './routers/loginLink';
import { ProductEnquiryRouter } from './routers/productQuery';
import { ContactConfigRouter } from './routers/contactConfig';
import { ExtensionRouter } from './routers/extensions';
import { PageRouter } from './routers/page';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  contact_query: ContactQueryRouter,
  loginlink: LoginLinkRouter,
  product: ProductRouter,
  product_enquiry: ProductEnquiryRouter,
  contactInfo: ContactConfigRouter,
  extension: ExtensionRouter,
  page: PageRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
