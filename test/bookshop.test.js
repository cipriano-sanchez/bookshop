
const cds = require('@sap/cds')

describe('Bookshop: OData Protocol Level Testing', () => {
  jest.setTimeout(20*1000)
  const app = require('express')()
  const request = require('supertest')(app)

  beforeAll(async () => {
    await cds.deploy(__dirname + '/../srv/cat-service').to('sqlite::memory:')
    await cds.serve('CatalogService').from(__dirname + '/../srv/cat-service').in(app)
  })

  it('Service $metadata document', async () => {
    const response = await request
      .get('/browse/$metadata')
      .expect('Content-Type', /^application\/xml/)
      .expect(200)

    const books = [
      { title: 'Wuthering Heights', author: 'Emily Bronte' },
      { title: 'Jane Eyre', author: 'Charlotte Bronte' },
      { title: 'The Raven', author: 'Edgar Allen Poe' },
      { title: 'Eleonora', author: 'Edgar Allen Poe' },
      { title: 'Catweazle', author: 'Richard Carpenter' }
    ]

    const expectedVersion = '<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">'
    const expectedBooksEntitySet = '<EntitySet Name="Books" EntityType="CatalogService.Books">'
    expect(response.text.includes(expectedVersion)).toBeTruthy()
    expect(response.text.includes(expectedBooksEntitySet)).toBeTruthy()
  })


  it('Get with select, expand and localized', async () => {
    const response = await request
      .get('/browse/Books?$select=title,author')
      .expect('Content-Type', /^application\/json/)
      .expect(200)

      // define an array of expected books
      const books = [
        { title: 'Wuthering Heights', author: 'Emily Bronte' },
        { title: 'Jane Eyre', author: 'Charlotte Bronte' },
        { title: 'The Raven', author: 'Edgar Allen Poe' },
        { title: 'Eleonora', author: 'Edgar Allen Poe' },
        { title: 'Catweazle', author: 'Richard Carpenter' }
      ]
      
      // check if the response contains the expected books
      expect(response.body.value).toMatchObject(books)


  })
})

