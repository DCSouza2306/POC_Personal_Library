# POC_Personal_Library

This is an API created to manage a small personal bookstore, where initially there are only functionalities for including, reading, editing and deleting books.

## How to Run

1. Clone this repository
2. Install all dependencies
```bash
npm i
```
3. Create a PostgreSQL database with whatever name you want
4. Configure the database in src/database/database whith your configs and the database name that you created
5. To run in development use 

``` bash
npm run dev
```

## Functionalities
In this backend we have the following routes, with their expected returns and parameters:

1. GET ("/books") -> This route return an array of objects in the following format:
```
[
  {
    "title": "Guerra dos Tronos",
    "author": "George R.R Martin",
    "publishcompany": "Leya",
    "year": 2008,
    "edition": 1
  },
  {
    "title": "Tormenta de Espadas",
    "author": "George R.R Martin",
    "publishcompany": "Leya",
    "year": 2008,
    "edition": 1
  },
  {
  "title":"Senhor dos Aneis: A Sociedade do Anel",
  "author": "J.R.R Tolkien",
  "publishCompany": "Companhia das Letras",
  "year": "2012",
  "edition": "3"
}
];
```
In this route, you can search a book name using queries, for example 

GET ("/books?name=Senhor dos"), the result is:
```
[
    {
    "title":"Senhor dos Aneis: A Sociedade do Anel",
    "author": "J.R.R Tolkien",
    "publishCompany": "Companhia das Letras",
    "year": "2012",
    "edition": "3"
    }
];

```
2. POST ("/books") -> This route insert a new book in the database receive an objecti with de following format:
```
{
  "title":"Senhor dos Aneis: A Sociedade do Anel",
  "author": "J.R.R Tolkien",
  "publishCompany": "Companhia das Letras",
  "year": "2012",
  "edition": "3"
}
```
3. PATCH ("/books/:id") -> This route updates an existing book in the database and receives the id by req.params and the element to be updated by body, using the same format as the POST ("/books");

4. DELETE ("/books/:id") -> This route delete an existing book in the database and receise the id by req.params;

5. GET ("/books/author/:id") -> This route returns an array of objects using the author's id to filter only the books written by him;

6. POST ("/books/author") -> This route insert a new author in database with the following format:
```
{
    "name": "Dan Brown"
};
```
7. POST ("/books/company") -> This route insert a new publishing company in database with the following format:
```
{
    "name": "Rocco"
}
```
