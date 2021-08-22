var dailyPrice = 0, room=0, checkedAddItems=0;
var totalCost=0;
var breakfastTotal=0;

//Function for nav bar
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}


//Function to update room information (there is an alternative on page 20)
function updateRoom() {
	alert("Update Function");
	var room=this.dataset.name;
	alert(room);
	var price = this.dataset.price;
	alert(price);
roomOutput.innerHTML=room;
priceOutput.innerHTML=price;
}
var roomInputs = document.getElementsByClassName('roomCard');
for(i=0; i<roomInputs.legth; i++) {
	roomInputs[i].addEventListener('click',updateRoom)
}
//function on page 19
function updateBooking(){
	var addItems = document.getElementsByClassName('addCheck');
	//collects additional item checkboxes, stores in an object array
	var checkedAddItems = []; //empty list to add selected additional items on
	var addCost=0; //holds cost of checkboxes
	for (var i = 0; i < addItems.length; i++) {
		if (addItems[i].checked){
			checkedAddItems.push(' ' + addItems[i].value);
			alert(checkedAddItems);
			addCost += Number(addItems[i].dataset.price);
			alert(addCost);
		}
	}
	
	if(addItems[i].value=="Breakfast"){
		if(addItems[i].checked){
			var breakfastCost =25; //Defining the cost of breakfast
			breakfastTotal=breakfastCost*numberNights;
		}
	}
	var checkIn = document.getElementById("checkInDate").value;
	var numberNights = document.getElementById("numberNights").value;
	alert("number nights = " + numberNights);
	alert("check in = " + checkIn);
	totalCost= addCost + dailyPrice*numberNights;
	alert("total cost" + totalCost)
	document.getElementById("dateOutput").innerHTML = checkIn;
	document.getElementById("totaloOutput").innerHTML = "$"+totalCost;
	document.getElementById("nightsOutput").innerHTML = numberNights;
	document.getElementById("extrasOutput").innerHTML = checkedAddItems;
	
}

var allInputs = document.querySelectorAll('addCheck');
for (var i=0; i < allInputs.length; i++) {
	allInputs[i].addEventListener('input',updateBooking);
}

var roomInputs = document.getElementsByClassName('roomCard')
for ( i = 0;i<roomInputs.length; i++) {
	roomInputs[i].addEventListener('click',updateRoom);
}

function checkInputs(){
	alert("in the checkInputs function");
	var firstName=document.getElementById("firstNameInput").value;
	var lastName=document.getElementById("lastNameInput").value;
	var cellphone=document.getElementById("cellphoneInput").value;
	var email=document.getElementById("emailInput").value;
	alert("First name = "+firstName+", last name = "+lastName+", Cellphone = "+cellphone+", Email = "+email);
	pushData();
}


/*function checkInputs(numberNights){
	alert("in the Checkinputs function(nights)");
	if (numberNights == "" || document.getElementbyID("numberNights").validity.rangeOverflow || document.getElementById("numberNights").validity.rangeUnderflow){
		alert("You need to enter number correct number of nights");
		return;
	}
		}*/

function checkInput(){
	alert("check input function!");
	var userName = document.getElementById("usersNameInput").value;
	var usersEmail = usersEmailInput.value;
	if (document.getElementById("usersNameInput").validity.patternMismatch || userName== ""){
		alert("Please enter a valid username");
		return;
	}
	if (document.getElementById("usersEmalInput").validity.patternMismatch || usersEmail==""){
		alert('please enter a valid email');
		return;
	}
	pushData(userName,usersEmail);
}

function pushData(){
alert("push data function");
	var data = {
		first_name: firstNameInput.value,
		last_name: lastNameInput.value,
		phone: cellphoneInput.value,
		email: emailInput.value,
		extras: checkedAdditems,
		total_price: "$"+totalCost,
		room_type: room,
		no_nights: numberNights.value
	}
	firebase.database().ref('bookings').push(data);
	document.getElementById('confirmOverlay').style.height = "100%";
	setTimeout(function(){
		location reload();
	}, 3000);
}