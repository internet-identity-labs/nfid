import { test, expect } from "@playwright/test"
import { basicRequest, withConsentMessage } from "../src/data/icrc49_call_canister"
import {
  verifySectionVisibility,
  verifyRequestSection,
  verifyResponseSection,
  submitRequest,
  getPermissions,
  selectRequestTemplate,
} from "./utils"

const origin = "http://localhost:3001"

test.describe("icrc49", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(origin)
  })

  test("Call canister without icrc21_consent_message", async ({ page }) => {
    await test.step("icrc25_request_permissions", async () => {
      return await getPermissions(page)
    })

    await test.step("icrc49_call_canister", async () => {
      const sectionId = "icrc49_call_canister"

      await verifySectionVisibility(page, sectionId)
      await verifyRequestSection(page, sectionId, basicRequest)
      await verifyResponseSection(page, sectionId, "{}")

      await submitRequest(page, sectionId, true)
      // TODO: Uncomment when method is implemented
      // await page.waitForTimeout(250)
      // await approveWithDefaultSigner(page)

      const responseSection = page.locator(`#${sectionId} #response-section-e2e`)
      // TODO: Verify response when method is implemented
      expect(responseSection).toContainText(`"message": "Not supported"`)
    })
  })

  test("Call canister with icrc21_consent_message", async ({ page }) => {
    await test.step("icrc25_request_permissions", async () => {
      return await getPermissions(page)
    })

    await test.step("icrc49_call_canister", async () => {
      const sectionId = "icrc49_call_canister"

      await verifySectionVisibility(page, sectionId)
      await selectRequestTemplate(page, sectionId, 2)
      await verifyRequestSection(page, sectionId, withConsentMessage)
      await verifyResponseSection(page, sectionId, "{}")

      await submitRequest(page, sectionId, true)
      // TODO: Uncomment when method is implemented
      // await page.waitForTimeout(250)
      // await approveWithDefaultSigner(page)

      const responseSection = page.locator(`#${sectionId} #response-section-e2e`)
      // TODO: Verify response when method is implemented
      expect(responseSection).toContainText(`"message": "Not supported"`)
    })
  })
})
