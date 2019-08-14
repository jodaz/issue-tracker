/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp  = require('chai-http');
var chai      = require('chai');
var assert    = chai.assert;
var app       = require('../app');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  
    suite('POST /api/issues/{project} => object with issue data', () => {
      
      test('Every field filled in', done => {
       chai.request(app)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          
          //fill me in too!
          
          done();
        });
      });
      
      test('Required fields filled in', done => {
        
      }).end((req, res) => {
        done();
      })
      test('Missing required fields', done => {
        
      }).end((req, res) => {
        done();
      })
    });
    
    suite('PUT /api/issues/{project} => text', () => {
      
      test('No body', done => {
        
      }).end((req, res) => {
        done();
      })
      test('One field to update', done => {
        
      }).end((req, res) => {
        done();
      })
      test('Multiple fields to update', done => {
        
      }).end((req, res) => {
        done();
      })
    });
    
    suite('GET /api/issues/{project} => Array of objects with issue data', () => {
      
      test('No filter', done => {
        chai.request(app)
        .get('/api/issues/test')
        .query({})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });
      });
      
      test('One filter', done => {
        
      }).end((req, res) => {
        done();
      })
      test('Multiple filters (test for multiple fields you know will be in the db for a return)', done => {
        
      }).end((req, res) => {
        done();
      })
    });
    
    suite('DELETE /api/issues/{project} => text', () => {
      
      test('No _id', done => {
        
      }).end((req, res) => {
        done();
      })
      test('Valid _id', done => {
        
      }).end((req, res) => {
        done();
      })
    });

});