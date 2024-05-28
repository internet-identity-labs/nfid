import { test, expect } from "@playwright/test"
import { basicRequest } from "../src/data/icrc25_request_permissions"
import { basicRequest as icrc25GrantedRequest } from "../src/data/icrc25_granted_permissions"
import {
  verifySectionVisibility,
  verifyRequestSection,
  verifyResponseSection,
  submitRequest,
  approveWithDefaultSigner,
  getPermissions,
} from "./utils"

const origin = "http://localhost:3001"

test.describe("icrc25", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(origin)
  })

  test("Request permissions", async ({ page }) => {
    const sectionId = "icrc25_request_permissions"
    const expectedResponse = JSON.stringify(
      { scopes: [{ method: "icrc27_get_accounts" }] },
      null,
      2
    )

    await verifySectionVisibility(page, sectionId)
    await verifyRequestSection(page, sectionId, basicRequest)
    await verifyResponseSection(page, sectionId, "{}")

    await submitRequest(page, sectionId)
    await approveWithDefaultSigner(page)

    const responseSection = page.locator(`#${sectionId} #response-section-e2e`)
    expect(responseSection).toContainText(`"origin": "${origin}"`)
    expect(responseSection).toContainText(expectedResponse)
  })

  test("Check granted permissions", async ({ page }) => {
    await test.step("icrc25_request_permissions", async () => {
      await getPermissions(page)
    })

    await test.step("icrc25_granted_permissions", async () => {
      const sectionId = "icrc25_granted_permissions"

      await verifySectionVisibility(page, sectionId)
      await verifyRequestSection(page, sectionId, icrc25GrantedRequest)
      await verifyResponseSection(page, sectionId, "{}")

      await submitRequest(page, sectionId)
      await page.waitForTimeout(1000)
      const responseSection = page.locator(`#${sectionId} #response-section-e2e`)
      expect(responseSection).toContainText(`"origin": "${origin}"`)
      expect(responseSection).toContainText(`"scopes": [`)
      expect(responseSection).toContainText(`"method": "icrc27_get_accounts"`)
    })
  })
})
