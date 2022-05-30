import {getCanonicity, getConsistency, getLiteracy, getPithiness} from './review-parts.js';

let newEditor;

ClassicEditor
  .create( document.querySelector( '#review-editor' ) )
  .then( editor => {
    newEditor = editor;
    newEditor.setData("<p>Для генерации вердикта нажмите кнопку 'Создать вердикт'</p>");
  } )
  .catch( error => {
    console.error( error );
  } );

const element = document.querySelector("#create-review");

element.addEventListener("click", generateReview);

function generateReview() {
  const isEmpty = str => !str.trim().length;
  let profileLink = document.getElementById("profile-link");
  let discord = document.getElementById("discord-link");
  let characterName = document.getElementById("character-name");
  if(isEmpty(discord.value) || isEmpty(profileLink.value) || isEmpty(characterName.value)) {
    // TO DO: Not all needed info
    newEditor.setData("<p>Вердикт не может быть создан без предоставления ссылки на профиль, дискорд-тега, механического имени проверяемого персонажа..</p>");
    return;
  }

  let totalRate = parseInt(document.getElementById("total-rate").value);
  console.log(totalRate);
  if(totalRate < 0 || isNaN(totalRate)) {
    // TO DO: Варнинг отказа или нулевой оценки
    newEditor.setData("<p>Вердикт не может быть создан, поскольку у него отрицательная оценка и/или в оценке указаны неверные данные..</p>");
    return;
  }

  let review = "<p style=\"text-align: justify;\" rel=\"text-align: justify;\">Здравствуйте!\n" +
    "</p>\n" +
    "<p style=\"text-align: justify;\">Ваше творчество было оценено, согласно критериям, указанным в пункте правил <a href=\"https://rp-wow.ru/pages/fightsystem.html\">1.14</a>.\n" +
    "</p>\n" +
    "<hr>";

  // Перебор пунктов
  let rejected = false;
  let selectors = document.getElementsByClassName("selector");
  for (let selector = 0; selector < selectors.length; selector += 1) {
    let rate = parseInt(selectors[selector].value);
    if(rate >= 0 && rate <= 10 && !isNaN(rate)) {
      if(rate === 0) rejected = true;
      review += getReviewPart(selectors[selector].id, rate);
    }
  }
  if(!rejected) review += `<p>Оценка:</p><p>${characterName.value} ${totalRate}</p>`;
  if(rejected) review += `<p>В связи с вышеперечисленным, творчество получает вердикт <strong>отказано.</strong></p>`;
  review += `<p style=\"text-align: justify;\">Если у Вас остались вопросы, касаемо вынесенного решения, то Вы можете обратиться ко мне в личные сообщения на сайте (${profileLink.value}), в Discord (${discord.value}) для получения ответов на них.
</p>
<p style="text-align: justify;">С уважением,
</p>`;
  // TO DO: Создание вердикта
  //document.querySelector("[aria-label='Редактор, main']").innerHTML = "asd";
  newEditor.setData(review);
}


function getReviewPart(ofCriteria, rate) {
  switch (ofCriteria) {
    case "pithiness":
      return getPithiness(rate);
    case "literacy":
      return getLiteracy(rate);
    case "consistency":
      return getConsistency(rate);
    case "canonicity":
      return getCanonicity(rate);
    default:
      return "";
  }
}

