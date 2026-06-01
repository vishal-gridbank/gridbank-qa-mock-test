Review each code snippet below. For each one:

1. **Identify** the type of test
2. **Explain** what it is testing and how it works
3. **Spot and describe any bugs or issues** in the code

---

## Snippet 1

```javascript
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Creator uploads a vertical UGC video
  await page.goto("https://app.gridbank.io/creator/upload");
  await page.fill("#title", "Summer Skateboarding NYC");
  await page.fill("#description", "Raw vertical footage, no edits");
  await page.setInputFiles("#video-upload", "./test-assets/sample_9x16.mp4");
  await page.selectOption("#category", "lifestyle");
  await page.fill("#price", "49");
  await page.click('button[type="submit"]');

  await page.waitForURL("**/creator/videos/**");
  const status = await page.textContent(".upload-status");
  console.log(status === "Published" ? "PASS" : "FAIL");
})();
```

---

## Snippet 2

```javascript
describe("Gridbank — Buyer Purchase Flow", () => {
  beforeEach(() => {
    cy.visit("/marketplace");
  });

  it("should allow a buyer to purchase a video license", () => {
    cy.get('[data-testid="video-card"]').first().click();
    cy.get('[data-testid="license-type"]').select("commercial");
    cy.get('[data-testid="buy-now-btn"]').click();

    cy.get("#card-number").type("4111111111111111");
    cy.get("#expiry").type("12/99");
    cy.get("#cvv").type("123");

    cy.url().should("include", "/purchase/confirmation");
    cy.contains("Your license is ready to download");
  });
});
```

---

## Snippet 3

```python
import requests

BASE_URL = "https://api.gridbank.io/v1"

def test_creator_upload_endpoint():
    payload = {
        "title": "Golden Hour Beach Walk",
        "format": "9x16",
        "category": "travel",
        "price_usd": 79,
        "creator_id": "usr_creator_001"
    }
    response = requests.post(f"{BASE_URL}/videos", json=payload)
    assert response.status_code == 200

def test_get_video_listing():
    response = requests.get(f"{BASE_URL}/videos/vid_99999")
    assert response.status_code == 200

def test_delete_video():
    response = requests.delete(f"{BASE_URL}/videos/vid_001")
    assert response.status_code == 200
```

---

## Snippet 4

```python
import pytest

def calculate_creator_payout(sale_price, tier):
    if tier == "pro":
        return sale_price * 0.80
    elif tier == "standard":
        return sale_price * 0.70
    return sale_price * 0.60

def test_pro_tier_payout():
    assert calculate_creator_payout(100, "pro") == 80

def test_standard_tier_payout():
    assert calculate_creator_payout(100, "standard") == 70

def test_default_tier_payout():
    assert calculate_creator_payout(100, "guest") == 60

def test_zero_price_payout():
    assert calculate_creator_payout(0, "pro") == 0

def test_negative_price_payout():
    result = calculate_creator_payout(-100, "pro")
    assert result == -80
```

---

## Snippet 5

```javascript
describe("Gridbank — Search & Discovery", () => {
  it("should return relevant vertical videos by keyword", () => {
    cy.request("GET", "/api/v1/search?q=skateboard&format=9x16").then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.results).to.have.length.greaterThan(0);

      res.body.results.forEach((video) => {
        expect(video.title).to.be.a("string");
      });
    });
  });

  it("should return empty results for nonsense query", () => {
    cy.request("GET", "/api/v1/search?q=xkqzwpv99").then((res) => {
      expect(res.status).to.eq(200);
    });
  });
});
```

---

## Snippet 6

```python
import threading
import requests
import time

# Stress test: 500 concurrent buyers hitting the Gridbank video feed
URL = "https://app.gridbank.io/api/v1/marketplace/feed"
CONCURRENT_USERS = 500
errors = []

def browse_feed():
    try:
        r = requests.get(URL, params={"page": 1, "format": "9x16"}, timeout=5)
        if r.status_code != 200:
            errors.append(r.status_code)
    except Exception as e:
        errors.append(str(e))

threads = [threading.Thread(target=browse_feed) for _ in range(CONCURRENT_USERS)]

for t in threads:
    t.start()

print(f"Total errors: {len(errors)}")
```
