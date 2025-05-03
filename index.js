console.log("Hello World");

const contentArea = document.getElementById("result");

const CheckBtn = document.getElementById('CheckBtn');
CheckBtn.addEventListener('change', function () {
  main(CheckBtn.category.value);
});

async function main(category = 'all') {
  
  try {
    charaInfo = await fetchCharaInfo(category);
    console.log(charaInfo);
    while(contentArea.firstChild){
      contentArea.removeChild(contentArea.firstChild);
    }

    for (const index in charaInfo) {
      console.log(charaInfo[index].category);
      console.log(charaInfo[index].image);
      console.log(charaInfo[index].name);

      const charaElement = document.createElement('div');
      const imgElement = document.createElement('img');
      const categoryElement = document.createElement('div');
      const nameElement = document.createElement('div');

      imgElement.src = "https://ihatov08.github.io"+ charaInfo[index].image; // 画像パス
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

  
  // let img_element2 = document.createElement('img');
  // img_element2.src = 'Hakubisin.jpeg'; // 画像パス
  // img_element2.alt = 'ハクビシン'; // 代替テキスト
  // img_element2.width = 200; // 横サイズ（px）
  // img_element2.height = 200; // 縦サイズ（px）
  // // 指定した要素にimg要素を挿入

  // content_area.appendChild(img_element2);
}

function fetchCharaInfo (category){
  return fetch(`https://ihatov08.github.io/kimetsu_api/api/${category}.json`)
  .then(response => {
    if (!response.ok) {
      return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
    } else {
      return response.json();
    }
  });
}

main();