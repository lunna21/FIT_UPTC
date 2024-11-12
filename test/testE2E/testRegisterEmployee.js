const { Builder, By, until } = require('selenium-webdriver');

(async function registerAdminEmployee() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('http://localhost:3000'); 

        
        await driver.wait(until.elementLocated(By.id('username')), 5000);
        await driver.findElement(By.id('username')).sendKeys('admin_user_test');
        await driver.findElement(By.id('password')).sendKeys('admin_user_test');
        await driver.findElement(By.css('button[type="submit"]')).click();

        
        await driver.wait(until.elementLocated(By.css('a[href="/admin/create-user"]')), 5000);
        const createUserButton = await driver.findElement(By.css('a[href="/admin/create-user"]'));
        await createUserButton.click();

        
        await driver.wait(until.elementLocated(By.id('typeDocument')), 5000);
        await driver.findElement(By.id('typeDocument')).sendKeys('Cédula de Ciudadanía');
        await driver.findElement(By.name('numberDocument')).sendKeys('0123456789');
        
        
        await driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'Siguiente')]")), 5000);
        await driver.findElement(By.xpath("//button[contains(text(), 'Siguiente')]")).click();

        
        await driver.wait(until.elementLocated(By.id('firstName')), 5000);
        await driver.findElement(By.id('firstName')).sendKeys('Carlos');
        await driver.findElement(By.id('lastName')).sendKeys('Lopez Test');
        await driver.findElement(By.id('email')).sendKeys('carlos.lopez00@gmail.com');
        await driver.findElement(By.id('phone')).sendKeys('3123456789');
        await driver.findElement(By.css('button[type="submit"]')).click();

        
        console.log("✅ TEST PASSED: Empleado creado exitosamente"); 

    } catch (error) {
        console.error(`❌ TEST FAILED: Error en el proceso: ${error}`);
    } finally {
        await driver.quit();
    }
})();
