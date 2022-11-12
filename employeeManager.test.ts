
// class to export = SpecPage
import { EmployeePageObject } from "./employeeManagerPageObject";
const chromedriver = require("chromedriver");
import { WebDriver, Builder, Capabilities, By, until } from "selenium-webdriver";

const otherDriver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();

//Created the webDriver (type) that is being reffered to in the ...PageObject.ts as stephDriver/crazyDriver/bunnyDriver (all the same)  
const employeePageObject = new EmployeePageObject(otherDriver)

const byAddEmployeeCta: By = By. name("addEmployee")
//duplicated in PO
const byLastEmployeeAdded: By = By.xpath('//ul[@class="listContainer"]/li[last()-1]')
const byEmployeecount: By = By.xpath('//ul[@class="listContainer"]/li')
const byNameInputField: By = By.name("nameEntry")
const byPhoneInput: By = By.name("phoneEntry")
const byTitleInput: By = By.name("titleEntry")
const bySaveButton: By = By.id("saveBtn")
const editedNameValue = "Bobby McGee"

describe("Employee Manager 1.2", () => {

    beforeAll(async () => {
        await employeePageObject.navigate()
    });
    afterAll(async () => {
        await employeePageObject.quitPage()
    });

    test ("Create a new employee", async () => {
        await otherDriver.wait(until.elementLocated(byAddEmployeeCta))
        await otherDriver.findElement(byAddEmployeeCta).click()
        const employeeNameDisplayLi = await employeePageObject.getLastEmployeeName()
        expect(employeeNameDisplayLi).toBe("New Employee")
        console.log(`The last li is ${employeeNameDisplayLi}`)
        expect(employeeNameDisplayLi).not.toBe("Lois Brewer")
    })

    test ("Edit the new employee", async () => {
        await otherDriver.findElement(byLastEmployeeAdded).click()
        await otherDriver.wait(
            until.elementIsVisible(await otherDriver.findElement(byNameInputField))
        )
        const nameImputField =  await otherDriver.findElement(byNameInputField)
        nameImputField.clear()
        nameImputField.sendKeys(editedNameValue)
        await otherDriver.findElement(bySaveButton).click()
        expect(await employeePageObject.getLastEmployeeName()).toBe(editedNameValue)
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


