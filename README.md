![image](https://github.com/Kate-Chu/parking_genie/blob/main/src/assets/demo-10ftp.gif)

## 介紹

使用 React 打造的台北市停車場搜尋小精靈，<br>
為您找到距離最近的停車場，<br>
讓您開車出門不再煩惱找不到停車位，<br>
停車的大小事，都交給我們。：）

## Demo

> https://kate-chu.github.io/parking_genie/

## 本地安裝流程

1. 請確認電腦已經安裝 Node.js 與 npm
2. 打開終端機，輸入以下指令將此專案 clone 到本地

```
git clone https://github.com/Kate-Chu/parking_genie.git
```

3. 前往 [Google 地圖平台](https://developers.google.com/maps) 取得 Geocoding api，並打開 .env 檔案填寫在 `REACT_APP_GEOCODING_API=` 之後。

```
REACT_APP_GEOCODING_API=[your geocoding api]
```

4. 終端機移動至專案資料夾，輸入指令安裝套件

```
cd 專案資料夾
npm install
```

5. 建立完畢後，請繼續輸入以下內容，開始運行後端伺服器

```
npm start
```

6. 若是跑出以下內容，代表程式已經運行成功了，可以在瀏覽器輸入顯示網址體驗網站。

```
You can now view parking-genie in the browser.

  Local:            http://localhost:3000/parking_genie
  On Your Network:  http://10.249.152.107:3000/parking_genie
```

7. 結束運行請在終端機頁面按下 command + c (Mac) 或 ctrl + c (Windows) 即可終止程式。

## 主要開發工具

- typescript
- react
- reduxjs/toolkit
- react-router
- react-hook-form
- leaflet
- react-leaflet
- proj4
- proj4leaflet
- sass
- tailwindcss
- eslint
- prettier
