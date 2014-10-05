$(function() {
	alert("here");
	var nameList = ["Denise Che", "Laura D'Aquila", "Joanna So", "Chloe Orphanides"];
	$( "#try" ).autocomplete( {source: nameList} );

})();