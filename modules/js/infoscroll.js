$(".info-button").click(function()
{
	var tile = $($(this).parent()).parent();
	var infofield = $(tile).children()[5];
	$(infofield).stop();
	if ($(this).attr("shown") === "false" || $(this).attr("shown") === undefined)
	{
		$(this).attr("shown", "true");
		var newHeight = $($(infofield).children()[0]).height();
		$(infofield).animate({height: newHeight}, 500);
	}
	else
	{
		$(this).attr("shown", "false");
		$(infofield).animate({height: 0}, 500);
	}
});