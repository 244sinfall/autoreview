let toCleanEditor;

ClassicEditor
  .create( document.querySelector( '#to-clean-editor' ) )
  .then( editor => {
    toCleanEditor = editor;
    toCleanEditor.setData("Эни (Писатель)<p>Сатан</p><br>Хейт<p>Людвичи (вел ивент)</p>");
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
  let participantsCount = 0;
  for(let participant = 0; participant < cleanedArrayOfLines.length; participant += 1) {
    if(cleanedArrayOfLines[participant].endsWith(" M") || cleanedArrayOfLines[participant].endsWith(" MW") || cleanedArrayOfLines[participant].endsWith(" WM")) {
      continue;
    }
    console.log(cleanedArrayOfLines[participant])
    participantsCount += 1;
  }
  let cleanedParticipants = cleanedArrayOfLines.flatMap((element) => {
    if (element.endsWith(" W")) {
      if(participantsCount >= 5) {
        return element;
      }
      else {
        return element.match(/[А-Яа-я]+/)[0];
      }
    }
    if(element.endsWith(" M") || element.endsWith(" MW") || element.endsWith(" WM")) {
     if(participantsCount >= 5) {
       return element;
     }
     else { return null; }
   }
   if(element.endsWith(" WD") || element.endsWith(" DW")) {
     if(participantsCount >= 5) {
       return element;
     }
     else {
       return element.match(/[А-Яа-я]+/)[0] + " D";
     }
   }
   if(element.endsWith(" D")) {
     return element
   }
   else {
      return element.match(/[А-Яа-я]+/)[0];
   }
  })
  let finalParticipantsArray = cleanedParticipants.filter((element) => { if(element !== null) { return element } } )
  if(cleanedParticipants.length) {
    let output = finalParticipantsArray.join("<br>");
    output += `<br><br><br>Количество участников: ${participantsCount}.<br>`;

    if(finalParticipantsArray.length !== cleanedArrayOfLines.length) output += `Неучаствующих: ${cleanedArrayOfLines.length-participantsCount}.<br>`;
    if(participantsCount >= 5) output += `Удостоверьтесь, что в отчете более пяти участников, прежде чем выдавать бонусы писателя/ведущего. Если в неочищенном списке бонусы не проставлены по формату - их нужно проставить самостоятельно.`;
    cleanedEditor.setData(output);
  }
})
