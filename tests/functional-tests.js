const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../app');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  
    suite('POST /api/issues/{project} => object with issue data', () => {
      
      test('Every field filled in', (done) => {

        let obj = {
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA'
        };

        chai.request(server)
          .post('/api/issues/test')
          .send(obj)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.title, obj.issue_title);
            assert.equal(res.body.text, obj.issue_text);
            assert.equal(res.body.created_by, obj.created_by);
            assert.equal(res.body.assigned_to, obj.assigned_to);
            assert.equal(res.body.status_text, obj.status_text);
            assert.isTrue(res.body.open);
            assert.exists(res.body.created_on);
            assert.exists(res.body.updated_on);
            assert.exists(res.body._id);
            done();
          })
      });
      
      test('Required fields filled in', (done) => {

        let obj = {
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Jesus'
        };

        chai.request(server)
          .post('/api/issues/test')
          .send(obj)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.title, obj.issue_title);
            assert.equal(res.body.text, obj.issue_text);
            assert.equal(res.body.created_by, obj.created_by);
            assert.equal(res.body.assigned_to, "");
            assert.equal(res.body.status_text, "");
            assert.isTrue(res.body.open);
            assert.exists(res.body.created_on);
            assert.exists(res.body.updated_on);
            assert.exists(res.body._id);
            done();
          });
      });
      
      test('Missing required fields', (done) => {
        chai.request(server)
          .post('/api/issues/test')
          .send({})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.deepEqual(res.body, {'error': 'Missing required fields'});
            done();
          });
      });
      
    });
    
    // suite('PUT /api/issues/{project} => text', () => {
      
    //   test('No body', (done) => {
        
    //   });
      
    //   test('One field to update', (done) => {
        
    //   });
      
    //   test('Multiple fields to update', (done) => {
        
    //   });
      
    // });
    
    suite('GET /api/issues/{project} => Array of objects with issue data', () => {
      
      test('No filter', (done) => {
        chai.request(server)
          .get('/api/issues/test')
          .query({})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.property(res.body[0], 'title');
            assert.property(res.body[0], 'text');
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
      
      test('One filter', (done) => {
        let query = {open: true};
        chai.request(server)
          .get('/api/issues/test')
          .query(query)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.propertyVal(res.body[0], 'open', true);
            assert.propertyVal(res.body[1], 'open', true);
            done();
          });
      });
      
      test('Multiple filters (test for multiple fields you know will be in the db for a return)', (done) => {
        let query = {
          assigned_to: '',
          created_by: 'Jesus'
        };
        chai.request(server)
          .get('/api/issues/test')
          .query(query)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.propertyVal(res.body[0], 'assigned_to', '');
            assert.propertyVal(res.body[0], 'created_by', 'Jesus');
            done();
          });
      });

      test('Project not found', (done) => {
        chai.request(server)
          .get('/api/issues/test')
          .end((err, res) => {
            assert.equal(res.status, 404);
            assert.deepEqual(res.body, {error: 'project not found'});
            done();
          });
      });

      test('No issues found for filter', (done) => {
        let query = {invalid: true};

        chai.request(server)
          .get('/api/issues/test')
          .query(query)
          .end((err, res) => {
            assert.equal(res.status, 404);
            assert.deepEqual(res.body, {issuesnotfound: true});
            done();
          });
      });
    });
    
    // suite('DELETE /api/issues/{project} => text', () => {
      
    //   test('No _id', (done) => {
        
    //   });
      
    //   test('Valid _id', (done) => {
        
    //   });
      
    // });

});