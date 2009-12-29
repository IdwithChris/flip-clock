(function($) {	
	$.WorldWideBanner = {
		version: '0.0.1',

		defaultConf: {
			banner: "CMS_Forex_Site_Banner-Global.swf",
			type: "US"
		},
		
		footnotes: {
			"US" : {
				text: "For non-US customers only.",
				cities: {
					"Bermuda":1,
					"Tokyo":1,
					"SaintPetersburg":1,
					"Shanghai":1,
					"UnitedKingdom":1
				}
			},
			"UK": {
				text: "For non-UK customers only.",
				cities: {
					"Boston":1,
					"NewYork":1,
					"Bermuda":1,
					"Tokyo":1,
					"SaintPetersburg":1,
					"Shanghai":1
				}
			}
		},
		
		cities: {
			"Boston" : {
				title: "CMS Forex Institutional (Boston)",
				country: "CMS Forex Institutional",
				link: "http://www.cmsfxpro.com/",
				offers: [
					"NFA Member",
					"Low Spreads",
					"2 Institutional Platforms",
					"Anonymous trading",
					"FXTradeport"
				]
			},
			"NewYork" : {
				title: "New York",
				country: "United States",
				link: "http://www.cmsfx.com",
				offers: [
					"NFA Member",
					"Low Spreads",
					"$200 Minimum Deposit",
					"VT Trader",
					"Futures Trading"
				]
			},
			"Bermuda" : {
				title: "Bermuda",
				country: "Bermuda",
				link: "http://www.cmsfxinternational.com",
				offers: [
					"BMA licensed",
					"Ability to Hedge",
					"Up to 400:1 Leverage**",
					"Institutional Services",
					"No tax on profits"
				]
			},
			"Tokyo" : {
				title: "Tokyo",
				country: "Japan",
				link: "http://www.cmsfx-japan.com/",
				offers: [
					"FSA registered",
					"Low Spreads",
					"$200 Minimum Deposit",
					"VT Trader",
					"Trust accounts"
				]
			},
			"SaintPetersburg" : {
				title: "St. Petersburg",
				country: "Russia",
				link: "http://www.cmsforex.ru",
				offers: [
					"Low Spreads",
					"VT Trader",
					"$200 Minimum Deposit",
					"Russian Educational Resources"
				]
			},
			"Shanghai" : {
				title: "Shanghai",
				country: "China",
				link: "http://www.cms-forex.com/zh/",
				offers: [
					"Low Spreads",
					"VT Trader",
					"$200 Minimum Deposit",
					"Chinese Support"
				]
			},
			"UnitedKingdom" : {
				title: "United Kingdom",
				country: "United Kingdom",
				link: "http://www.cmsfx.co.uk",
				offers: [
					"FSA Registered",
					"Ability to Hedge",
					"Up to 400:1 Leverage*",
					"VT Trader & MT4",
					"Institutional Services"
				]
			}
		},
		
		defaultTemplate:  '\
			<span id="worldBannerWrapper">\
			<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" width="100%" height="100%" id="getURL" align="middle">\
				<param name="wmode" value="transparent"/>\
				<param name="allowScriptAccess" value="sameDomain"/>\
				<param name="movie" value="<%=banner%>" />\
				<param name="quality" value="high" />\
				<param name="bgcolor" value="#ffffff" />\
			<embed src="<%=banner%>" wmode="transparent" quality="high" bgcolor="#ffffff" width="100%" height="100%" name="getURL" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />\
			</object>\
			<select size="1" name="listOfOffices" id="listOfOffices">\
				<option selected="" disabled>Choose Office</option>\
				<%=options%>\
			</select>\
			</span>\
			<span id="citytip" class="png">&nbsp;</span>\
		',
		
		optionTemplate: '\
			<option value="<%=cityId%>"><%=cityTitle%></option>\
		',
		
		tooltipTemplate: '\
			<span class="cityWrapper png <%=cityClass%>">\
				<h3><%=title%></h3>\
				<ul>\
					<%=offers%>\
				</ul>\
				<a href="<%=link%>" class="visitButton png"></a>\
				<strong><%=footnote%></strong>\
			</span>\
		',
		
		tooltipOfferTemplate: '\
			<li>\
				<%=offerTitle%>\
			</li>\
		'
	};
	
	// jQuery plugin implementation
	$.fn.WorldWideBanner = function(conf) {
		var conf = $.extend($.WorldWideBanner.defaultConf, conf);
		var bannerTemplate = $("<script type='text/html'>"+$.WorldWideBanner.defaultTemplate+"</script>"),
		optionTemplate = $("<script type='text/html'>"+$.WorldWideBanner.optionTemplate+"</script>"),
		tooltipTemplate = $("<script type='text/html'>"+$.WorldWideBanner.tooltipTemplate+"</script>"),
		tooltipOfferTemplate = $("<script type='text/html'>"+$.WorldWideBanner.tooltipOfferTemplate+"</script>");
		
		var optionsHtml = [];
		
		for (var cityId in $.WorldWideBanner.cities) {
			var city = $.WorldWideBanner.cities[cityId];
			optionsHtml.push(optionTemplate.tmpl({
				cityId: cityId,
				cityTitle: city.country
			}));
		}
		
		
		this.html(bannerTemplate.tmpl({
			banner: conf.banner,
			options: optionsHtml.join('')
		}));
		
		$("#listOfOffices").change(function(){
			var city = $(this).val();
			if (!city || !$.WorldWideBanner.cities[city]) {
				return;
			}

			window.location = $.WorldWideBanner.cities[city].link;
		});
		
		var htmlByCityTooltip = function(cityId) {
			var city = $.WorldWideBanner.cities[cityId] || null;
			if (!city) {
				return "no data";
			}

			var offersHtml = [];
			for (var i = 0; i < city.offers.length; i++) {
				offersHtml.push(tooltipOfferTemplate.tmpl({
					offerTitle: city.offers[i]
				}));
			}
			
			var footnote = "";
			
			if ($.WorldWideBanner.footnotes[conf.type] && $.WorldWideBanner.footnotes[conf.type].cities[cityId]) {
				footnote = $.WorldWideBanner.footnotes[conf.type].text;
			}

			return tooltipTemplate.tmpl({
				cityClass: cityId,
				title: city.country,
				offers: offersHtml.join(''),
				link: city.link,
				footnote: footnote
			});
		}
		
		var worldBannerWrapper = $("#worldBannerWrapper");
		
		window["WMmouseOver"] = function(city, x, y, width, height, widthFlash, heightFlash) {
			city = city;
			if (worldBannerWrapper.find("." + city).length > 0) {
				return;
			}
			
			worldBannerWrapper.append('<span class="cityHoverElement '+city+' worldBannerCityHover"> </span>');
			
			var cityNode = worldBannerWrapper.find("." + city),
				citytip = $("#citytip");
			
			cityNode
				.css("left", x)
				.css("top", y)
				.width(width)
				.height(height);
			
			
			cityNode.click(function() {
				if (!$.WorldWideBanner.cities[city]) {
					return;
				}
				window.location = $.WorldWideBanner.cities[city].link;
			});
			
			var tooltipHtml = htmlByCityTooltip(city);
			
			cityNode.tooltip({
				tip: citytip,
				offset: [10, -3],
				effect: 'slide',
				relative: true,
				onBeforeShow: function() {
					citytip.html(tooltipHtml);
				}
			});
		}

		// Don't remove!
		window["WMmouseOut"] = function() {

		}
	};		
		
}) (jQuery); 
