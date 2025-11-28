import prisma from '../config/prisma.config.js';
import { QueryBuilder } from "../utils/QueryBuilder.js";

export const getAllCategories = async (request, response) => {
    try {
        const Builder = new QueryBuilder(request.query, {
            defaultSort: 'created_at',
            defaultTake: 10,
            allowedSorts: ['name', 'created_at', 'updated_at', 'id'],
            allowedSearchFields: ['name'],
            allowedIncludes: {
                // Category has implicit many-to-many with Book, so direct include works
                'books': true,
            }
        });

        const prismaQuery = Builder.buildPrismaQuery();

        const [categories, count] = await Promise.all([
            prisma.category.findMany(prismaQuery),
            prisma.category.count({ where: prismaQuery.where })
        ]);

        const meta = Builder.getPaginationMeta(count);

        response.status(200).json({
            message: 'All categories',
            data: categories,
            meta,
        });
    } catch (exception) {
        response.status(500).json({
            message: "Something went wrong",
            error: exception.message
        })
    }
};

export const getCategoryById = async (request, response) => {
    try {
        const idFromURL = request.params?.id;

        const category = await prisma.category.findUnique({
            where: { id: Number(idFromURL) }
        });

        if (!category) {
            return response.status(404).json({
                message: 'Category Not Found'
            });
        }

        response.status(200).json({
            message: 'Successfully Found Category',
            data: category
        });
    } catch (exception) {
        response.status(500).json({
            message: 'Something went wrong',
            error: exception.message
        })
    }
};

export const createCategory = async (request, response) => {
    try {
        const { name } = request.body;

        const newCategory = await prisma.category.create({
            data: { name }
        });

        response.status(201).json({
            message: 'Successfully Created Category',
            data: newCategory
        });
    } catch (exception) {
        response.status(500).json({
            message: 'Something went wrong',
            error: exception.message
        })
    }
};

export const updateCategory = async (request, response) => {
    try {
        const { id } = request.params;
        const { name } = request.body;

        const updatedCategory = await prisma.category.update({
            where: { id: Number(id) },
            data: { name }
        });

        response.status(200).json({
            message: 'Successfully Updated Category',
            data: updatedCategory
        });
    } catch (exception) {
        response.status(500).json({
            message: 'Something went wrong',
            error: exception.message
        })
    }
};

export const deleteCategory = async (request, response) => {
    try {
        const categoryId = request.params?.id;

        await prisma.category.delete({
            where: { id: Number(categoryId) }
        });

        response.status(200).json({
            message: 'Successfully Deleted Category'
        });
    } catch (exception) {
        response.status(500).json({
            message: 'Something went wrong',
            error: exception.message
        })
    }
};


