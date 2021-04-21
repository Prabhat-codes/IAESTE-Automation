// Template Doc ID
var templateDoc = DriveApp.getFileById("1xC6dSLiTkw9FozI2tOs57ICrTF-s_jzxfoWwFabuIXI");
// Folder ID in Drive to save copy of every generated covenant

function mainFunction() {
  var ss= SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lr = ss.getRange(`F4`).getValue();
  var drive_choice=ss.getRange(`D${lr}`).getValue();
  if(drive_choice==1){
    var responseDrive = DriveApp.getFolderById("1MgkD9iMTKwy_teb4CD4RS-SDLbfk-7NV");
  }
  else if(drive_choice==2){
    var responseDrive = DriveApp.getFolderById("1JeEfjU60AE4-oAynELvlrV0uF9zWsbbx");
  }
  else if(drive_choice==3){
    var responseDrive = DriveApp.getFolderById("1isJv9wNFfR3nXtzUhHkhkizhxkwh_Kus");
  }  
  var offerNo = ss.getRange(`A${lr}`).getValue();
  var country= ss.getRange(`B${lr}`).getValue();
  var placementfee= ss.getRange(`C${lr}`).getValue();
  var copy = templateDoc.makeCopy(`${offerNo} Covenant`,responseDrive);
  var doc = DocumentApp.openById(copy.getId());
  var body = doc.getBody();
  
  // Replace values in the copy of the covenant.
  body.replaceText("{placementfee}",placementfee);
  // body.replaceText(" {offerno}",placementFees);
  body.replaceText(" {offerno}",offerNo);
  body.replaceText("{country}",country);
  doc.saveAndClose();
  const pdfContentBlob=doc.getAs(MimeType.PDF);
  responseDrive.createFile(pdfContentBlob).setName(`${offerNo} Covenant`);
  responseDrive.removeFile(copy);
  // responseDrive.removeFile(doc);
  //Need to convert to pdf file here.
  // var docFile = DriveApp.getFileById(doc);
  // var blobFile = docFile.getAs('application/pdf');
  // var pdfVersion = DriveApp.createFile(blobFile);
}
