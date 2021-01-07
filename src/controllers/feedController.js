const questionsRepo = require('../repos/questionsRepo');

// const questionsFeed = [
//     {
//         id: 123, 
//         created_at: '2020-12-28', 
//         updated_at: '2020-12-30', 
//         user_id: 6345, 
//         title: 'Qué pensáis del Gobierno en España?', 
//         body: 'El Gobierno en España lo está haciendo bien o mal? Qué argumentos me dais?'
//     }
// ];

exports.getQuestions = async (req, res, next) => {
    const questionsFeed = await questionsRepo.getQuestions();
    res.status(200).json(questionsFeed);
};



exports.postQuestion = async (req, res, next) => {
    const newQuestion = {
        user_id: req.body.user_id,
        title: req.body.title,
        body: req.body.body,
        url: req.body.url
    };
    await questionsRepo.postQuestion(newQuestion);
    res.status(201).json({message: 'question posted successfully'});
};