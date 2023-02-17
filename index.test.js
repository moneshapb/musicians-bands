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
            name: 'jamie foxx',
            instrument: 'piano',
          
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


// part 3

describe("Band and Song Models Association", () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
      // the 'sync' method will create tables based on the model class
      // by setting 'force:true' the tables are recreated each time the
      // test suite is run
      await sequelize.sync({ force: true });
    });
  
    test("can create a Song", async () => {
        // TODO - test creating a song
        const song = await Song.create({
        title: "one great mystery",
        year: 2014,
      });
      expect(typeof Song).toBe("function");
      expect(song).toHaveProperty("title", "one great mystery");
      expect(song).toHaveProperty("year", 2014);
    });
  
    test("If a Band can have many Songs and if a Song can have many Bands", async () => {
      // create Bands and Songs
      //Populate the DB with a a band and some musicians
      let band1 = await Band.create({
        name: "Lady Antebellum",
        genre: "Country",
        showCount: 4,
      });
      let band2 = await Band.create({
        name: "Rascal Flatts",
        genre: "Country",
        showCount: 4,
      });
      let song1 = await Song.create({
        title: "one great mystery",
        year: 2014,
      });
      let song2 = await Song.create({
        title: "broken road",
        year: 2004,
      });
      // create some associations - put songs in band
      await band1.addSongs([song1, song2]);
      await band2.addSongs([song1, song2]);
      // create some associations - put band in songs
      await song1.addBands([band1, band2]);
      await song2.addBands([band1, band2]);
  
      // test the association
      const band1Songs = await band1.getSongs();
      expect(band1Songs.length).toBe(2);
      expect(band1Songs[0] instanceof Song).toBeTruthy;
      expect(band1Songs[0]).toHaveProperty("title", "one great mystery");
  
      const band2Songs = await band2.getSongs();
      expect(band2Songs.length).toBe(2);
      expect(band2Songs[0] instanceof Song).toBeTruthy;
      expect(band2Songs[1]).toHaveProperty("year", 2014);
  
      const song1Bands = await song1.getBands();
      expect(song1Bands.length).toBe(2);
      expect(song1Bands[0] instanceof Band).toBeTruthy;
      expect(song1Bands[0]).toHaveProperty("name", "Lady Antebellum");
  
      const song2Bands = await song2.getBands();
      expect(song2Bands.length).toBe(2);
      expect(song2Bands[0] instanceof Band).toBeTruthy;
      expect(song2Bands[1]).toHaveProperty("genre", "Country");
    });
  });