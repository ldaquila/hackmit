function validateForm() {
    	//var choice1 = document.getElementById('Position1.1');
    	//var choice2 = document.getElementById('Position1.2');

    	//("input[name=President1]:checked").val());
    	//alert(choice1.value);
    	//alert(choice2.value);
    	//console.log(choice1.length);
    	//console.log(choice2.length);
    	for(var i=0; i<3; i++){
    		if "input[name=Position1.1]:checked".val() == "input[name=Position1.2]:checked".val()) {
    			alert("Incorrect answer")
            	return false;
            }        	
    	}
    	//alert(choice1.value);
    	//alert(choice2.value);
    	/*if (choice1.value == choice2.value) {
    		alert("For " + "Position1" + ", you cannot choose the same person for the 1st and 2nd choice");
    		return false;
    	}*/
      
}

