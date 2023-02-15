const {sequelize} = require('./db');
const {Band, Musician} = require('./index')

describe('Band and Musician Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create a Band', async () => {
        // TODO - test creating a band
         const band = await Band.create({
            name: 'Lady Antebellum',
            genre: 'Country',
        });
        expect(band.name).toBe('Lady Antebellum');
        expect(band.genre).toBe('Country');
    })
        
    test('can create a Musician', async () => {
        // TODO - test creating a musician
        const musician = await Musician.create({
            name: 'Stevie Wonder',
            instrument: 'Saxophone',
          
        });
        expect(musician.name).toBe('Stevie Wonder');
        expect(musician.instrument).toBe('Saxophone');
       // expect('NO TEST').toBe('EXPECTED VALUE HERE');
    })
})