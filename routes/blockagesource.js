/**
 * Created by mmajor on 5/5/16.
 */

var models  = require('../models'),
    express = require('express'),
    passport = require('passport');

var routes = function(){
    var router  = express.Router();
    router.get('/', function(req, res) {
            models.BlockageSource.findAll()
                .then(function(blockageSource) {
                        res.statusCode = 200;
                        res.send(
                            {
                                result: 'success',
                                err:    '',
                                json:  blockageSource,
                                length: blockageSource.length
                            }
                        );
                    }
                )
                .catch(function (err) {
                    console.error(err);
                    res.statusCode = 502;
                    res.send({
                        result: 'error',
                        err:    err.message
                    });
                });
        }
        )
        //find BlockageSource by ID
        .get('/:id', function(req, res) {
                models.BlockageSource.findAll(
                    {
                        where: {
                            BlockageSourceID: req.params.id
                        }
                    }
                ).then(function(blockageSource) {
                        res.statusCode = 200;
                        res.send(
                            {
                                result: 'success',
                                err:    '',
                                json:  blockageSource,
                                length: blockageSource.length
                            }
                        );
                    }
                ).catch(function (err) {
                    console.error(err);
                    res.statusCode = 502;
                    res.send({
                        result: 'error',
                        err:    err.message
                    });
                });
            }
        )
        //insert into BlockageSource
        .post('/', passport.authenticate('jwt-auth-api', {session:false}), function(req, res) {
                models.BlockageSource.create(req.body)
                    .then(function(blockageSource) {
                            res.statusCode = 200;
                            res.send(
                                {
                                    result: 'success',
                                    err:    '',
                                    json:  blockageSource,
                                    length: blockageSource.length
                                }
                            );
                        }
                    ).catch(function (err) {
                    console.error(err);
                    res.statusCode = 502;
                    res.send({
                        result: 'error',
                        err:    err.message
                    });
                });
            }
        )
        //update into BlockageSource
        .put('/:id', passport.authenticate('jwt-auth-api', {session:false}), function(req, res) {
                models.BlockageSource.update(
                    req.body,
                    {
                        where: {
                            BlockageSourceID: req.params.id
                        }
                    }
                    )
                    .then(function(rowsUpdated) {
                            res.statusCode = 200;
                            res.send(
                                {
                                    result: 'success',
                                    err:    '',
                                    json:  {rows: rowsUpdated},
                                    length: rowsUpdated.length
                                }
                            );
                        }
                    ).catch(function (err) {
                    console.error(err);
                    res.statusCode = 502;
                    res.send({
                        result: 'error',
                        error:  err.message
                    });
                });
            }
        )
        .delete('/:id', passport.authenticate('jwt-auth-api', {session:false}), function(req, res) {
                models.BlockageSource.destroy(
                    {
                        where: {
                            BlockageSourceID: req.params.id
                        }
                    }
                    )
                    .then(function(numDelete) {
                            res.statusCode = 200;
                            res.send(
                                {
                                    result: 'success',
                                    err:    '',
                                    json:  {rows: numDelete}
                                }
                            );
                        }
                    ).catch(function (err) {
                    console.error(err);
                    res.statusCode = 502;
                    res.send({
                        result: 'error',
                        err:    err.message
                    });
                });
            }
        );

    return router;
}

module.exports = routes;