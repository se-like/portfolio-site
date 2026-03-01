const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Excelファイルを読み込む
const workbook = XLSX.readFile(path.join(__dirname, 'public', '経歴書.xlsx'));

// すべてのシート名を取得
const sheetNames = workbook.SheetNames;
console.log('シート名:', sheetNames);

// 各シートの内容を取得して出力
const result = {};
sheetNames.forEach(sheetName => {
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet);
  result[sheetName] = jsonData;
  console.log(`\n===== ${sheetName} =====`);
  console.log(JSON.stringify(jsonData, null, 2));
});

// 結果をJSONファイルに保存（public 外。フロントからは参照しない）
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
fs.writeFileSync(path.join(dataDir, 'resume-data.json'), JSON.stringify(result, null, 2));
console.log('\n結果を data/resume-data.json に保存しました。');
