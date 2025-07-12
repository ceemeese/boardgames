const {findBoardgames, findBoardgame, registerBoardgame, modifyBoardgame, removeBoardgame} = require('../service/boardgames');
const { validationResult } = require('express-validator');
const { putObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const {s3, bucketName} = require('../utils/s3');
const crypto = require('crypto');

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

const getBoardgames = (async (req, res) => {
    const boardgamesList = await findBoardgames();
    res.status(200).json(boardgamesList);
})

const getBoardgame = (async (req, res) => {
    try {
        const boardgame = await findBoardgame(req.params.id);

        if(boardgame === undefined) {
            res.status(404).json({
                status: 'No encontrado',
                message: 'Boardgame no encontrado'
            })
            return;
        }
        res.status(200).json(boardgame);
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor'
        })
    }
    
})

const postBoardgame = (async (req, res) => {

    console.log('Entrando a postBoardgame');
    console.log('BODY:', req.body);
    console.log('FILE:', req.file);

    try {
        const errors = validationResult(req);
        console.log('Errores de validación:', errors);
        if(!errors.isEmpty()) {
            return res.status(400).json({
                status: 'Error',
                message: errors.array()
            })
        }

        console.log('Validación de errores completada');
        

        if(!req.file) {
            return res.status(400).json({
                status: 'Error',
                message: 'Falta la imagen del juego'
            })
        }

        const imageName = randomImageName();
        console.log(imageName + 'Nombre de imagen aleatorio');

        
        //Subida a S3
        const params = {
            Bucket: bucketName,
            Key: imageName,
            Body: req.file.buffer,
            ContentType: req.file.mimetype
        }

        console.log('Preparando subida a S3');
    
        const command = new PutObjectCommand(params);
        console.log(command.Body + ' Commando de subida a S3');
        

        await s3.send(command);
        console.log('Subida S3');
        

        const idResult = await registerBoardgame(
            req.body.name, 
            req.body.description, 
            req.body.minPlayers, 
            req.body.maxPlayers, 
            req.body.category,
            imageName
        );


        res.status(201).json({
            id: idResult,
            name: req.body.name, 
            description: req.body.description, 
            minPlayers: req.body.minPlayers, 
            maxPlayers: req.body.maxPlayers, 
            category: req.body.category,
            nameImage: imageName
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor'
        })
    }  
})

const putBoardgame = (async (req, res) => {

    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({
                status: 'Error',
                message: errors.array()
            })
        }

        await modifyBoardgame(
            req.params.id, 
            req.body.name, 
            req.body.description, 
            req.body.minPlayers, 
            req.body.maxPlayers, 
            req.body.category
        );

        res.status(204).json({});
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
})
    

const deleteBoardgame = (async (req, res) => {

    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({
                status: 'Error',
                message: errors.array()
            })
        }

        const result = await removeBoardgame(req.params.id);

        if(result === 0) {
            res.status(404).json({
                status: 'No encontrado',
                message: 'Boardgame no encontrado'
            })
            return;
        }

        res.status(204).json({});
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
})


module.exports = {
    getBoardgames, 
    getBoardgame,
    postBoardgame,
    putBoardgame,
    deleteBoardgame
}