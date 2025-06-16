const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

const app = require('../../app');


chai.use(chaiHttp);
chai.should();

describe('games', () => {

    describe('POST /games', () => {
        it('Registrar nueva partida y código 201', (done) => {
            const game = {
                name: `gameName_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
                boardgameId: 1,
            };

            chai.request(app)
                .post('/games')
                .send(game)
                .end((error, response) => {
                    response.should.have.status(201);
                    expect(response.body).to.have.property('id');

                    const newId = response.body.id;

                    chai.request(app)
                        .delete(`/games/${newId}`)
                        .end(() => done());
                });
        });

         it('Debe fallar la validación porque el nombre es obligatorio', (done) => {
            const game = {
                name: '',
                boardgameId: 1
            };

            chai.request(app)
                .post('/games')
                .send(game)
                .end((error, response) => {
                    console.error(response.body.message);
                    response.should.have.status(400);
                    expect(response.body.status).to.equal('Error');
                    
                    const errorMessages = response.body.message.map(err => err.msg);
                    expect(errorMessages).to.include('El nombre es obligatorio');
                    done();
                });
        });
    });




    describe('PUT /games', () => {
        it('Modificar partida y código 204', (done) => {
            const game = {
                name: `gameName_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
                boardgameId: 1
            };

            const id = 20;
            chai.request(app)
                .put(`/games/${id}`)
                .send(game)
                .end((error, response) => {
                    response.should.have.status(204);
                    done();
                });
        });

         it('Debe fallar la validación porque debe haber un juego seleccionado', (done) => {
            const game = {
                name: 'gameNamePut',
                boardgameId: null
            };

            const id = 38;
            chai.request(app)
                .put(`/games/${id}`)
                .send(game)
                .end((error, response) => {
                    response.should.have.status(400);
                    expect(response.body.status).to.equal('Error');
                    
                    const errorMessages = response.body.message.map(err => err.msg);
                    expect(errorMessages).to.include('El juego es obligatorio');
                    done();
                });
        });
    });



    describe('DELETE /games', () => {
        it('Crear y eliminar partida y código 204', (done) => {
            const game = {
                name: 'TemporalGame',
                boardgameId: 1
            };
            
            chai.request(app)
            .post('/games')
            .send(game)
            .end((err, res) => {
                const newId = res.body.id;

                
                chai.request(app)
                    .delete(`/games/${newId}`)
                    .end((error, response) => {
                        response.should.have.status(204);
                        done();
                    });
            });
        });

        it('Debe devolver 404 si la partida no existe', (done) => {
            const fakeInexistentId = 999;

            chai.request(app)
                .delete(`/games/${fakeInexistentId}`)
                .end((error, response) => {
                    response.should.have.status(404);
                    expect(response.body.message).to.equal('Game no encontrado');
                    done();
                });
        });
    });


});