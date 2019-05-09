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
    
    suite('PUT /api/issues/{project} => text', () => {
      
      test('No body', (done) => {
        let obj = {};

        chai.request(server)
          .put('/api/issues/test')
          .send(obj)
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.deepEqual(res.body, {'error': 'no updated field sent'});
            done();
          }); 
      });
      
      test('One field to update', (done) => {
        let obj = {
          _id: '5cd339bc2a73170a2ca605e5',
          'title': 'Sorry!'
        };

        chai.request(server)
          .put('/api/issues/test')
          .send(obj)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.sucess.title, obj.title);
            done();
          }); 
      });
      
      test('Multiple fields to update', (done) => {
        let obj = {
          _id: '5cd33a185f8d1c10fcc01017',
          title: 'Opa Dopa Upa!',
          open: false,
          text: 'More Lorem ipsum',
          created_by: 'Jesus Ordosgoitty',
          assigned_to: 'Lady Gaga'
        };

        chai.request(server)
          .put('/api/issues/test')
          .send(obj)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.sucess.title, obj.title);
            assert.equal(res.body.sucess.open, obj.open);
            assert.equal(res.body.sucess.text, obj.text);
            done();
          }); 
      });

      test('Unsuccessful update', (done) => {
        let obj = {
          _id: '1241kfajkngjkagnjkagn'
        };

        chai.request(server)
          .put('/api/issues/test')
          .send(obj)
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.deepEqual(res.body, {'error': `could not update ${obj._id}`});
            done();
          }); 
      })
      
    });
    
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
          .get('/api/issues/invalid')
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
            assert.deepEqual(res.body, {issuesnotfound: 'no issues found'});
            done();
          });
      });
    });
    
    suite('DELETE /api/issues/{project} => text', () => {
      
      test('No _id', (done) => {
        chai.request(server)
          .delete('/api/issues/test')
          .send({})
          .end((req, res) => {
            assert.equal(res.status, 400);
            assert.deepEqual(res.body, {error: '_id error'});
            done();
          });
      });
      
      test('Valid _id', (done) => {
        let obj = {
          _id: '5cd2f573a19fad1060d76115'
        };

        chai.request(server)
          .delete('/api/issues/test')
          .send(obj)
          .end((req, res) => {
            assert.equal(res.status, 200);
            assert.deepEqual(res.body, {success: `deleted ${obj._id}`});
            done();
          })
      });

      test('Invalid _id', (done) => {
        let obj = {
          _id: '189148418uajd'
        };

        chai.request(server)
          .delete('/api/issues/test')
          .send(obj)
          .end((req, res) => {
            assert.equal(res.status, 404);
            assert.deepEqual(res.body, {failed: `could not delete ${obj._id}`});
            done();
          });
      });
      
    });

});