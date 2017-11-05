const db = ('../models');

module.exports = {
    findAll: (req, res) => {
       db.Article
       //get saved articles
         .find(req.query)
         .sort({ date: -1 })
         .then(dbModel => res.json(dbModel))
         .catch(err => res.status(422).json(err));

    },
    saveArticle: (req, res) => {
        //save article
        db.Article
          .create(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
    },
    findById: (req, res) => {
        db.Article
          .findById(req.params.id)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    remove: (req, res) => {
        //delete article
        db.Article
          .findById({ _id: req.params.id })
          .then(dbModel => dbModel.remove())
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
    }
};