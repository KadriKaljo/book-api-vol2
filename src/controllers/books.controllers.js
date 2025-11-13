import { response } from 'express';
import prisma from '../config/prisma.config.js';


export const getAllBooks = async (request, response) => {
  try {
    const books = await prisma.book.findMany(); // muutuja lokaalne, mille sisse võtame prisma (ORM)kaudu raamatud ja kasutame find many
    response.json({                  
      message: 'All books',
      data: books
     }) 
  
  } catch (exception) {       // kui on jama, andmebaasi v raamatu leidmisega, siis vastame erroriga
    console.log(exception);
    response.status(500).json({
      message: "Something went wrong",
      error: exception.message
    })
  }
};


export const getBookById = async (request, response) => { // tahame pärida 1 raamatut. 
  //https://raamatupood.ee/api/v1/books/555
 
   try {
      const idFromUrl = request.params?.id;            //? - kui param(555) on olemas, siis too. salvesatme kliendi id => IdFromUrl-i

      const book = await prisma.book.findUnique({     // saime id, tegime päringu, kontrollime kas saime vastuse,
        where: {
          id: Number(idFromUrl)
        }
      });

    response.status(200).json({                  // kui leiame raamatu, siis toome tagasi
      message: 'Successfully Found Book',
      data:book
  })  


   } catch (exception) {
    response.status(500).json({
      message: 'Something went wrong',
      error: exception.message
    })

   }
   


};

export const createBook = (request, response) => {};

export const updateBook = (request, response) => {};

export const deleteBook = (request, response) => {};

// service fail ehk äriloogika