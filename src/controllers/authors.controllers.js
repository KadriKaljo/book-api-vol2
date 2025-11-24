import prisma from '../config/prisma.config.js';

export const getAllAuthors = async (request, response) => {
    try {

        const authors = await prisma.author.findMany();

        response.json({
            message: 'All authors',
            data: authors
        })
    } catch (exception) {
        console.log(exception);
        response.status(500).json({
            message: "Something went wrong",
            error: exception.message
        })
    }
};

export const getAuthorById = async (request, response) => {
    try {
        const idFromURL = request.params?.id;

        const book = await prisma.author.findUnique({
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
            message: 'Successfully Found Author',
            data: book
        })
    } catch (exception) {
        response.status(500).json({
            message: 'Something went wrong',
            error: exception.message
        })
    }
};

export const createAuthor = async (request, response) => {
    try {
        const { name } = request.body;

        const newBook = await prisma.author.create({
            data: {
                name
            }
        });

        response.status(201).json({
            message: 'Successfully Created Author',
            data: newBook
        })
    } catch (exception) {
        response.status(500).json({
            message: 'Something went wrong',
            error: exception.message
        })
    }
};

export const updateAuthor = async (request, response) => {
    try {
        const { id } = request.params;
        const { name } = request.body;

        const updatedBook = await prisma.author.update({
            where: {
                id: Number(id),
            },
            data: {
                name
            }
        });

        if (!updatedBook) {
            response.status(404).json({
                message: 'Not Found'
            })
        }

        response.status(200).json({
            message: 'Successfully Updated Author',
            data: updatedBook
        })

    } catch (exception) {
        response.status(500).json({
            message: 'Something went wrong',
            error: exception.message
        })
    }
};

export const deleteAuthor = async (request, response) => {
    try {
        const bookId = request.params?.id;

        await prisma.author.delete({
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