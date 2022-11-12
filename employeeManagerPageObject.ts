// This is my Page Object for Homework 2.7.2. It includes a bunch of code from Homework 2.4 
// https://github.com/stephaniecp/qaHomeworkWiki/blob/main/2.4/2ndtake_homeworkTest.test.ts 

import {
    Builder,
    By,
    Capabilities,
    until,
    WebDriver,
    WebElement,
    Key,
} from "selenium-webdriver";

// const chromedriver = require("chromedriver"); // Is this stil necessary?
const noEmployeeSelectedYet: By = By.xpath('//p[@id="noEmployee"]')

export class EmployeePageObject {
    crazyDriver: WebDriver
    url: string = "https://devmountain-qa.github.io/employee-manager/1.2_Version/index.html"

    constructor(stephDriver: WebDriver) {
        // Setting the .................?
        this.crazyDriver = stephDriver
    }
    async navigate () {
        await this.crazyDriver.get(this.url);
        await this.crazyDriver.wait(until.elementLocated(noEmployeeSelectedYet))
    }
    async quitPage () {
        await this.crazyDriver.quit()
    }
    async getLastEmployeeName () {
        const byLastEmployeeAdded: By = By.xpath('//ul[@class="listContainer"]/li[last()-1]')
        const lastEmployeeLi = await this.crazyDriver.findElement(byLastEmployeeAdded)
        const employeeNameDisplayLi = await lastEmployeeLi.getText()
        return employeeNameDisplayLi
    }
}