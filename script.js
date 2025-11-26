// --- 核心數據狀態 ---
let resource = 0;
let clickPower = 1;
// ... (保留所有變數)

let autoSaveCounter = 0; // 新增：用於追蹤自動保存時間的計數器

// 新增：手動保存按鈕的引用
const manualSaveButton = document.getElementById('manualSaveButton');


// --- 數據持久化功能 ---

/**
 * 保存遊戲數據到 localStorage
 * @param {boolean} isManual - 是否為手動保存
 */
function saveGame(isManual = false) {
    const gameData = {
        resource: resource,
        clickPower: clickPower,
        productionRate: productionRate,
        // ... (包含所有需要保存的數據)
    };
    localStorage.setItem('idleGameSave', JSON.stringify(gameData));
    
    if (isManual) {
        // 給予用戶反饋，讓他們知道保存成功了
        alert('✨ 遊戲進度已成功保存！');
    }
    console.log('遊戲已保存！');
}


// --- 新增：手動保存處理函數 ---

function handleManualSave() {
    // 呼叫 saveGame 並傳入 true，表示這是手動保存
    saveGame(true);
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

