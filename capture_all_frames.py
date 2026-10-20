import asyncio
from playwright.async_api import async_playwright

async def capture_frames():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        # Using a standard clean desktop viewport
        page = await browser.new_page(viewport={"width": 1280, "height": 900})

        # -------------------------------------------------------------
        # FRAME 1: Service Selection (Step 1 of 4)
        # -------------------------------------------------------------
        print("Navigating to Frame 1 (Service Selection)...")
        await page.goto("http://localhost:3000", wait_until="networkidle")
        await page.wait_for_timeout(600)
        await page.screenshot(path="frame_1_service_selection.png", full_page=True)
        print("Saved frame_1_service_selection.png")

        # Select the 'Get a new Ohio medical card' option
        await page.locator("text=Get a new Ohio medical card").click()
        await page.wait_for_timeout(300)
        await page.screenshot(path="frame_1_service_selected.png", full_page=True)
        print("Saved frame_1_service_selected.png")

        # Advance to Frame 2
        await page.locator("button:has-text('Continue to Physician Selection')").click()
        await page.wait_for_timeout(500)

        # -------------------------------------------------------------
        # FRAME 2: Meet Your Physician (Step 2 of 4)
        # -------------------------------------------------------------
        print("Capturing Frame 2 (Meet Your Physician)...")
        await page.screenshot(path="frame_2_meet_physician.png", full_page=True)
        print("Saved frame_2_meet_physician.png")

        # Advance to Frame 3
        await page.locator("button:has-text('Choose Date & Time')").click()
        await page.wait_for_timeout(500)

        # -------------------------------------------------------------
        # FRAME 3: Choose Date and Time (Step 3 of 4)
        # -------------------------------------------------------------
        print("Capturing Frame 3 (Choose Date and Time)...")
        # Select an afternoon slot, e.g. 2:30 PM
        slot_230 = page.locator("button:has-text('2:30 PM')")
        if await slot_230.count() > 0:
            await slot_230.first.click()
        await page.wait_for_timeout(300)
        await page.screenshot(path="frame_3_choose_datetime.png", full_page=True)
        print("Saved frame_3_choose_datetime.png")

        # Advance to Frame 4
        await page.locator("button:has-text('Proceed to Checkout')").click()
        await page.wait_for_timeout(500)

        # -------------------------------------------------------------
        # FRAME 4: Checkout (Step 4 of 4)
        # -------------------------------------------------------------
        print("Capturing Frame 4 (Checkout - Initial)...")
        await page.screenshot(path="frame_4_checkout.png", full_page=True)
        print("Saved frame_4_checkout.png")

        # Fill card details for demo
        await page.locator("button:has-text('Auto-Fill Test Card')").click()
        await page.wait_for_timeout(300)
        await page.screenshot(path="frame_4_checkout_filled.png", full_page=True)
        print("Saved frame_4_checkout_filled.png")

        # Submit payment and wait for navigation to Frame 5
        await page.locator("button:has-text('Pay $')").click()
        print("Submitted payment, navigating to confirmation...")
        await page.wait_for_url("**/confirmation*", timeout=10000)
        await page.wait_for_timeout(800)

        # -------------------------------------------------------------
        # FRAME 5: Payment Confirmed (/confirmation)
        # -------------------------------------------------------------
        print("Capturing Frame 5 (Payment Confirmed)...")
        await page.screenshot(path="frame_5_payment_confirmed.png", full_page=True)
        print("Saved frame_5_payment_confirmed.png")

        await browser.close()
        print("All frames captured successfully!")

if __name__ == "__main__":
    asyncio.run(capture_frames())
