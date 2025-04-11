require('dotenv').config(); // <--- uso del .env

const request = require('supertest');
const app = require('../src/app');
const nock = require('nock');
const { expect } = require('chai');

describe('GET /files/data - simulated failure from external API', function () {
    beforeEach(() => {
        nock(process.env.API_URL)
            .get('/files')
            .reply(500, { message: 'simulated server error' });
    });

    afterEach(() => {
        nock.cleanAll();
    });

    it('should return 500 when external API fails', async () => {
        const res = await request(app).get('/files/data');
        expect(res.status).to.equal(500);
        expect(res.body).to.have.property('error');
    });
});
