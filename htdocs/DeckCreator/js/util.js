/*
Script for loading all cards.
*/
var max_cards = 30,
	actual_cards = 0;
var object = [];

var socket; 
$(document).ready(function () {
	socket = io();
	
	socket.on('cards', function(data) {
		fillCardList(data);
	});

});

function fillCardList(cards)
{
	cards.forEach(function (item, index) 
	{
		var name = item.name;
		var health = item.health;
		var text = item.text;
		var attack = item.attack;
		var string = '<a href="#" class="list-group-item cardlist" data-toggle="tooltip" id="' + index + '">' + name + '</a>';
		var title = "<img src='/images/" + name.toLowerCase() + ".png' /> <br> Attack: " + attack + " Health: " + health + " <br>" + text; 
		
		$('#card-list').append(string);
		$('#' + index).prop('title', title);
		
		if (index == 0)
		{
			$('#0').addClass("active");
		}
	});
	
	bindThis();
	$('[data-toggle="tooltip"]').tooltip({
		html: true,
		placement: 'auto'		
	});
}

function bindThis() {
	$(".cardlist").on( "click" , function() {
		$(".cardlist").removeClass("active");
		$(this).addClass("active");
	});
	
	$("#deck-list").on( "click", "a" , function() {
		$(".decklist").removeClass("active");
		$(this).addClass("active");
	});
	
	// http://stackoverflow.com/questions/7295843/allow-only-numbers-to-be-typed-in-a-textbox
	$("#amount").on( "keypress", function(evt) {
		evt = (evt) ? evt : window.event;
		var charCode = (evt.which) ? evt.which : evt.keyCode;
		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
			return false;
		}
		return true;
	});
	
	$("#add").on("click", function() {
		var amount = parseInt($("#amount").val());
		var card = $(".cardlist.active").text();
		
		if ((actual_cards + amount) > max_cards) 
			{
				amount = max_cards - actual_cards;
			}
		if (amount > 0 && card !== "") {
			actual_cards += amount;
			// check if there is already this card in your deck-list
			var i = $(".decklist:contains('"+card+"')").text();
			if (i !== ""){
				
				var obj = $(".decklist:contains('"+card+"')");
				var xCards = amount + parseInt(obj.val());
				obj.text(card + " " + xCards);
				obj.val(parseInt(xCards));
				$('#cards_left').text(max_cards-actual_cards);
				return;
			}
			$('.decklist').removeClass('active');
			var string = '<a href="#" class="list-group-item decklist new active">' + card + " "  + amount + '</a>'
			$("#deck-list").append(string);
			$(".new").val(amount);
			$(".new").removeClass("new");
			$(".empty").remove();
			$('#cards_left').text(max_cards-actual_cards);
		}
	});
	
	$("#remove").on("click", function() {
		var amount = parseInt($("#amount").val());
		var card = $(".decklist.active").text();
		var card_amount = parseInt($(".decklist.active").val());
		
		if ((card_amount - amount) <= 0) {
			$('.decklist.active').remove();
			actual_cards -= card_amount;
			
			if (($('#deck-list').children('.decklist').text()) == "")
			{
				string = '<a href="#" class="list-group-item decklist empty">Empty</a>';
				$("#deck-list").append(string);
			}
			$('#cards_left').text(max_cards-actual_cards);
			return;
		}	
		    
		if (amount > 0 && card !== "") {
			var newAmount = card_amount - amount;
			card = $.trim(card);
			card = card.substring(0, card.indexOf(" "));
			$('.decklist.active').val(newAmount);
			$('.decklist.active').text(card + " " + newAmount);
			actual_cards -= amount;
			$('#cards_left').text(max_cards-actual_cards);
		}
		
	});
	
	$("#save").on("click", function() {		
		var name = $('#name').val();
		if (name !== "")
		{
			localStorage.setItem('name', name);
			$('#name_message').addClass('alert-success');
			$('#name_message').text('Name saved.');
		}
		
		if (actual_cards != 30) {
			$('#system_message').addClass("alert alert-danger");
			$('#system_message').text("You dont have 30 cards in your deck.");
			return;
		}
		
		object = [];
		$('.decklist').each(function (index, element) {
			var amount = parseInt($(element).val());
			var card = $(element).text();
			card = $.trim(card);
			card = card.substring(0, card.indexOf(" "));
			var temp = {card_name: card, card_amount: amount};
			object.push(temp);
		});
		
		var str = JSON.stringify(object);
		localStorage.setItem('deck', str);
		$('#system_message').text("Erfolgreich gespeichert!");
		$('#system_message').removeClass("alert-danger");
		$('#system_message').addClass("alert-success");
	});
}
