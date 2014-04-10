function produceNavigation()
{
	//Bindings
	/****************************************************************************/
	/**																		   **/
	/**			Ignore key bindings for now									   **/
	/**																		   **/
	/****************************************************************************/
	$(document).keydown(function(e) 
	{
		if (!rebook.navigation.isFocus() )
		{
			// this is only a convenience check.
			var loggedin = document.cookie.indexOf('user') > -1; 
			var loc = window.location.pathname;
			switch (e.keyCode)
			{
				
				case 27:
			// 'ESC'
			if (loc != "/" && ! $('.modal').is(':visible') )
			{
				$('.brand').trigger('mousedown');
			}
			break;

			case 16:
			// 'SHIFT'
			if (!loggedin)
			{
				if ( document.activeElement.getAttribute('id') != 'usernameTop')
				{
					// move focus to log in fields
					$('#usernameTop').focus()
				}
			}	
			break;

			case 70:
			// 'F'
			if ( loc != "/find")
			{
				$($('#lifind').children()[0]).trigger('mousedown');
				$(document).on('keyup', function()
				{
					$('#searchInput').focus();
					$(document).unbind('keyup')
				})
			}
			break;

			case 83: 
			// 'S'
			if ( loc != "sell")
			{
				$($('#lisell').children()[0]).trigger('mousedown');
				$(document).on('keyup', function() 
				{
					$('#ISBN').focus();
					$(document).unbind('keyup');
					rebook.sell.displayInstituteSell();
				})
			}
			break;

			case 87: 	
			// 'W'
			if( loc != "/wtf")
			{
				$($('#liwtf').children()[0]).trigger('mousedown');				
			}
			break;

			case 65:
			// 'A'
			if ( loc == "/wtf")
			{
				$('#control_about').trigger('click')
			}
			break;

			case 72: 
			// 'H'
			if ( loc == "/wtf")
			{
				$('#control_nav').trigger('click')
			}
			break;

			case 81: 
			// 'Q'
			if ( loc == "/wtf")
			{
				$('#control_faq').trigger('click')
			}
			break;

			case 79:
			// 'O'
			if ( loc != "/overview" && loggedin)
			{
				$($('#lioverview').children()[0]).trigger('mousedown');
			}
			break;

			case 84:
			// 'T'
			if ( loc != "/stats" && loggedin)
			{
				$($('#listats').children()[0]).trigger('mousedown');
			}
			break;

			case 77:
			// 'M'
			if ( loc != "/messages" && loggedin)
			{
				$($('#limessages').children()[0]).trigger('mousedown');
			}
			break;

			case 66:
			// 'B'
			if ( loc != "/mybooks" && loggedin)
			{
				$($('#limybooks').children()[0]).trigger('mousedown');
			}
			break;

			case 88:
			// 'X'
			if ( loc == "/" && loggedin)
			{
				$('.logout').trigger('click')
			}
			break;

			case 69: 
			// 'E'
			if ( loggedin )
			{
				$($('#lisettings').children()[0]).trigger('mousedown')
			}
			default: 
			break;
		}
	}
});
$("li").mousedown(function()
{
	if ($($(this).parent()[0]).attr("class") === "nav nav-pills")
	{
		var that = $(this).attr("data-get");
		rebook.extra.writeLog(that, 'navigation');
		var thatToo = $($(this).parent()[0]).children();
		$.each($(thatToo), function()
		{
			$(this).removeClass("active");
		});
		$(this).addClass("active");
		if (that != "")
		{
			var parent = $($(this).attr("data-get")).parent();
			$.each($(parent).children(), function()
			{
				if (("#" + $(this).attr("id")) === that)
				{
					$(this).addClass("active");
				}
				else
				{
					$(this).removeClass("active");
				}
			});
		}	
	}
});
$("body").mousedown(function()
{ 
	console.log('hurray!')
	var site = $(this).attr("data-site");
	if (site == '/index')
	{
		var logsite = '/'
	}
	else
	{
		var logsite = site
	}
		// logsite fits the information from location.pathname if 
		// location is set at front page
		// check is to prevent pushing unnecesary to users browser history
		if (logsite != location.pathname)
		{
			if( $(this)[0].tagName == 'BUTTON')
			{
				rebook.extra.writeLog(logsite, 'navigation')
			}
			else 
			{
				rebook.extra.writeLog(logsite, 'navigation', 'menu');
			}

			$.each($(".modal"), function()
			{
				$(this).modal("hide");
			});

			$(".collapse").collapse('hide');
			rebook.navigation.hideAll();

			$("#" + site.replace("/", "")).attr("class", "block");

			switch(site)
			{
				case "/index":
				rebook.navigation.pushHistory('/');
				break;

				case "/find":

				$("#notifybook").addClass("hide");

				$("#searchInput").val("");
				var res = rebook.find.searchQuery("", 1);
				rebook.find.loadBooks(1, res.res);
				rebook.navigation.pushHistory(site);
				$("#li" + site.replace("/", "")).attr("class", "active");
				$.each($("#find").find(".sorts > i"), function()
				{
					$(this).addClass("hide");
				});
				break;

				case "/mybooks":
				rebook.navigation.pushHistory(site);
				rebook.mybooks.displayMyBooks(1);
				$("#li" + site.replace("/", "")).attr("class", "active");
				break;

				case "/wtf":
				rebook.navigation.pushHistory(site);
				$("#li" + site.replace("/", "")).attr("class", "active")
				$('.accordion-toggle:first').trigger('click')
				break;

				case "/overview":
				rebook.overview.update();
				rebook.navigation.pushHistory(site);
				$("#li" + site.replace("/", "")).attr("class", "active");
				break;

				case "/settings":
				rebook.settings.refreshUserStudies();
				rebook.settings.setSettings();
				rebook.navigation.pushHistory(site);
				$("#li" + site.replace("/", "")).attr("class", "active");
				break;

				case "/messages":
				rebook.navigation.pushHistory(site);
				$("#li" + site.replace("/", "")).attr("class", "active");
				break;

				case "/wishlist":
				rebook.wishlist.getWishList();
				rebook.navigation.pushHistory(site);
				$("#li" + site.replace("/", "")).attr("class", "active");

				case "/sell":
				rebook.sell.displayInstituteSell();
				rebook.navigation.pushHistory(site);
				$("#li" + site.replace("/", "")).attr("class", "active");
				break;

				default: 
				rebook.navigation.pushHistory(site);
				$("#li" + site.replace("/", "")).attr("class", "active");
				break;
			}
		}
	});
	//
	return{
		firstTime: true,
		sites: ["/", "/find", "/sell", "/mybooks", "/wtf", "/messages", "/overview", "/stats", "/settings", "/followbugs", "/wishlist"],
		divs: ["index", "find", "sell", "mybooks", "wtf", "messages", "overview", "stats", "settings", "followbugs", "wishlist"],
		loadSite: function(logthis)
		{
			var site = window.location.pathname;
			var search = window.location.search;
			for (var i = 0; i < this.sites.length; i++)
			{
				if (this.sites[i] == site)
				{
					$("#searchInput").val(rebook.extra.getSearchWord(decodeURIComponent(search), "searchable="));
					rebook.navigation.hideAll();
					$("#" + this.divs[i]).attr("class", "block");
					if (site != "/")
					{
						if (site == "/find")
						{
							$("#notifybook").addClass("hide");

							rebook.navigation.loadFind();
							$("#li" + this.divs[i]).attr("class", "active");
							break;
						}
						if (site == "/overview")
						{
							rebook.overview.update();
						}
						if (site == "/settings")
						{
							rebook.settings.refreshUserStudies();
							rebook.settings.setSettings();
						}
						if (site == "/mybooks")
						{
							rebook.navigation.loadMyBooksSort();
						}
						if (site == "/wishlist")
						{
							rebook.wishlist.getWishList();
						}
						if (site == "/sell")
						{
							rebook.sell.displayInstituteSell();
						}
					}
				}
			}
			if (logthis == undefined)
			{
				rebook.extra.writeLog('pageload', 'navigation', site + search);
			}
		},
		hideAll: function()
		{
			$(this.divs).each(function(i, div)
			{
				$("#" + div).attr("class", "hide");
				$("#li" + div).attr("class", "");
			});
		},
		pushHistory: function(path)
		{
			if (history.pushState != "undefined")
			{
				history.pushState(null, null, path);
			}
			else
			{
				window.location = path;
			}
		},
		runpopState: function()
		{
			rebook.navigation.active();
		},
		active: function()
		{
			if (rebook.navigation.firstTime)
			{
				rebook.navigation.firstTime = false;
				rebook.navigation.loadSite();	
				rebook.data.updateSite(0,0);
			}
			else
			{
				rebook.navigation.loadSite();	
			}
		},
		loadFind: function()
		{
			var search = window.location.search;
			var bookID = rebook.extra.getSearchWord(search, "bookid=");
			var sellerID = rebook.extra.getSearchWord(search, "seller=");

			var sort = rebook.extra.getSearchWord(search, "sort=");
			var up = rebook.extra.getSearchWord(search, "up=");
			var upDown = false;
			var res;
			if (up == "true")
			{
				upDown = true;
			}
			else if (up == "false")
			{
				upDown = false;
			}

			if (bookID != "")
			{
				res = rebook.find.searchForBook(bookID, rebook.extra.isNumber(rebook.extra.getSearchWord(search, "page=")));
			}
			else if (sellerID != "")
			{
				res = rebook.find.searchForSeller(sellerID, rebook.extra.isNumber(rebook.extra.getSearchWord(search, "page=")));
			}
			else
			{
				res = rebook.find.searchQuery(
					$("#searchInput").val(),
					rebook.extra.isNumber(rebook.extra.getSearchWord(search, "page=")));
			}

			rebook.extra.loadArrows(sort, upDown, "#find");
			if (sort != "" && up != "")
			{
				rebook.find.loadBooks(res.side, rebook.extra.quickSort(res.res, sort, upDown));
			}
			else
			{
				rebook.find.loadBooks(res.side, res.res);
			}	
		},
		loadMyBooksSort: function()
		{
			var search = window.location.search;

			var sort = rebook.extra.getSearchWord(search, "sort=");
			var up = rebook.extra.getSearchWord(search, "up=");
			var page = rebook.extra.isNumber(rebook.extra.getSearchWord(search, "page="));

			var upDown = false;
			if (up == "true")
			{
				upDown = true;
			}
			else if (up == "false")
			{
				upDown = false;
			}

			rebook.extra.loadArrows(sort, upDown, "#mybooks");
			rebook.user.myBooks = rebook.extra.quickSort(rebook.user.myBooks, sort, upDown);
			rebook.mybooks.reloadMyBooks();
		},
		isFocus: function() 
		{
			var activeElement = document.activeElement.tagName;
			return (activeElement == "INPUT" || activeElement == "SELECT" || activeElement == "TEXTAREA")
		}
	}
}