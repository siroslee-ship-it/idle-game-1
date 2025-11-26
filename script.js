// --- 遊戲數據狀態 ---
let resource = 0;
let clickPower = 1;

let upgradeClickCost = 10;
let autoProducerCost = 50;
let productionRate = 0; // 每秒自動產出

// --- DOM 元素引用 ---
const resourceCountEl = document.getElementById('resourceCount');
const rpsCountEl = document.getElementById('rpsCount');
const clickButton = document.getElementById('clickButton');

const upgradeClickButton = document.getElementById('upgradeClickButton');
const upgradeClickCostEl = document.getElementById('upgradeClickCost');

const autoProducerButton = document.getElementById('autoProducerButton');
const autoProducerCostEl = document.getElementById('autoProducerCost');

// --- 核心功能 ---

/**
 * 更新所有顯示的數字
 */
function updateDisplay() {
    resourceCountEl.textContent = Math.floor(resource);
    rpsCountEl.textContent = productionRate;

    // 更新按鈕上的點擊力提示
    clickButton.textContent = `點擊來挖掘資源 (+${clickPower})`;

    // 更新商店成本
    upgradeClickCostEl.textContent = upgradeClickCost;
    autoProducerCostEl.textContent = autoProducerCost;
}

/**
 * 玩家點擊按鈕
 */
function clickResource() {
    resource += clickPower;
    updateDisplay();
}

/**
 * 購買點擊力升級
 */
function buyClickUpgrade() {
    if (resource >= upgradeClickCost) {
        resource -= upgradeClickCost;
        clickPower++; // 每次點擊力增加 1
        upgradeClickCost = Math.round(upgradeClickCost * 1.5); // 成本增加 50%
        updateDisplay();
    } else {
        alert("資源不足！你需要 " + upgradeClickCost + " 資源。");
    }
}

/**
 * 購買自動生產器 (工人)
 */
function buyAutoProducer() {
    if (resource >= autoProducerCost) {
        resource -= autoProducerCost;
        productionRate++; // 每秒產出增加 1
        autoProducerCost = Math.round(autoProducerCost * 1.5); // 成本增加 50%
        updateDisplay();
    } else {
        alert("資源不足！你需要 " + autoProducerCost + " 資源。");
    }
}


// --- 遊戲主循環 (Game Loop) ---

/**
 * 處理自動生產，每秒執行一次
 */
setInterval(() => {
    if (productionRate > 0) {
        // resource  += productionRate;
        
        // 為了讓 RPS 即使是小數也能更平滑地增加，我們可以這樣處理：
        // 這裡直接用簡單的 productionRate 實現：
        resource += productionRate;
        updateDisplay();
    }
}, 1000); // 1000 毫秒 = 1 秒

// --- 事件監聽器 (Event Listeners) ---

clickButton.addEventListener('click', clickResource);
upgradeClickButton.addEventListener('click', buyClickUpgrade);
autoProducerButton.addEventListener('click', buyAutoProducer);

// 遊戲啟動時初始化顯示

updateDisplay();

// ... (保留原有的 resource, clickPower, productionRate 等變數和 updateDisplay 函數)

// --- 數據持久化功能 ---

function saveGame() {
    const gameData = {
        resource: resource,
        clickPower: clickPower,
        productionRate: productionRate
        // 任何需要保存的變量都要寫在這裡
    };
    // 將 JavaScript 物件轉換為 JSON 字符串並儲存
    localStorage.setItem('idleGameSave', JSON.stringify(gameData));
    console.log('遊戲已自動保存！');
}

function loadGame() {
    const savedData = localStorage.getItem('idleGameSave');
    if (savedData) {
        // 將 JSON 字符串轉換回 JavaScript 物件
        const gameData = JSON.parse(savedData);
        
        // 載入數據
        resource = gameData.resource || 0;
        clickPower = gameData.clickPower || 1;
        productionRate = gameData.productionRate || 0;
        
        console.log('遊戲進度已載入！');
        updateDisplay();
    }
}

// 覆寫遊戲主循環 (Game Loop) 以添加自動保存
setInterval(() => {
    if (productionRate > 0) {
        resource += productionRate;
    }
    updateDisplay();
    
    // 每 30 秒自動保存一次 (或您決定其他頻率)
    if (Math.floor(Date.now() / 1000) % 30 === 0) {
         saveGame();
    }
}, 1000); 

// 在遊戲啟動時載入進度
loadGame(); 
// 啟動時初始化顯示（即使載入失敗也能顯示初始值）
updateDisplay();
