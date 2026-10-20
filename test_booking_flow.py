import asyncio
from playwright.async_api import async_playwright

async def run_e2e():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1200, "height": 850})
        
        # 1. Screen 1: Initial Question
        print("Navigating to http://localhost:3000...")
        await page.goto("http://localhost:3000", wait_until="networkidle")
        await page.wait_for_timeout(500)
        
        # Advance from screen 1 to screen 2
        await page.locator("text=Continue to Physician Selection").click()
        print("Advanced to Step 2...")
        await page.wait_for_timeout(500)

        # 2. Screen 2: Meet Physician
        await page.screenshot(path="screen2_physician.png")
        print("Captured screen 2!")
        await page.locator("button:has-text('Choose Date')").click()
        await page.wait_for_timeout(500)

        # 3. Screen 3: Date & Time
        await page.screenshot(path="screen3_datetime.png")
        print("Captured screen 3!")
        
        # Select 3:15 PM slot
        slot_btn = page.locator("button:has-text('3:15 PM')")
        if await slot_btn.count() > 0:
            await slot_btn.first.click()
        await page.wait_for_timeout(300)
        
        # Click Proceed to Checkout
        await page.locator("button:has-text('Proceed to Checkout')").click()
        await page.wait_for_timeout(500)

        # 4. Screen 4: Checkout
        await page.screenshot(path="screen4_checkout_initial.png")
        print("Captured screen 4 initial!")
        
        # Click auto-fill demo button
        await page.locator("button:has-text('Auto-Fill Test Card')").click()
        await page.wait_for_timeout(300)
        await page.screenshot(path="screen4_checkout_filled.png")
        print("Captured screen 4 filled!")

        # Click Pay and Confirm
        await page.locator("button:has-text('Pay $')").click()
        print("Submitted payment, awaiting navigation...")
        
        # Wait for URL to contain /confirmation
        await page.wait_for_url("**/confirmation*", timeout=10000)
        await page.wait_for_timeout(1000)
        print("Navigated to confirmation! Current URL:", page.url)

        # 5. Screen 5: Confirmation
        await page.screenshot(path="screen5_confirmed.png")
        print("Captured screen 5 confirmation!")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run_e2e())
