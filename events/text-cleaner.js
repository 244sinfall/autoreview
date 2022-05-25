let toCleanEditor;

ClassicEditor
  .create( document.querySelector( '#to-clean-editor' ) )
  .then( editor => {
    toCleanEditor = editor;
    toCleanEditor.setData("<p>Внесите сюда список для очистки</p>");
    toCleanEditor.config.set("width", "50%");
  } )
  .catch( error => {
    console.error( error );
  } );


let cleanedEditor;

ClassicEditor
  .create( document.querySelector( '#cleaned-editor' ) )
  .then( editor => {
    cleanedEditor = editor;
    cleanedEditor.setData("<p>Для генерации вердикта нажмите кнопку 'Создать вердикт'</p>");
  } )
  .catch( error => {
    console.error( error );
  } );

let element = document.getElementById("clean-text");
element.addEventListener("click", () => {
  let input = toCleanEditor.getData().replaceAll("<br>", "\n")
    .replaceAll("<p>", "")
    .replaceAll("</p>", "\n");
  let arrayOfLines = input.split("\n");
  let cleanedArrayOfLines = arrayOfLines.filter((s) => {
    return !(!s || s === "" || s === "&nbsp;");
  });
  let cleanedParticipants = cleanedArrayOfLines.flatMap((element) => {
    if(element.endsWith(" W") ||
      element.endsWith(" M") || element.endsWith(" MW") || element.endsWith(" WM") ||
      element.endsWith(" D") || element.endsWith(" WD") || element.endsWith(" DW")) {
      return element;
    }
    else {
      return element.match(/[А-Яа-я]+/)[0];
    }
  })
  if(cleanedParticipants.length) {
    let output = cleanedParticipants.join("<br>");
    output += `<br><br><br>Количество участников: ${cleanedParticipants.length}`
    cleanedEditor.setData(output);
  }
})
