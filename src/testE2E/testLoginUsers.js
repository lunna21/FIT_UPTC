const { Builder, By, until } = require('selenium-webdriver');

async function login(driver, username, password) {
    try {
        await driver.get('http://localhost:3000');
        console.log(`Iniciando sesión para usuario: ${username}`);

        await driver.wait(until.elementLocated(By.id('username')), 5000);
        await driver.findElement(By.id('username')).sendKeys(username);
        await driver.findElement(By.id('password')).sendKeys(password);
        await driver.findElement(By.css('button[type="submit"]')).click();

        const currentUrl = await driver.getCurrentUrl();
        console.log(`Redirigiendo a: ${currentUrl}`);


        if (currentUrl.includes('employees')) {
            console.log('Empleado: Redirigiendo a /employees/dashboard');
        } else if (currentUrl.includes('admin')) {
            console.log('Administrador: Redirigiendo a /admin/dashboard');
        } else if (currentUrl.includes('pending')) {
            console.log('Usuario pendiente: Redirigiendo a /pending');
        }

        console.log(`✅ TEST PASSED : Inicio de sesión exitoso para usuario: ${username}`);
    } catch (error) {
        console.error(`❌ TEST FAILED: Error en el inicio de sesión para usuario: ${username}`, error);
    }
}

async function logoutAndRedirect(driver) {
    try {

        await driver.manage().deleteAllCookies();


        await driver.executeScript('localStorage.clear(); sessionStorage.clear();');


        await driver.get('http://localhost:3000');

        console.log("Sesión cerrada, redirigiendo a la página principal.");
    } catch (error) {
        console.error("Error en el cierre de sesión y redirección", error);
    }
}

(async function loginTest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await login(driver, 'admin_user_test', 'admin_user_test');
        await logoutAndRedirect(driver);

        await login(driver, 'empl_testE2E', 'empl_testE2E');
        await logoutAndRedirect(driver);

        await login(driver, 'laura_vela1', 'laura_vela1');
        await logoutAndRedirect(driver);

        console.log("Pruebas de inicio y cierre de sesión completadas para todos los usuarios.");
    } finally {
        await driver.quit();
    }
})();
