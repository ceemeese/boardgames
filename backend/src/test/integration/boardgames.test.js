const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

const app = require('../../app');


chai.use(chaiHttp);
chai.should();

describe('boardgames', () => {

    describe('POST /boardgames', () => {
        it('Registrar nueva juego y código 201', (done) => {
            const boardgame = {
                name: `boardgameName_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
                description: 'boardgame description',
                minPlayers: 1,
                maxPlayers: 3,
                category: 'Rol'
            };

            chai.request(app)
                .post('/boardgames')
                .send(boardgame)
                .end((error, response) => {
                    response.should.have.status(201);
                    expect(response.body).to.have.property('id');
                    expect(response.body).to.have.property('name');
                    expect(response.body).to.have.property('description');
                    expect(response.body).to.have.property('minPlayers');
                    expect(response.body).to.have.property('maxPlayers');
                    expect(response.body).to.have.property('category');

                    const newId = response.body.id;

                    chai.request(app)
                        .delete(`/boardgames/${newId}`)
                        .end(() => done());
                });
        });

         it('Debe fallar la validación porque minPlayers debe ser superior a 0', (done) => {
            const boardgame = {
                name: 'boardgameName',
                description: 'boardgame description',
                minPlayers: 0,
                maxPlayers: 3,
                category: 'Rol'
            };

            chai.request(app)
                .post('/boardgames')
                .send(boardgame)
                .end((error, response) => {
                    console.error(response.body.message);
                    response.should.have.status(400);
                    expect(response.body.status).to.equal('Error');
                    
                    const errorMessages = response.body.message.map(err => err.msg);
                    expect(errorMessages).to.include('El número mínimo de jugadores debe ser superior a 0');
                    done();
                });
        });
    });




    describe('PUT /boardgames', () => {
        it('Modificar nuevo juego y código 204', (done) => {
            const boardgame = {
                name: `boardgameName_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
                description: 'boardgame description',
                minPlayers: 1,
                maxPlayers: 3,
                category: 'Rol'
            };

            const id = 38;
            chai.request(app)
                .put(`/boardgames/${id}`)
                .send(boardgame)
                .end((error, response) => {
                    response.should.have.status(204);
                    done();
                });
        });

         it('Debe fallar la validación porque maxPlayers debe ser superior a 0', (done) => {
            const boardgame = {
                name: 'boardgameNamePut',
                description: 'boardgame description',
                minPlayers: 1,
                maxPlayers: 0,
                category: 'Rol'
            };

            const id = 38;
            chai.request(app)
                .put(`/boardgames/${id}`)
                .send(boardgame)
                .end((error, response) => {
                    response.should.have.status(400);
                    expect(response.body.status).to.equal('Error');
                    
                    const errorMessages = response.body.message.map(err => err.msg);
                    expect(errorMessages).to.include('El número máximo de jugadores debe ser superior a 0');
                    done();
                });
        });
    });



    describe('DELETE /boardgames', () => {
        it('Crear y eliminar juego y código 204', (done) => {
            const boardgame = {
                name: 'TemporalGame',
                description: 'Para prueba de borrado',
                minPlayers: 2,
                maxPlayers: 4,
                category: 'Estrategia'
            };
            
            chai.request(app)
            .post('/boardgames')
            .send(boardgame)
            .end((err, res) => {
                const newId = res.body.id;

                
                chai.request(app)
                    .delete(`/boardgames/${newId}`)
                    .end((error, response) => {
                        response.should.have.status(204);
                        done();
                    });
            });
        });

        it('Debe devolver 404 si el juego no existe', (done) => {
            const fakeInexistentId = 999;

            chai.request(app)
                .delete(`/boardgames/${fakeInexistentId}`)
                .end((error, response) => {
                    response.should.have.status(404);
                    expect(response.body.message).to.equal('Boardgame no encontrado');
                    done();
                });
        });
    });


});