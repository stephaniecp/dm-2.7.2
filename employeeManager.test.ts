
// class to export = SpecPage
import { EmployeePageObject } from "./employeeManagerPageObject";
const chromedriver = require("chromedriver");
import { WebDriver, Builder, Capabilities, By, until } from "selenium-webdriver";

const bunnyDriver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();

//Created the webDriver (type) that is being reffered to in the ...PageObject.ts as stephDriver/crazyDriver/bunnyDriver (all the same)  
const employeePageObject = new EmployeePageObject(bunnyDriver)

const byAddEmployeeCta: By = By. name("addEmployee")
const byLastEmployeeAdded: By = By.xpath('//ul[@class="listContainer"]/li[last()-1]')

const byEmployeecount: By = By.xpath('//ul[@class="listContainer"]/li')

describe("Employee Manager 1.2", () => {

    beforeEach(async () => {
        await employeePageObject.navigate()
    });
    afterAll(async () => {
        // await employeePageObject.quitPage()
    });

    test ("Create a new employee", async () => {
        await bunnyDriver.wait(until.elementLocated(byAddEmployeeCta))
        await bunnyDriver.findElement(byAddEmployeeCta).click()
        const lastEmployeeLi = await bunnyDriver.findElement(byLastEmployeeAdded)
        // await becasue .getText returns a Promise (and needs an await)
        const employeeNameDisplayLi = await lastEmployeeLi.getText()
        expect(employeeNameDisplayLi).toBe("New Employee")
        console.log(`The last li is ${employeeNameDisplayLi}`)
        expect(employeeNameDisplayLi).not.toBe("Lois Brewer")
    })

    // // Reality check - PASSED
    // test("Hello World test", async () => {
    //     let employeeField = await bunnyDriver.findElement(By.name("addEmployee"));
    //     console.log("Add employyee CTA found")
    //     let buttonText = await employeeField.getText()
    //     console.log(`1.0 Field vlaue = ${buttonText}`)
    //     expect(buttonText).toBe("+ Add Employee")
    // })

}); // End of describe/"Employee Manager 1.2" test suite


