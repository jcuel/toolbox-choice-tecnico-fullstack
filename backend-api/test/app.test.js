require('dotenv').config(); // <--- carga las variables de entorno

const request = require('supertest');
const app = require('../src/app');
const { expect } = require('chai');

describe('GET /files/data', function () {
    this.timeout(10000);

    it('should return an array of file objects with valid structure', async () => {
        const res = await request(app).get('/files/data');

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');

        if (res.body.length > 0) {
            const file = res.body[0];
            expect(file).to.have.property('file');
            expect(file).to.have.property('lines').that.is.an('array');

            if (file.lines.length > 0) {
                const line = file.lines[0];
                expect(line).to.have.property('text').that.is.a('string');
                expect(line).to.have.property('number').that.is.a('number');
                expect(line).to.have.property('hex').that.is.a('string');
            }
        }
    });
});
