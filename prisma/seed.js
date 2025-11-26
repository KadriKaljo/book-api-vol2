import prisma from "../src/config/prisma.config.js";
import { faker } from "@faker-js/faker/locale/en";


const databaseSeeder = async () => {
    await prisma.author.deleteMany();
    await prisma.book.deleteMany();

    console.log('🌱 Starting to seed database...');

    const authors = [];

    console.log("🧐 Generating authors...");

    for (let i = 0; i < faker.number.int({ min: 30, max: 50}); i++) {
        const author = await prisma.author.create({
            data: {
                name: faker.person.fullName()
            }
        });

        authors.push(author);
    }

    console.log("📚 Generating books...");

    for(let i = 0; i < 50; i++) {
        const randomAuthor = authors[faker.number.int({ min: 0, max: authors.length - 1})];

        const book = await prisma.book.create({
            data: {
                title: faker.book.title(),
                description: faker.lorem.sentence(),
                thumbnail_url: faker.image.url(),
                release_year: new Date(faker.date.anytime()).getFullYear(),
                authors: {
                    create: {
                        author: {
                            connect: { id: randomAuthor.id }
                        }
                    }
                }
            }
        })
    }

    console.log("✅ Finished seeding database!")
}

try {
    await databaseSeeder();
    prisma.$disconnect();
} catch (exception) {
    console.error(exception);
    prisma.$disconnect();
    process.exit(1);
}

