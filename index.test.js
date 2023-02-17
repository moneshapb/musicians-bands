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
8
    test('can create a Band', async () => {
        // TODO - test creating a band
         const band = await Band.create({
            name: 'Lady Antebellum',
            genre: 'Country',
            showCount: 4,
        });
        expect(band.name).toBe('Lady Antebellum');
        expect(band.genre).toBe('Country');
        expect(band.showCount).toBe(4);
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


    test('can update a Band', async () => {

    await Band.update({
        showCount: 5,
    }, {    
        where: {    
            name: 'Lady Antebellum',
        }
    });
    const band = await Band.findOne({
        where: {
            name: 'Lady Antebellum',

        }   
    }); 
    expect(band.showCount).toBe(5);

    })

    test('can update a Musician', async () => {

        await Musician.update({
            instrument: 'Piano',
        }, {    
            where: {    
                name: 'Stevie Wonder',
            }
        });
        const musician = await Musician.findOne({
            where: {
                name: 'Stevie Wonder',
    
            }   
        }); 
        expect(musician.instrument).toBe('Piano');
    
        })

    test('can delete a Band', async () => {


        await Band.destroy({
            where: {
                name: 'Lady Antebellum',
            }
        });
        const band = await Band.findOne({
            where: {
                name: 'Lady Antebellum',
            }
        });
        expect(band).toBeNull();
    }
    )

    test('can delete a Musician', async () => {


        await Musician.destroy({
            where: {
                name: 'Stevie Wonder',
            }
        });
        const musician = await Musician.findOne({
            where: {
                name: 'Stevie Wonder',
            }
        });
        expect(musician).toBeNull();
    })

})


//part 2 

describe("Band and Musician Models Association", () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
      // the 'sync' method will create tables based on the model class
      // by setting 'force:true' the tables are recreated each time the
      // test suite is run
      await sequelize.sync({ force: true });
    });
  
    test("If a Band can have many Musicians", async () => {
      // create Musicians and bands
      //Populate the DB with a a band and some musicians
      let band1 = await Band.create({

        name: 'Lady Antebellum',
        genre: 'Country',
        showCount: 4,
      });
        let musician1 = await Musician.create({
            name: 'Stevie Wonder',
            instrument: 'Saxophone',
          
        });
        let musician2 = await Musician.create({
            name: 'Stevie Wonder',
            instrument: 'Saxophone',
          
        });
        await band1.addMusician(musician1);
        await band1.addMusician(musician2);

        // test association

        const band1Musicians = await band1.getMusicians();
        expect(band1Musicians.length).toBe(2);
        expect(band1Musicians[0] instanceof Musician).toBe(true);
        expect(band1Musicians[0].name).toBe('Stevie Wonder');
        expect(band1Musicians[0].instrument).toBe('Saxophone');

    });
});