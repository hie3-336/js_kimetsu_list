console.log("Hello World");

async function main() {
  try {
    const charaInfo = await fetchCharaInfo();
    console.log(charaInfo);
  } catch (error) {
    console.error(`エラーが発生しました (${error})`);
  }
}

function fetchCharaInfo (){
  return fetch(`https://ihatov08.github.io/kimetsu_api/api/all.json`)
  .then(response => {
    if (!response.ok) {
      return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
    } else {
      return response.json();
    }
  });
}

main();