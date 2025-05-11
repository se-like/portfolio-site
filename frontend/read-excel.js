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

// 結果をJSONファイルに保存
fs.writeFileSync(path.join(__dirname, 'public', 'resume-data.json'), JSON.stringify(result, null, 2));
console.log('\n結果をresume-data.jsonに保存しました。');
