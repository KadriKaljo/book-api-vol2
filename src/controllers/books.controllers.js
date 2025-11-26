import prisma from '../config/prisma.config.js';

import { QueryBuilder } from "../utils/QueryBuilder.js";

export const getAllBooks = async (request, response) => {
    try {
        const Builder = new QueryBuilder(request.query, {
            defaultSort: 'created_at',
            defaultTake: 20,
            allowedSorts: ['id', 'title', 'description', 'created_at', 'updated_at'],
            allowedSearchFields: ['title', 'description'],
            allowedIncludes: {
                'authors': { include: { author: true }}
            }
        });

        const prismaQuery = Builder.buildPrismaQuery();

        console.log(prismaQuery);

        const [books, count] = await Promise.all([
            prisma.book.findMany(prismaQuery),
            prisma.book.count({ where: prismaQuery.where })
        ]);

        const meta = Builder.getPaginationMeta(count);

        response.status(200).json({
            message: 'All books',
            data: books,
            meta,
        });
    } catch (exception) {
        console.log(exception);
        response.status(500).json({
            message: "Something went wrong",
            error: exception.message
        })
    }
};

export const getBookById = async (request, response) => {
    try {
        const idFromURL = request.params?.id;

        const book = await prisma.book.findUnique({
            where: {
                id: Number(idFromURL)
            }
        });

        if (!book) {
            response.status(404).json({
                message: 'Not Found'
            })
        }

        response.status(200).json({
            message: 'Successfully Found Book',
            data: book
        })
    } catch (exception) {
        response.status(500).json({
            message: 'Something went wrong',
            error: exception.message
        })
    }
};

export const createBook = async (request, response) => {
    try {
        const { title, description, thumbnail_url, release_year } = request.body;

        const newBook = await prisma.book.create({
            data: {
                title,
                description,
                thumbnail_url,
                release_year: Number(release_year),
            }
        });

        response.status(201).json({
            message: 'Successfully Created Book',
            data: newBook
        })
    } catch (exception) {
        response.status(500).json({
            message: 'Something went wrong',
            error: exception.message
        })
    }
};

export const updateBook = async (request, response) => {
    try {
        const { id } = request.params;
        const { title, description, thumbnail_url, release_year } = request.body;

        const updatedBook = await prisma.book.update({
            where: {
                id: Number(id),
            },
            data: {
                title,
                description,
                thumbnail_url,
                release_year: Number(release_year),
            }
        });

        if (!updatedBook) {
            response.status(404).json({
                message: 'Not Found'
            })
        }

        response.status(200).json({
            message: 'Successfully Updated Book',
            data: updatedBook
        })

    } catch (exception) {
        response.status(500).json({
            message: 'Something went wrong',
            error: exception.message
        })
    }
};

export const deleteBook = async (request, response) => {
    try {
        const bookId = request.params?.id;

        await prisma.book.delete({
            where: {
                id: Number(bookId)
            }
        })

        response.status(200).json({
            message: 'Successfully Deleted',
        })
    } catch (exception) {
        response.status(500).json({
            message: 'Something went wrong',
            error: exception.message
        })
    }
};