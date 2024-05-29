import { test, expect } from "@playwright/test"
import { basicRequest } from "../src/data/icrc34_get_delegation"
import {
  verifySectionVisibility,
  verifyRequestSection,
  verifyResponseSection,
  submitRequest,
  approveWithDefaultSigner,
  getPermissions,
} from "./utils"

const origin = "http://localhost:3001"

test.describe("icrc34", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(origin)
  })

  test("Get delegation with targets", async ({ page }) => {
    await test.step("icrc25_request_permissions", async () => {
      return await getPermissions(page)
    })

    await test.step("icrc34_get_delegation", async () => {
      const sectionId = "icrc34_get_delegation"

      await verifySectionVisibility(page, sectionId)
      await verifyRequestSection(page, sectionId, basicRequest)
      await verifyResponseSection(page, sectionId, "{}")

      await submitRequest(page, sectionId)

      const iframeElement = await page.$("#signer-iframe")
      const frame = await iframeElement!.contentFrame()
      await page.waitForTimeout(250)
      await frame!.click("#acc_0")
      await page.waitForTimeout(250)
      await approveWithDefaultSigner(page)
      await page.waitForTimeout(5000)

      const responseSection = page.locator(`#${sectionId} #response-section-e2e`)
      expect(responseSection).toContainText(`"origin": "${origin}"`)
      expect(responseSection).toContainText(`"delegations": [`)
      expect(responseSection).toContainText(`"delegation": `)
      expect(responseSection).toContainText(`"signature": `)
    })
  })

  test("Get delegation without targets", async ({ page }) => {
    await test.step("icrc25_request_permissions", async () => {
      return await getPermissions(page)
    })

    await test.step("icrc34_get_delegation", async () => {
      const sectionId = "icrc34_get_delegation"

      await verifySectionVisibility(page, sectionId)
      await verifyRequestSection(page, sectionId, basicRequest)
      // Make targets empty
      await page.evaluate(() => {
        const element = document.querySelector(
          `#icrc34_get_delegation #request-section > div > div.cm-scroller > div.cm-content > div:nth-child(6)`
        )
        if (element) element.textContent = ""
      })
      await verifyResponseSection(page, sectionId, "{}")

      await submitRequest(page, sectionId)

      const iframeElement = await page.$("#signer-iframe")
      const frame = await iframeElement!.contentFrame()
      await page.waitForTimeout(250)
      await frame!.click("#acc_0")
      await page.waitForTimeout(250)
      await approveWithDefaultSigner(page)
      await page.waitForTimeout(5000)

      const responseSection = page.locator(`#${sectionId} #response-section-e2e`)
      expect(responseSection).toContainText(`"origin": "${origin}"`)
      expect(responseSection).toContainText(`"delegations": [`)
      expect(responseSection).toContainText(`"delegation": `)
      expect(responseSection).toContainText(`"signature": `)
      expect(responseSection).toContainText(`"targets": []`)
    })
  })
})