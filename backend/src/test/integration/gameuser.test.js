const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

const app = require('../../app');


chai.use(chaiHttp);
chai.should();

describe('Game-User', () => {

    describe('POST /gamesUsers', () => {
        it('Registrar relación Partida-Usuario y código 201', (done) => {
            const gameId = 1;
            const gameUser = {
                userId: 1,
            };

            chai.request(app)
                .post(`/games-details/${gameId}/users`)
                .send(gameUser)
                .end((error, response) => {
                    response.should.have.status(201);
                    expect(response.body).to.have.property('id');

                    const newId = response.body.id;

                    chai.request(app)
                        .delete(`/games-details/${newId}/users`)
                        .end(() => done());
                });
        });

         it('Debe fallar la validación porque ID de jugador debe ser positivo', (done) => {
            const gameId = 23;
            const gameUser = {
                userId: 0
            };

            chai.request(app)
                .post(`/games-details/${gameId}/users`)
                .send(gameUser)
                .end((error, response) => {
                    console.error(response.body.message);
                    response.should.have.status(400);
                    expect(response.body.status).to.equal('Error');
                    
                    const errorMessages = response.body.message.map(err => err.msg);
                    expect(errorMessages).to.include('El ID de jugador debe ser positivo');
                    done();
                });
        });
    });


    describe('DELETE /gameUsers', () => {
        it('Crear y eliminar relacion partida-jugador y código 204', (done) => {
            const gameId = 1;
            const gameUser = {
                userId: 1
            };
            
            chai.request(app)
            .post(`/games-details/${gameId}/users`)
            .send(gameUser)
            .end((err, res) => {
                const newId = res.body.id;

                
                chai.request(app)
                    .delete(`/games-details/${gameId}/users`)
                    .end((error, response) => {
                        response.should.have.status(204);
                        done();
                    });
            });
        });

        it('Debe devolver 404 si el juego no existe', (done) => {
            const fakeInexistentId = 999;

            chai.request(app)
                .delete(`/games-details/${fakeInexistentId}/users`)
                .end((error, response) => {
                    response.should.have.status(404);
                    expect(response.body.message).to.equal('Relación partida-usuario no encontrada');
                    done();
                });
        });
    });


});