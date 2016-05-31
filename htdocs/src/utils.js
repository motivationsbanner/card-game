/**
 * card game
 * client: https://github.com/cravay/card-game
 * server: https://github.com/ceoy/Nodejs
 */

var infoDiv;

function showInfo(info)
{
	infoDiv = infoDiv || document.getElementById("info");

	infoDiv.hidden = false;
	infoDiv.textContent = info;
}

function hideInfo()
{
	infoDiv = infoDiv || document.getElementById("info");

	infoDiv.hidden = true;
}
