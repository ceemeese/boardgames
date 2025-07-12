//const expect = require('chai').expect;
const { getBoardgames, getBoardgame, postBoardgame, putBoardgame, deleteBoardgame, randomImageName } = require('../../controller/boardgames');
const { findBoardgames, findBoardgame, registerBoardgame, modifyBoardgame, removeBoardgame } = require('../../service/boardgames');
const { validationResult } = require('express-validator');
const { s3 } = require('../../utils/s3');

jest.mock('../../service/boardgames');
jest.mock('express-validator');
jest.mock('../../utils/s3', () => ({
    s3: {
        send: jest.fn().mockResolvedValue({}), // evita subir a AWS
    }
}));

describe('boardgames controller', () => {

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


    it('getBoardgames debería devolver listado con código 200', async () => {
        const boardgamesFake = [{ id: 1, name: 'Catan' }, { id: 2, name: 'Carcassone' }];
        findBoardgames.mockResolvedValue(boardgamesFake);

        await getBoardgames(req, res);

        expect(findBoardgames).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(boardgamesFake);
    });



    it('getBoardgame debería devolver un elemento con código 200', async () => {
        const boardgameFake = { id: 1, name: 'Catan' };
        findBoardgame.mockResolvedValue(boardgameFake);

        req.params = { id: 1 };

        await getBoardgame(req, res);

        expect(findBoardgame).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(boardgameFake);
    });


    it('postBoardgame debería devolver elemento completo con código 201', async () => {
        const fakeId = 1;

        const req = {
            body: {
                name: 'Catan',
                description: 'Juego de estrategia',
                minPlayers: 1,
                maxPlayers: 4,
                category: 'Estrategia',
            },
            file: {
                buffer: Buffer.from('fake-image-data'),
                mimetype: 'image/jpeg',
                name: expect.any(String)
            }
        };

        validationResult.mockReturnValue({ isEmpty: () => true });

        registerBoardgame.mockResolvedValue(fakeId);

        await postBoardgame(req, res);

        expect(validationResult).toHaveBeenCalledWith(req);
        expect(registerBoardgame).toHaveBeenCalledWith(
            'Catan',
            'Juego de estrategia',
            1,
            4,
            'Estrategia',
            expect.any(String) // nombre de la imagen aleatoria
        );
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            id: fakeId, 
            name: req.body.name, 
            description: req.body.description, 
            minPlayers: req.body.minPlayers, 
            maxPlayers: req.body.maxPlayers, 
            category: req.body.category,
            nameImage: expect.any(String), // nombre de la imagen
        });
    });



    it('putBoardgame debería devolver respuesta vacía con código 204', async () => {
        req.params = {id : 1}
        req.body = {
            name: 'Catan actu',
            description: 'Juego de estrategia',
            minPlayers: 1,
            maxPlayers: 4,
            category: 'Estrategia'
        };

        validationResult.mockReturnValue({ isEmpty: () => true });
        modifyBoardgame.mockResolvedValue();

        await putBoardgame(req, res);

        expect(validationResult).toHaveBeenCalledWith(req);
        expect(modifyBoardgame).toHaveBeenCalledWith(
            1,
            'Catan actu',
            'Juego de estrategia',
            1,
            4,
            'Estrategia'
        );
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalledWith({});
    });


        it('deleteBoardgame debería devolver respuesta vacía con código 204', async () => {
        req.params = {id : 1}

        validationResult.mockReturnValue({ isEmpty: () => true });
        removeBoardgame.mockResolvedValue();

        await deleteBoardgame(req, res);

        expect(validationResult).toHaveBeenCalledWith(req);
        expect(removeBoardgame).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalledWith({});
    });


})