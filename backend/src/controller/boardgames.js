const {findBoardgames, findBoardgame, registerBoardgame, modifyBoardgame, removeBoardgame} = require('../service/boardgames');
const { validationResult } = require('express-validator');
const { PutObjectCommand, GetObjectCommand, S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const {s3, bucketName} = require('../utils/s3');
const crypto = require('crypto');
const sharp = require('sharp');

const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');



const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

const getBoardgames = (async (req, res) => {
    const boardgamesList = await findBoardgames();

    for(const boardgame of boardgamesList) {
        const getObjectParams = {
            Bucket: bucketName,
            Key: boardgame.nameImage
        }

        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        boardgame.imageUrl = url;  //Se guarda en memoria en una propiedad nueva
    };

    
    res.status(200).json(boardgamesList);
})

const getBoardgame = (async (req, res) => {
    try {
        const boardgame = await findBoardgame(req.params.id);

        const getObjectParams = {
            Bucket: bucketName,
            Key: boardgame.nameImage
        }

        const command = new GetObjectCommand(getObjectParams);
        console.log('Preparando comando para obtener URL firmada');
        
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        boardgame.imageUrl = url; 
        console.log(boardgame.imageUrl + ' URL de imagen firmada');
         //Se guarda en memoria en una propiedad nueva

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


        //Procesamiento de imagen
        const buffer = await sharp(req.file.buffer)
            .resize({
                height: 1024, 
                width: 710,
                fit: "contain"
            })
            .toBuffer()
        console.log('Imagen procesada con sharp');


        //Subida a S3
        const params = {
            Bucket: bucketName,
            Key: imageName,
            Body: buffer,
            ContentType: req.file.mimetype
        }

        console.log('Preparando subida a S3');
        const command = new PutObjectCommand(params);
        

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

        const boardgame = await findBoardgame(req.params.id);
        if(!boardgame) {
            return res.status(404).json({
                status: 'No encontrado',
                message: 'Boardgame no encontrado'
            });
        }

        const deleteParams = {
            Bucket: bucketName,
            Key: boardgame.nameImage,
        };


        try {
            await s3.send(new DeleteObjectCommand(deleteParams))
            console.log('Imagen eliminada de S3');
        } catch (error) {
            console.error('Error al eliminar la imagen de S3:', error);
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