const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Incident', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new Incident', async () => {
        const response = await request(app)
            .post('/incidents')
            .set('authorization', '2eba864d')
            .send({
                title: "Novo caso 10",
                description: "Just checking",
                value: "555"
            });

            expect(response.body).toHaveProperty('id');
            expect(response.body.id).toBeGreaterThanOrEqual(0);
    });
});