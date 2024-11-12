const { Builder, By, until } = require('selenium-webdriver');
const path = require('path');

(async function registerStudentE2ETest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        console.log("Iniciando prueba de registro de estudiante...");


        await driver.get('http://localhost:3000');
        console.log("Página principal cargada");
        await driver.sleep(1000);


        await driver.wait(until.elementLocated(By.css('.login-container')), 5000);
        await driver.sleep(1000);
        const registerButton = await driver.findElement(By.css('a[href="/register"]'));
        await registerButton.click();
        console.log("Botón de registro seleccionado");
        await driver.sleep(1000);

  
        await driver.wait(until.elementLocated(By.css('.register-formR')), 5000);
        console.log("Formulario de registro cargado");
        await driver.sleep(1000);

   
        await driver.findElement(By.id('typeDocument')).sendKeys('Cédula de Ciudadanía');
        console.log("Tipo de documento ingresado");
        await driver.sleep(1000);

        await driver.findElement(By.name('numberDocument')).sendKeys('123456789');
        console.log("Número de documento ingresado");
        await driver.sleep(1000);

        await driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'Siguiente')]")), 5000);
        await driver.sleep(1000);
        await driver.findElement(By.xpath("//button[contains(text(), 'Siguiente')]")).click();
        console.log("Botón 'Siguiente' seleccionado");
        await driver.sleep(1000);

        await driver.wait(until.elementLocated(By.id('firstName')), 5000);
        console.log("Pantalla de datos personales cargada");
        await driver.sleep(1000);

        await driver.findElement(By.id('firstName')).sendKeys('Ana');
        console.log("Nombre ingresado");
        await driver.sleep(1000);

        await driver.findElement(By.id('lastName')).sendKeys('Pérez TEST EToE');
        console.log("Apellido ingresado");
        await driver.sleep(1000);

        await driver.findElement(By.id('studentCode')).sendKeys('2023123456');
        console.log("Código de estudiante ingresado");
        await driver.sleep(1000);

        await driver.findElement(By.id('phoneNumber')).sendKeys('1234567890');
        console.log("Número de teléfono ingresado");
        await driver.sleep(1000);

        await driver.findElement(By.id('email')).sendKeys('anaperez.01@gmail.com');
        console.log("Email ingresado");
        await driver.sleep(1000);

        await driver.findElement(By.id('birthDate')).sendKeys('01/01/2000');
        console.log("Fecha de nacimiento ingresada");
        await driver.sleep(1000);

        await driver.findElement(By.id('eps')).sendKeys('EPS Ejemplo');
        console.log("EPS ingresada");
        await driver.sleep(1000);

        await driver.findElement(By.name('bloodType')).sendKeys('O+');
        console.log("Tipo de sangre ingresado");
        await driver.sleep(1000);

        await driver.findElement(By.name('programType')).sendKeys('Pregrado');
        console.log("Tipo de programa ingresado");
        await driver.sleep(1000);

        await driver.findElement(By.id('emergencyfullName')).sendKeys('Ana');
        console.log("Nombre de contacto de emergencia ingresado");
        await driver.sleep(1000);

        await driver.findElement(By.id('contactNumber')).sendKeys('3106789215');
        console.log("Número de contacto de emergencia ingresado");
        await driver.sleep(1000);

        await driver.findElement(By.name('relationship')).sendKeys('Madre');
        console.log("Relación de emergencia ingresada");
        await driver.sleep(1000);

        let fileInput = await driver.findElement(By.id('informedConsent'));
        await driver.sleep(1000);
        await fileInput.sendKeys(path.resolve(__dirname, '../Consentimiento.pdf'));
        console.log("Consentimiento informado adjuntado");
        await driver.sleep(1000);

        await driver.findElement(By.id('terms')).click();
        console.log("Términos aceptados");
        await driver.sleep(1000);

        const register2Button = await driver.findElement(By.css('button[type="submit"]'));
        await driver.wait(until.elementIsEnabled(register2Button), 10000);
        await driver.sleep(1000);
        await register2Button.click();
        console.log("Botón de registro final seleccionado");
        await driver.sleep(1000);

        console.log("✅ TEST PASSED: Prueba de registro de estudiante completada exitosamente.");

    } catch (error) {
        console.error("❌ TEST FAILED: Error en la prueba de registro de estudiante:", error);
    } finally {
        await driver.quit();
        
    }
})();
