
const contentArea = document.getElementById("result");

const CheckBtn = document.getElementById('CheckBtn');
CheckBtn.addEventListener('change', function () {
  main(CheckBtn.category.value);
});

async function main(category = 'all') {
  
  try {
    while(contentArea.firstChild){
      contentArea.removeChild(contentArea.firstChild);
    }
    const loadElement = document.createElement('div');
    contentArea.parentNode.classList.add('d-flex','justify-content-center');
    loadElement.classList.add('spinner-border');
    contentArea.appendChild(loadElement);

    const charaInfo = await fetchCharaInfo(category);
    contentArea.removeChild(loadElement);
    contentArea.parentNode.classList.remove('d-flex','justify-content-center');

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