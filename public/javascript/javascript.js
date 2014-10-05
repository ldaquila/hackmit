function validateForm() {
    	//var choice1 = document.getElementById('Position1.1');
    	//var choice2 = document.getElementById('Position1.2');
    	//console.log("in");
    	//("input[name=President1]:checked").val());
    	//alert(choice1.value);
    	//alert(choice2.value);
    	//console.log(choice1.length);
    	//console.log(choice2.length);
    	for(var i=0; i<ballot.length; i++){    		
    		if ($("input[name="ballot[i][0] + "1:checked").val() == $("input[name="ballot[i][0] + "2]:checked").val()) {
    			alert(ballot[i][0] + " has been filled out incorrectly");
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

