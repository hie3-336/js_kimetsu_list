const apiUrl = 'https://ihatov08.github.io';

// コンテンツメイン部分
const contentArea = document.getElementById("result");

// カテゴリー選択部分
const checkBtn = document.getElementById('checkBtn');
checkBtn.addEventListener('change', function () {
  main(checkBtn.category.value);
});

// APIを叩きコンテンツを表示するメイン関数 (初回表示はカテゴリーをallに設定)
async function main(category = 'all') {
  
  try {
    // 前回表示したコンテンツをリセット
    while(contentArea.firstChild){
      contentArea.removeChild(contentArea.firstChild);
    }

    // ロード画面表示処理
    const loadElement = document.createElement('div');
    contentArea.parentNode.classList.add('d-flex','justify-content-center');
    loadElement.classList.add('spinner-border');
    contentArea.appendChild(loadElement);

    // APIを叩く部分
    const charaInfo = await fetchCharaInfo(category);

    // ロード画面を消す
    contentArea.removeChild(loadElement);
    contentArea.parentNode.classList.remove('d-flex','justify-content-center');

    // 取得したオブジェクトをもとにキャラ一覧を描画
    for (const index in charaInfo) {
      console.log(charaInfo[index].category);
      console.log(charaInfo[index].image);
      console.log(charaInfo[index].name);

      const charaElement = document.createElement('div');
      const imgElement = document.createElement('img');
      const categoryElement = document.createElement('div');
      const nameElement = document.createElement('div');

      imgElement.src = apiUrl + charaInfo[index].image; // 画像パス
      imgElement.alt = charaInfo[index].name;
      imgElement.width = 200;
      imgElement.height = 200;

      categoryElement.innerText = charaInfo[index].category;
      nameElement.innerText = charaInfo[index].name;

      charaElement.appendChild(imgElement);
      charaElement.appendChild(categoryElement);
      charaElement.appendChild(nameElement);
      contentArea.appendChild(charaElement);

    }
  } catch (error) {
    console.error(`エラーが発生しました (${error})`);
  }
}

// APIを叩く処理
async function fetchCharaInfo(category) {
  const response = await fetch(apiUrl + `/kimetsu_api/api/${category}.json`);
  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
  return await response.json();
}

// 初回ロード時にメイン関数実行
main();