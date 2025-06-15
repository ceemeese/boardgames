//const expect = require('chai').expect;
const { getGamePlayers, getGames, getGame, getGameBasic, postGame, putGame, deleteGame } = require('../../controller/games');
const { findGamePlayers, findGames, findGame, findGameBasic, registerGame, modifyGame, removeGame } = require('../../service/games');
const { validationResult } = require('express-validator');

jest.mock('../../service/games');
jest.mock('express-validator');

describe('games controller', () => {

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


    it('getGamePlayers debería devolver listado de id/jugadores de partida concreta con código 200', async () => {
        const usersFake = [{ id: 1, name: 'Cris' }, { id: 2, name: 'Alba' }];

        req.params = { id: 1 };

        findGamePlayers.mockResolvedValue(usersFake);

        await getGamePlayers(req, res);

        expect(findGamePlayers).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(usersFake);
    });


    it('getGames debería devolver listado con código 200', async () => {
        const gamesFake = [{
            id: 1,
            name: 'Partida1',
            boardgameId: 10,
            boardgameName: 'Catan',
            numPlayers: '4'
            }, 
            {
            id: 1,
            name: 'Partida2',
            boardgameId: 13,
            boardgameName: 'Carcassone',
            numPlayers: '2'
            }, 
        ];
        findGames.mockResolvedValue(gamesFake);

        await getGames(req, res);

        expect(findGames).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(gamesFake);
    });


    it('getGame debería devolver un elemento con código 200 con todos datos incluidos tabla gameusers', async () => {
        const gameFake = {
            id: 1,
            name: 'Partida1',
            boardgameId: 10,
            boardgameName: 'Catan',
            numPlayers: '4'
        };
        findGame.mockResolvedValue(gameFake);

        req.params = { id: 1 };

        await getGame(req, res);

        expect(findGame).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(gameFake);
    });


    it('getGameBasic debería devolver un elemento con código 200', async () => {
        const gameFake = { 
            id: 1, 
            name: 'Partida1', 
            boardgameId: 1 
        };

        validationResult.mockReturnValue({ isEmpty: () => true });
        findGameBasic.mockResolvedValue(gameFake);

        req.params = { id: 1 };

        await getGameBasic(req, res);

        expect(findGameBasic).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(gameFake);
    });



    it('postGame debería devolver id con código 201', async () => {
        
        const fakeId = 15;

        req.body = {
            name: 'Partida3',
            boardgameId: 1
        };
        validationResult.mockReturnValue({ isEmpty: () => true });
        registerGame.mockResolvedValue(fakeId);

        await postGame(req, res);

        expect(validationResult).toHaveBeenCalledWith(req);
        expect(registerGame).toHaveBeenCalledWith(
            'Partida3',
            1
        );
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(fakeId);
    });



    it('putGames debería devolver respuesta vacía con código 204', async () => {
        req.params = {id : 1}
        req.body = {
            name: 'PartidaActu',
            boardgameId: 1
        };

        validationResult.mockReturnValue({ isEmpty: () => true });
        modifyGame.mockResolvedValue();

        await putGame(req, res);

        expect(validationResult).toHaveBeenCalledWith(req);
        expect(modifyGame).toHaveBeenCalledWith(
            1,
            'PartidaActu',
            1
        );
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalledWith({});
    });



    it('deleteGame debería devolver respuesta vacía con código 204', async () => {
        req.params = {id : 1}

        validationResult.mockReturnValue({ isEmpty: () => true });
        removeGame.mockResolvedValue();

        await deleteGame(req, res);

        expect(validationResult).toHaveBeenCalledWith(req);
        expect(removeGame).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalledWith({});
    });

})