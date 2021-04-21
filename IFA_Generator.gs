// Main folder 
// https://drive.google.com/drive/folders/14kq2ZAeWNjWF2GJLceV-CzE6ik1WPAAn
// Template Doc ID
// https://docs.google.com/document/d/1o6TjQn1tfUj2gf7FkOGP1XB40I8gLHNTJdqK7GZayeo/edit
var templateDoc = DriveApp.getFileById("1o6TjQn1tfUj2gf7FkOGP1XB40I8gLHNTJdqK7GZayeo");
// Folder ID in Drive to save copy of every generated IFA
// https://drive.google.com/drive/folders/1mWd4ZnkdcWv4SyV9hV2ObvZ9VyPsJZyp
var responseDrive = DriveApp.getFolderById("1mWd4ZnkdcWv4SyV9hV2ObvZ9VyPsJZyp");

function mainFunction() {
  var ss= SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  // var lr = ss.getLastRow();
  var lr=ss.getRange(`K1`).getValue();
  var address_of_country= ss.getRange(`A${lr}`).getValue();
  var first_name= ss.getRange(`C${lr}`).getValue();
  //IN SHEET THE CELL HAS THE WHOLE NAME IN ONE CELL, AND IN DOC ONLY FIRST NAME IS GIVEN???
  var arriving_from_university= ss.getRange(`D${lr}`).getValue(); 
  var arriving_to_university= ss.getRange(`M${lr}`).getValue();
  var pno= ss.getRange(`I${lr}`).getValue();
  var dept= ss.getRange(`N${lr}`).getValue();
  var start_date= ss.getRange(`T${lr}`).getValue();
  var last_date= ss.getRange(`U${lr}`).getValue();
  var gender= ss.getRange(`F${lr}`).getValue();
  var stipend=7000;
  var date = ss.getRange(`S${lr}`).getValue(); //NEED TO ASK WHICH DATE IN IFA SHEET THIS IS??? CHECK IF THE DATE ADDED IS CORRECT OR WRONG

  var dob= ss.getRange(`L${lr}`).getValue();// NEED TO ADD DOB TO THE IFA SHEET???
  var passport_issue_date= ss.getRange(`J${lr}`).getValue();//NEED TO ADD ISSUE DATE TO THE IFA SHEET???
  var passport_end_date= ss.getRange(`K${lr}`).getValue();//NEED TO ADD END DATE TO THE IFA SHEET???
  

  var copy = templateDoc.makeCopy(`IFA_${first_name}`,responseDrive);
  var doc = DocumentApp.openById(copy.getId());
  var body = doc.getBody();
  
  // Replace values in the copy of the IFA.
  body.replaceText("{date}",date);
  body.replaceText("{address of country}",address_of_country);
  body.replaceText("{first}",first_name);
  body.replaceText("{arrivingfromuniversity}",arriving_from_university);
  body.replaceText("{dob}",dob);
  body.replaceText("{pno}",pno);
  body.replaceText("{issue}",passport_issue_date);
  body.replaceText("{exp}",passport_end_date);
  body.replaceText("{dept}",dept);
  body.replaceText("{acceptingcollege}",arriving_to_university);
  body.replaceText("{start}",start_date);
  body.replaceText("{end}",last_date);
  body.replaceText("{stipend}",stipend);
  if(gender=="Male"){
    body.replaceText("{gender_her_his}","his");
    body.replaceText("{gender_he_she}","he");
  }
  else {
    body.replaceText("{gender_her_his}","her");
    body.replaceText("{gender_he_she}","she");
  }  
  doc.saveAndClose();
}

