function SendNoticeMail(){
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var table_sheet = spreadsheet.getSheetByName("Calendar");
  var address_sheet = spreadsheet.getSheetByName("Mail_address");

  var today = new Date();
  var today_str = Utilities.formatDate(today, 'JST', 'MM/dd');

  var turn_table = table_sheet.getRange("C5:G23").getValues();
  var address_list = address_sheet.getRange("B1:B19").getValues();
  var name_list = address_sheet.getRange("A1:A19").getValues();

  var subject = "今日の全ゼミ議事録当番のお知らせ";
  var message1 = "今日の議事録は";
  var message2 = "さんと";
  var message3 = "さんです．\n忘れないようにお願いします．\n自動で送っているものなので返信はしなくて大丈夫です．";

  var hoge = [];
  var temp_address = [];
  for(var i in turn_table) {
    for(var j in turn_table[i]){
      if(typeof(turn_table[i][j]) != 'string'){
        if(Utilities.formatDate(turn_table[i][j], 'JST', 'MM/dd') == today_str){
          hoge.push([i]);
          temp_address.push(address_list[i]);
        }
      }
    }
  }

  if(hoge.length == 2){
    message = message1 + name_list[hoge[0]] + message2 + name_list[hoge[1]] + message3;
    MailApp.sendEmail(temp_address, subject, message);
  }else if(hoge.length == 1){
    message = message1 + name_list[hoge[0]] + message3;
    MailApp.sendEmail(temp_address, subject, message);
  }
}
