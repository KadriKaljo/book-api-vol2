import prisma from '../config/prisma.config.js';

export const getAllBooks = async (request, response) => {
  try {
    const { sort, sort_direction, take, page } = request.query;
    console.log('query params:', request.query);

    // Lubatud sortimise väljad
    const allowedSortFields = ['id', 'title', 'release_year', 'created_at', 'updated_at'];

    // Määra sortimisväli (default: 'title')
    const sortBy = allowedSortFields.includes(sort) ? sort : 'title';

    // Määra suund (default: 'asc')
    const sortDirection =
      sort_direction === 'desc' || sort_direction === 'asc'
        ? sort_direction
        : 'asc';

    // Võta "take" (mitu rida lehel) – default 10
    const takeNumberRaw = Number(take);
    const takeNumber =
      Number.isFinite(takeNumberRaw) && takeNumberRaw > 0 ? takeNumberRaw : 10;

    // Võta "page" (mitmes leht) – default 1
    const pageNumberRaw = Number(page);
    const pageNumber =
      Number.isFinite(pageNumberRaw) && pageNumberRaw > 0 ? pageNumberRaw : 1;

    const books = await prisma.book.findMany({
      orderBy: {
        [sortBy]: sortDirection
      },
      skip: takeNumber * (pageNumber - 1),
      take: takeNumber
    });

    response.json({
      message: 'All books',
      data: books,
      meta: {
        sort: sortBy,
        sort_direction: sortDirection,
        take: takeNumber,
        page: pageNumber
      }
    });
  } catch (exception) {
    console.log(exception);
    response.status(500).json({
      message: 'Something went wrong',
      error: exception.message
    });
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
      return response.status(404).json({
        message: 'Book Not Found'
      });
    }

    response.status(200).json({
      message: 'Successfully Found Book',
      data: book
    });
  } catch (exception) {
    response.status(500).json({
      message: 'Something went wrong',
      error: exception.message
    });
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
        release_year: Number(release_year)
      }
    });

    response.status(201).json({
      message: 'Successfully Created Book',
      data: newBook
    });
  } catch (exception) {
    response.status(500).json({
      message: 'Something went wrong',
      error: exception.message
    });
  }
};

export const updateBook = async (request, response) => {
  try {
    const { id } = request.params;
    const { title, description, thumbnail_url, release_year } = request.body;

    // Prisma `update` viskab errori, kui rida ei leita,
    // nii et eraldi if (!updatedBook) pole tegelikult vajalik.
    const updatedBook = await prisma.book.update({
      where: {
        id: Number(id)
      },
      data: {
        title,
        description,
        thumbnail_url,
        release_year: Number(release_year)
      }
    });

    response.status(200).json({
      message: 'Successfully Updated Book',
      data: updatedBook
    });
  } catch (exception) {
    // Kui id ei eksisteeri, tuleb siia Prisma error
    response.status(500).json({
      message: 'Something went wrong',
      error: exception.message
    });
  }
};

export const deleteBook = async (request, response) => {
  try {
    const bookId = request.params?.id;

    await prisma.book.delete({
      where: {
        id: Number(bookId)
      }
    });

    response.status(200).json({
      message: 'Successfully Deleted Book'
    });
  } catch (exception) {
    response.status(500).json({
      message: 'Something went wrong',
      error: exception.message
    });
  }
};
