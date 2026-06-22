import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page1 = await browser.newPage();
  
  page1.on('console', msg => console.log('PAGE 1 LOG:', msg.text()));
  page1.on('pageerror', error => console.log('PAGE 1 ERROR:', error.message));
  
  await page1.goto('http://localhost:5176/');
  await page1.waitForSelector('input[placeholder="Enter your name"]');
  await page1.type('input[placeholder="Enter your name"]', 'Tester1');
  await page1.click('button.play-btn');
  
  await new Promise(r => setTimeout(r, 1000));
  
  // Get invite link
  const inviteLink = await page1.evaluate(() => document.querySelector('a.invite-link')?.href);
  console.log("Invite link:", inviteLink);
  
  const page2 = await browser.newPage();
  page2.on('console', msg => console.log('PAGE 2 LOG:', msg.text()));
  page2.on('pageerror', error => console.log('PAGE 2 ERROR:', error.message));
  
  if (inviteLink) {
    await page2.goto(inviteLink);
    await page2.waitForSelector('input[placeholder="Enter your name"]');
    await page2.type('input[placeholder="Enter your name"]', 'Tester2');
    await page2.click('button.play-btn');
    await new Promise(r => setTimeout(r, 1000));
    
    // Now start the game from page1
    await page1.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Start Game'));
      if (btn) { btn.disabled = false; btn.click(); }
    });
    
    await new Promise(r => setTimeout(r, 3000));
  }
  
  await browser.close();
  
  await browser.close();
})();
