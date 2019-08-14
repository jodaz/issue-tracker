const chaiHttp  = require('chai-http');
const chai      = require('chai');
const assert    = chai.assert;
const app       = require('../app');

const { completeIssue, requiredFields, missingFields } = require('./samples');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  
    suite('POST /api/issues/{project} => object with issue data', () => {
      
      test('Every field filled in', done => {
        chai.request(app)
          .post('/api/issues/test')
          .send(completeIssue)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.exists(res.body._id);
            assert.equal(res.body.issue_title, completeIssue.issue_title);
            assert.equal(res.body.issue_text, completeIssue.issue_text);
            assert.equal(res.body.created_by, completeIssue.created_by);
            assert.equal(res.body.assigned_to, completeIssue.assigned_to);
            assert.equal(res.body.status_text, completeIssue.status_text);
            assert.exists(res.body.created_on);
            assert.exists(res.body.updated_on);
            assert.equal(res.body.open, true);
            done();
          });
      });
      
      test('Required fields filled in', done => {
        chai.request(app)
          .post('/api/issues/test_project')
          .send(requiredFields)
          .end((req, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.issue_title, requiredFields.issue_title);
            assert.equal(res.body.assigned_to, '');
            assert.equal(res.body.status_text, '');
            done();
          });
      });
      test('Missing required fields', done => {
        chai.request(app)
          .post('/api/issues/test')
          .send(missingFields)
          .end((req, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.body.issue_title, 'Missing issue title');
            assert.equal(res.body.issue_text, 'Missing issue description');
            assert.equal(res.body.created_by, 'Missing issue author');
            done();
          });
      });
    });
    
    // suite('PUT /api/issues/{project} => text', () => {
      
    //   test('No body', done => {
        
    //   }).end((req, res) => {
    //     done();
    //   })
    //   test('One field to update', done => {
        
    //   }).end((req, res) => {
    //     done();
    //   })
    //   test('Multiple fields to update', done => {
        
    //   }).end((req, res) => {
    //     done();
    //   })
    // });
    
    // suite('GET /api/issues/{project} => Array of objects with issue data', () => {
      
    //   test('No filter', done => {
    //     chai.request(app)
    //     .get('/api/issues/test')
    //     .query({})
    //     .end((err, res) => {
    //       assert.equal(res.status, 200);
    //       assert.isArray(res.body);
    //       assert.property(res.body[0], 'issue_title');
    //       assert.property(res.body[0], 'issue_text');
    //       assert.property(res.body[0], 'created_on');
    //       assert.property(res.body[0], 'updated_on');
    //       assert.property(res.body[0], 'created_by');
    //       assert.property(res.body[0], 'assigned_to');
    //       assert.property(res.body[0], 'open');
    //       assert.property(res.body[0], 'status_text');
    //       assert.property(res.body[0], '_id');
    //       done();
    //     });
    //   });
      
    //   test('One filter', done => {
        
    //   }).end((req, res) => {
    //     done();
    //   })
    //   test('Multiple filters (test for multiple fields you know will be in the db for a return)', done => {
        
    //   }).end((req, res) => {
    //     done();
    //   })
    // });
    
    // suite('DELETE /api/issues/{project} => text', () => {
      
    //   test('No _id', done => {
        
    //   }).end((req, res) => {
    //     done();
    //   })
    //   test('Valid _id', done => {
        
    //   }).end((req, res) => {
    //     done();
    //   })
    // });

});