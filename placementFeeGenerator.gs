function myFunction() {
    var ss= SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    // var rows = ss.getDataRange().getValues();
    var row=ss.getRange(`L5`).getValue();
    // var lc=ss.getLastColumn();
    var base_fee = ss.getRange(`B${row}`).getValue();
    var Pf=0;
    var amount;
    // ss.getRange("L${row}").setValue(100);
    
    
    var pay_per_month = ss.getRange(`C${row}`).getValue();
    var pay_per_week= ss.getRange(`D${row}`).getValue();
    if(pay_per_month==0){
      amount=pay_per_week*4;
    }
    else{
      amount=pay_per_month;
    }
    // ss.getRange("D"+(row+1)).setValue(amount);
  
    
    var deduction_percentage = ss.getRange(`E${row}`).getValue();
    var deduction_per_month = ss.getRange(`F${row}`).getValue();
    var deduction_absolute = ss.getRange(`G${row}`).getValue();
    var final_deduction=0;;
    
    if(deduction_absolute==0&&deduction_per_month==0){
      amount=amount-deduction_percentage*amount/100;
      // ss.getRange("L"+row).setValue("abs pm");
    }
    else if(deduction_percentage==0&&deduction_per_month==0){
      final_deduction=1;
      // ss.getRange("L"+row).setValue("pm perc");
      // flag to remove final deduction from the end
      // Since you want to deduce from the final amount itself,
      // and we are gonna multiple the amount with the number of weeks after this
    }
    else if(deduction_absolute==0&&deduction_percentage==0){
      amount=amount-deduction_per_month;
      // ss.getRange("L"+row).setValue("abs perc");
    }
    else{
      ss.getRange("K"+row).setValue("ERROR");
      return 0;
    }
    // ss.getRange("G"+(row+1)).setValue(amount);
  
    
    
    
    
    var live_lodge_fee = ss.getRange(`H${row}`).getValue();
    amount=amount-live_lodge_fee;
    // ss.getRange("H"+(row+1)).setValue(amount);
    
    var number_of_weeks = ss.getRange(`I${row}`).getValue();
    var number_of_months=number_of_weeks/4;
    amount=amount*number_of_months;
    //Remove final deduction here 
    if(final_deduction==1){
      amount=amount-deduction_absolute;
    }
    // ss.getRange("I"+(row+1)).setValue(amount);
    
  
  
    var conversion_rate = ss.getRange(`J${row}`).getValue();
    amount=amount*conversion_rate;
  
  
  
    //Now if amount>base_fee -> PF=amount
    //If amount<base_fee -> PF=base_fee
    if(amount<=base_fee){
      pf=base_fee;
    }
    else{
      pf=amount/4;
    }
  
  
    ss.getRange("K"+row).setValue(pf);
    // ss.getRange("L"+row).setValue(amount);
  }