//const expect = require('chai').expect;
const { getGameUsers, postGameUsers, deleteGameUsers } = require('../../controller/gamesUsers');
const { findUsersNameByGame, registerUserByGame, removeUserByGame } = require('../../service/gamesUsers');
const { validationResult } = require('express-validator');

jest.mock('../../service/gamesUsers');
jest.mock('express-validator');

describe('games users controller', () => {

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


    it('getGamePlayers debería devolver listado de id/nombre jugadores de partida concreta con código 200', async () => {
        const usersFake = [{ id: 1, name: 'Cris' }, { id: 2, name: 'Alba' }];

        req.params = { gameId: 1 };

        findUsersNameByGame.mockResolvedValue(usersFake);

        await getGameUsers(req, res);

        expect(findUsersNameByGame).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(usersFake);
    });



    it('postGameUsers debería devolver {id} con código 201', async () => {
        
        const fakeId = {id : 15}

        req.params = { gameId: 1 };
        req.body = {
            userId: 1
        };

        validationResult.mockReturnValue({ isEmpty: () => true });
        registerUserByGame.mockResolvedValue(fakeId);

        await postGameUsers(req, res);

        expect(validationResult).toHaveBeenCalledWith(req);
        expect(registerUserByGame).toHaveBeenCalledWith(
            1,
            1
        );
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(fakeId);
    });



    it('deleteGameUsers debería devolver respuesta vacía con código 204', async () => {
        req.params = {gameId : 1}

        validationResult.mockReturnValue({ isEmpty: () => true });
        removeUserByGame.mockResolvedValue();

        await deleteGameUsers(req, res);

        expect(validationResult).toHaveBeenCalledWith(req);
        expect(removeUserByGame).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalledWith({});
    });

})