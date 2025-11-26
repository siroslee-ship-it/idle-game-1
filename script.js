// --- 核心數據狀態 ---
let resource = 0;
let clickPower = 1;
// ... (保留所有變數)

let autoSaveCounter = 0; // 新增：用於追蹤自動保存時間的計數器

// --- 數據持久化功能 ---

function saveGame() {
    const gameData = {
        resource: resource,
        clickPower: clickPower,
        productionRate: productionRate,
        // ... (包含所有需要保存的數據)
    };
    localStorage.setItem('idleGameSave', JSON.stringify(gameData));
    console.log('遊戲已保存！');
}

function loadGame() {
    const savedData = localStorage.getItem('idleGameSave');
    if (savedData) {
        const gameData = JSON.parse(savedData);
        
        // 載入數據時，記得處理數據不存在的狀況（用 || 設置預設值）
        resource = gameData.resource || 0;
        clickPower = gameData.clickPower || 1;
        productionRate = gameData.productionRate || 0;
        
        console.log('遊戲進度已載入！');
        updateDisplay();
    }
}


// --- 遊戲主循環 (Game Loop) ---
setInterval(() => {
    // 1. 自動產出資源
    if (productionRate > 0) {
        resource += productionRate;
    }
    
    // 2. 穩定的自動保存邏輯 (例如每 30 秒)
    autoSaveCounter++;
    if (autoSaveCounter >= 30) { 
        saveGame();
        autoSaveCounter = 0; // 計數器歸零
    }
    
    // 3. 更新顯示
    updateDisplay();

}, 1000); // 1 秒執行一次

// --- 關鍵步驟：離開前保存 ---

// 當使用者嘗試關閉分頁或重新整理時，這個事件就會觸發
window.addEventListener('beforeunload', () => {
    saveGame(); // 在瀏覽器卸載頁面前，強制保存一次！
});


// --- 啟動時載入 ---
loadGame(); 
updateDisplay();
