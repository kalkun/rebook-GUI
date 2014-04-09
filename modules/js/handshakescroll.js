$(".handshake-button").click(function()
{
	var tile = $($(this).parent()).parent();
	var infobutton = $($(this).parent()).children()[0];
	var infofield = $(tile).children()[5];
	var handshakefield = $(tile).children()[6];

	if ($(this).attr("shown") === "false" || $(this).attr("shown") === undefined)
	{
		$(infobutton).attr("shown", "false");
		$(this).attr("shown", "true");
		var newHeight = $($(handshakefield).children()[0]).height();
		$(infofield).animate({height: 0}, 500);
		$(handshakefield).animate({height: newHeight}, 500);
	}
	else
	{
		$(this).attr("shown", "false");
		$(handshakefield).animate({height: 0}, 500);		
	}
});