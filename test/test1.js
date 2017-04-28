let mongoose = require("mongoose");
let Puzzle = require('../app/models/puzzle');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Main page', () => {

  describe('Hello page', () => {
      it('it should GET the main page', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
              done();
            });
      });
      it('it should GET the parameters page', (done) => {
        chai.request(server)
            .post('/')
            .end((err, res) => {
                res.should.have.status(200);
              done();
            });
      });   
      var game_page;
      it('it should GET the game page', (done) => {
        chai.request(server)
            .post('/')
            .end((err, res) => {
                res.should.have.status(200);
                game_page = res.body;
              done();
            });
      });       
      /* 
      it('it should GET the same game page', (done) => {
        chai.request(server)
            .post('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.eql(game_page);
              done();
            });
      });    
      */
  });

});