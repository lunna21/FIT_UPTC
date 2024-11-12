
const request = require('supertest');
const { app, users } = require('./userDuplicated');

describe('POST /register - Usuario duplicado', () => {
    beforeEach(() => {
        users.length = 0;
    });

    it('debería registrar un usuario nuevo exitosamente', async () => {
        const response = await request(app)
            .post('/register')
            .send({
                documentNumber: "123456789",
                fullName: "Ana Pérez",
                phoneNumber: "3106789215",
                email: "ana.perez@gmail.com"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("message", "Usuario registrado exitosamente");
    });

    it('debería retornar error al intentar registrar un usuario con un documento ya existente', async () => {
        await request(app)
            .post('/register')
            .send({
                documentNumber: "123456789",
                fullName: "Ana Pérez",
                phoneNumber: "3106789215",
                email: "ana.perez@gmail.com"
            });

        
        const duplicateResponse = await request(app)
            .post('/register')
            .send({
                documentNumber: "123456789",
                fullName: "Ana Pérez",
                phoneNumber: "3106789215",
                email: "ana.perez@gmail.com"
            });

        expect(duplicateResponse.statusCode).toBe(400);
        expect(duplicateResponse.body).toHaveProperty("error", "Usuario ya registrado");
    });
});
