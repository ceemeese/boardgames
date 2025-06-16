const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

const app = require('../../app');


chai.use(chaiHttp);
chai.should();


describe('users', () => {

    describe('POST /users', () => {
        it('Registrar nuevo usuario y código 201', (done) => {
            const user = {
                name: `userName_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
                surname: 'Integration',
                email: 'test@mail.com',
                alias: 'Test',
                password: '1234',
            };

            chai.request(app)
                .post('/users')
                .send(user)
                .end((error, response) => {
                    response.should.have.status(201);
                    expect(response.body).to.have.property('id');
                    expect(response.body).to.have.property('name');
                    expect(response.body).to.have.property('surname');
                    expect(response.body).to.have.property('email');
                    expect(response.body).to.have.property('alias');
                    expect(response.body).to.have.property('password');

                    const newId = response.body.id;

                    chai.request(app)
                        .delete(`/users/${newId}`)
                        .end(() => done());
                });
        });

         it('Debe fallar la validación porque el mail es obligatorio', (done) => {
            const user = {
                name: 'UserNameTest',
                surname: 'Test User',
                email: '',
                alias: 'userTest',
                password: '1234'
            };

            chai.request(app)
                .post('/users')
                .send(user)
                .end((error, response) => {
                    console.error(response.body.message);
                    response.should.have.status(400);
                    expect(response.body.status).to.equal('Error');
                    
                    const errorMessages = response.body.message.map(err => err.msg);
                    expect(errorMessages).to.include('El correo es obligatorio');
                    done();
                });
        });
    });




    describe('PUT /users', () => {
        it('Modificar usuario y código 204', (done) => {
            const user = {
                name: `userName_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
                surname: 'Test',
                email: 'tes224@svalero.com',
                alias: 'ceemeTest224',
                password: '1234'
            };

            const id = 9;
            chai.request(app)
                .put(`/users/${id}`)
                .send(user)
                .end((error, response) => {
                    response.should.have.status(204);
                    done();
                });
        });

         it('Debe fallar la validación porque contraseña es obligatoria', (done) => {
            const user = {
                name: 'CrisTestPut',
                surname: 'Test',
                email: 'tes224@svalero.com',
                alias: 'ceemeTest224',
                password: ''
            };

            const id = 9;
            chai.request(app)
                .put(`/users/${id}`)
                .send(user)
                .end((error, response) => {
                    response.should.have.status(400);
                    expect(response.body.status).to.equal('Error');
                    
                    const errorMessages = response.body.message.map(err => err.msg);
                    expect(errorMessages).to.include('La contraseña es obligatoria');
                    done();
                });
        });
    });



    describe('DELETE /users', () => {
        it('Crear y eliminar usuario y código 204', (done) => {
            const user = {
                name: 'TestDelete',
                surname: 'Test',
                email: 'testDelete@svalero.com',
                alias: 'TestDelete',
                password: '1234'
            };
            
            chai.request(app)
            .post('/users')
            .send(user)
            .end((err, res) => {
                const newId = res.body.id;

                
                chai.request(app)
                    .delete(`/users/${newId}`)
                    .end((error, response) => {
                        response.should.have.status(204);
                        done();
                    });
            });
        });

        it('Debe devolver 404 si el usuario no existe', (done) => {
            const fakeInexistentId = 999;

            chai.request(app)
                .delete(`/users/${fakeInexistentId}`)
                .end((error, response) => {
                    response.should.have.status(404);
                    expect(response.body.message).to.equal('Usuario no encontrado');
                    done();
                });
        });
    });


});