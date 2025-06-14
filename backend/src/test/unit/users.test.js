//const expect = require('chai').expect;
const { getUsers, getUser, postUser, putUser, deleteUser } = require('../../controller/users');
const { findUsers, findUser, registerUser, modifyUser, removeUser } = require('../../service/users');
const { validationResult } = require('express-validator');

jest.mock('../../service/users');
jest.mock('express-validator');

describe('users controller', () => {

    let req;
    let res;

    beforeEach( () => {
        req = {}
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        jest.clearAllMocks();
    })


    it('getUsers debería devolver listado con código 200', async () => {
        const usersFake = [{ id: 1, name: 'Cris' }, { id: 2, name: 'Alba' }];
        findUsers.mockResolvedValue(usersFake);

        await getUsers(req, res);

        expect(findUsers).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(usersFake);
    });


    it('getUser debería devolver un elemento con código 200', async () => {
        const userFake = { id: 1, name: 'Cris' };
        findUser.mockResolvedValue(userFake);

        req.params = { id: 1 };

        await getUser(req, res);

        expect(findUser).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(userFake);
    });


    it('postUser debería devolver respuesta vacía con código 201', async () => {
        
        req.body = {
            name: 'Cris',
            surname: 'Malmierca',
            email: 'test@mail.com',
            alias: 'cris',
            password: '1234'
        };
        validationResult.mockReturnValue({ isEmpty: () => true });
        registerUser.mockResolvedValue();

        await postUser(req, res);

        expect(validationResult).toHaveBeenCalledWith(req);
        expect(registerUser).toHaveBeenCalledWith(
            'Cris',
            'Malmierca',
            'test@mail.com',
            'cris',
            '1234'
        );
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({});
    });



    it('putUser debería devolver respuesta vacía con código 204', async () => {
        req.params = {id : 1}
        req.body = {
            name: 'Cris',
            surname: 'Malmierca',
            email: 'test@mail.com',
            alias: 'cris',
            password: '1234'
        };

        validationResult.mockReturnValue({ isEmpty: () => true });
        modifyUser.mockResolvedValue();

        await putUser(req, res);

        expect(validationResult).toHaveBeenCalledWith(req);
        expect(modifyUser).toHaveBeenCalledWith(
            1,
            'Cris',
            'Malmierca',
            'test@mail.com',
            'cris',
            '1234'
        );
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalledWith({});
    });


    it('deleteUser debería devolver respuesta vacía con código 204', async () => {
        req.params = {id : 1}

        validationResult.mockReturnValue({ isEmpty: () => true });
        removeUser.mockResolvedValue();

        await deleteUser(req, res);

        expect(validationResult).toHaveBeenCalledWith(req);
        expect(removeUser).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalledWith({});
    });

})