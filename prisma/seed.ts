/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { faker } from '@faker-js/faker';
import { PrismaClient, Product } from '@prisma/client'
import slugify from 'slugify';
import {getRandomNumber} from '../src/utils'
const prisma = new PrismaClient()

async function SeedContactQuery() {
    try {
        await prisma.contactQuery.deleteMany();
        const res = await prisma.contactQuery.createMany({
            data: Array(20).fill(null).map(v => {
                return {
                    name: faker.person.fullName(),
                    email: faker.internet.email(),
                    phone: faker.phone.number(),
                    message: faker.lorem.paragraph()
                }
            })
        });

        console.log("Seeding complete", res)
    } catch (error) {
        console.error(error)
    }
}

async function seedProduct() {
    try {
        await prisma.product.deleteMany();
        const res = await prisma.product.createMany({
            data: Array(10).fill(null).map(v => {
                const title = faker.commerce.productName();
                const desc = faker.commerce.productDescription();
                const metaDesc = desc.slice(0, 200);
                const slug = slugify(title);
                const thumbnail = faker.image.urlPicsumPhotos({width: 500, height: 500})
                const price = Number(faker.commerce.price());

                return {
                    title,
                    desc,
                    metaDesc,
                    slug,
                    thumbnail,
                    price,
                    gallery: [],

                }
            })
        });
        console.log("Product Seeding complete", res)
        return res;
    } catch (error) {
        console.error(error)
    }
}
async function seedProductEnquiry() {
    try {
        const products = await prisma.product.findMany();
        if(products.length <= 0)return;
        
        await prisma.productEnquiry.deleteMany();
        const res = await prisma.productEnquiry.createMany({
            data: Array(50).fill(null).map(v => {
                const name = faker.person.fullName();
                const email = faker.internet.email();
                const phone = faker.phone.number();
                const message = faker.lorem.paragraph()
                const productId = products[getRandomNumber(0, products.length-1)]?.id

                return {
                    name,
                    email,
                    phone,
                    message,
                    productId: productId!
                }
            })
        });
        console.log("Product Enquiry Seeding complete", res)
        return res;
    } catch (error) {
        console.error(error)
    }
}


async function main() {
    // await SeedContactQuery();
    const products = await seedProduct();
    await seedProductEnquiry()
    
}

main()
.then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })