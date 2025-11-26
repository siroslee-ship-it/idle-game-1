// --- 核心數據狀態 ---
let resource = 0;
let clickPower = 1;
// ❗ 必須定義的變數 ❗
let upgradeClickCost = 10; 
let autoProducerCost = 50; 
let productionRate = 0; // ❗ 確保這個變數有定義 ❗

let autoSaveCounter = 0; // 新增：用於追蹤自動保存時間的計數器


// --- DOM 元素引用 (確保這裡有所有元素的引用) ---
const resourceCountEl = document.getElementById('resourceCount');
const rpsCountEl = document.getElementById('rpsCount');
const clickButton = document.getElementById('clickButton');

// ... (省略的其他按鈕引用，如 upgradeClickButton, autoProducerButton) ...

const manualSaveButton = document.getElementById('manualSaveButton'); // 手動保存按鈕


// --- 核心功能函數 (必須包含) ---

/**
 * ❗ 必須定義的函數：更新所有顯示的數字 ❗
 */
function updateDisplay() {
    // 檢查元素是否存在以避免錯誤
    if (resourceCountEl) resourceCountEl.textContent = Math.floor(resource);
    if (rpsCountEl) rpsCountEl.textContent = productionRate;
    // ... (更新其他商店元素的顯示)
}

/**
 * ❗ 必須定義的函數：載入遊戲進度 ❗
 */
function loadGame() {
    const savedData = localStorage.getItem('idleGameSave');
    if (savedData) {
        const gameData = JSON.parse(savedData);
        
        resource = gameData.resource || 0;
        clickPower = gameData.clickPower || 1;
        productionRate = gameData.productionRate || 0;
        
        // ... (載入其他數據)
        
        console.log('遊戲進度已載入！');
        updateDisplay();
    }
}


// --- 數據持久化功能 (您提供的片段) ---

function saveGame(isManual = false) {
// ... (您的 saveGame 程式碼) ...
}

function handleManualSave() {
// ... (您的 handleManualSave 程式碼) ...
}


// --- 遊戲主循環 (您提供的片段) ---
setInterval(() => {
// ... (您的 setInterval 程式碼) ...
}, 1000);


// --- 關鍵步驟：離開前保存 (您提供的片段) ---
window.addEventListener('beforeunload', () => {
    saveGame();
});


// --- 事件監聽器 (❗ 必須有，但您省略了 ❗) ---
// 這裡必須有所有按鈕的監聽器，例如：
// clickButton.addEventListener('click', clickResource); // 如果 clickResource 函數也存在
// ❗ 確保這裡有以下監聽器 ❗
manualSaveButton.addEventListener('click', handleManualSave); 


// --- 啟動時載入 (您提供的片段) ---
loadGame(); 
updateDisplay();
