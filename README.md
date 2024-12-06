

# Pokémon X Digimon 圖鑑

這是一個以 **React** 搭配 **Vite** 開發的專案，展示 Pokémon 與 Digimon 的資訊，並提供分頁與分類的功能，讓使用者能快速瀏覽內容。  
Demo：[Pokémon X Digimon 圖鑑](https://pokedex-mu-woad.vercel.app)

## 🎯 專案特色

- **首頁清單展示**：顯示 Pokémon 和 Digimon 的完整列表，並提供按鈕切換分類瀏覽。
- **分類清單頁面**：點擊分類可進入專屬頁面，分別檢視 Pokémon 或 Digimon 的詳細資訊。
- **分頁功能**：優化使用者體驗，分批顯示資料。
- **API 資料抽離**：將 API 請求與邏輯獨立處理，確保程式碼可維護性與結構清晰。

## 🚀 技術

- **框架**：Vite + React
- **樣式**：Tailwind CSS 
- **狀態管理**：useState
- **API 整合**：以原生 `fetch` 實作 API 請求


## 📜 功能規格

### 1. 首頁 (Home Page)
- 展示 Pokémon 和 Digimon 的所有資料。
- 提供分類按鈕進入 Pokémon 或 Digimon 清單。

### 2. 清單頁面 (Pokémon / Digimon)
- 根據分類顯示資料。
- 每頁顯示 20 筆資料，支援分頁切換。

### 3. 詳細資訊頁面 (Detail Page)
- 點擊清單中的項目可查看詳細資訊，如名稱、屬性、圖片等。

## ⚙️ 安裝與啟動

1. **clone專案到本地**
   ```bash
   git clone git@github.com:sammi0715/Pokedex.git
   cd pokemon
   ```

2. **安裝依賴**
   ```bash
   npm install
   ```

3. **啟動開發伺服器**
   ```bash
   npm run dev
   ```

4. **瀏覽網站**
   打開瀏覽器訪問 [http://localhost:5173](http://localhost:5173)

## 📡 API 整合

- **Pokémon 資料來源**：[PokéAPI](https://pokeapi.co/)
- **Digimon 資料來源**：[Digimon API](https://digi-api.com)

