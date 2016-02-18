

function renderChart(rawData) {						// Rendering chart

	$('#container').highcharts('StockChart', {
		rangeSelector : {
			selected : 1
		},
		series : [{
			name : 'Price',
			data : rawData,
			tooltip: {
				valueDecimals: 2
			}
		}]
	});  
}

function validPriceTarget(priceTarget, priceTargetFull, price) {

		if (priceTarget == null) {
	       		$('.priceTarget').text("No Price Target Available");
	       		return 1;
	   	} else {
	        	$('.priceTarget').text(priceTargetFull);
	        	if (priceTarget >= price) {
	        		$('#priceTarget2').addClass("green");
	        		return 2;
	        	} else {
	        		$('#priceTarget2').addClass("red");
	        		return 3;
	        	}
     	}
}


function peerGrowth(name, growthRate, peers) {
	if (name === null || growthRate === null || peers === null) {
		var notAvailable = 'Detailed information on company growth not available.';
		$('#growth').text(notAvailable);
		return 1;		
	} else {
		var string = name + ' forecast to grow at ' + growthRate + '%, industry peers forecast to grow at ' + peers + '%.';
		$('#growth').text(string);
		return 2
	}
}



function dailyChangeFormatting(change) {

	if (change > 0) {
		$('#chg').addClass("green")
	} else {
	    $('#chg').addClass("red");
	}
}


function fiveMetrics(input, boolean) {						// color formatting the 5 metric dashboard accordingly

	       	var positiveColor = 'rgba(9, 187, 0, 1)';		// variables passed for CSS styling
	       	var negativeColor = 'rgba(250, 0, 24, 1)';		
	       	var selector = '#' + input;						// concatenation for jQuery selectors

	       	if (boolean === true) {
	       		$(selector).css('background-color', positiveColor);
	       		$(selector).css('color', 'white');
	       	} else {
	       		$(selector).css('background-color', negativeColor);
	       		$(selector).css('color', 'white');
	       	}
}


function currency_formatting(currency_code) {

		var currency_symbols = {
		    'usd': '$', // US Dollar
		    'eur': '€', // Euro
		    'gbp': '£', // British Pound Sterling
		    'inr': '₹', // Indian Rupee
		    'jpy': '¥', // Japanese Yen
		    'krw': '₩', // South Korean Won
		    'ngn': '₦', // Nigerian Naira
		    'php': '₱', // Philippine Peso
		    'thb': '฿', // Thai Baht
		    'vnd': '₫', // Vietnamese Dong
		};

	if (currency_symbols[currency_code] !== undefined) {
	    var symbol = (currency_symbols[currency_code]);
	    $('.currencySymbol').prepend(symbol);
	}
	return symbol;
}


function getData() {

	var tickerParam = location.search.split('ticker=')[1];

	$.ajax({
	    url: 'https://dozlacmd51.execute-api.us-east-1.amazonaws.com/v1/search/filter',
	    type: 'PUT',
	    data: { "conditions": {ticker: tickerParam }, 'select': '_all'},
	    success: function(result) {
	        if (result[0] === undefined || null) {
	        	window.location.replace("/search")
	        }

	        var data = result[0];

	        ////////////////   Header Info  ////////////////
	        var name = data.short_name;
	        var ticker = data.ticker.toUpperCase();
	        var price = data.price
	       	var description = data.description;
	       	var webpage = data.home_page;
	       	var sic = data.sic;
	        $('.name').text(name);
	        $('#ticker').text('Ticker: ' + ticker);
	        $('#price').text(price);
	        $("#readMore").attr('href', webpage);
	        $('#description').text(description);


	        ////////////////////   5 metrics Dashboard Div  //////////////////  
	        ////////////////////   part A - Boolean values  //////////////////  
	        var dividends = data.dividends;
	        var growing = data.growing;
	       	var profitable = data.profitable;
	       	var cheaper = data.cheaper;
	       	var priceTarget = data.target_price;

	       	/////////////////////   part B - String & Integer Values  /////////
	        var dps = data.dps;
	        var eps = data.eps;
	        var peRatio = data.pe_ratio;
	       	var reccomendation = data.reccomendation_text;
	       	var div_yield = ((dps / price) * 100).toFixed(2);
	        var longTermGrowth = data.long_term_growth;
	        var peerLongTermGrowth = data.peer_average_long_term_growth;

	        $('#dps').text(dps + ' dividend paid per share ' + '(' + div_yield + '% yield)');
	        $('#eps').text(eps + ' per share');
	       	$('#peRatio').text('Current PE Ratio of ' + peRatio);
	       	peerGrowth(name, longTermGrowth, peerLongTermGrowth);

	       	////////////////  Passing Data to 5 Metrics dashboard Function //////////////
			fiveMetrics('dividends', dividends);															// color coding the 5 metrics div
			fiveMetrics('growing', growing);
			fiveMetrics('profitable', profitable);
			fiveMetrics('cheaper', cheaper);
			if (priceTarget >= price) {
				fiveMetrics('priceTarget', true);
			} else {
				fiveMetrics('priceTarget', false);
			}


	        /////////////////// Key Performance Metrics /////////////////
	        var summary = data.financial_summary;
	        var marketcap = (data.market_value_usd / 1000).toFixed(2);
	        var fiftytwo_high = data.fifty_two_week_high;
	        var fiftytwo_upside = ((fiftytwo_high - price) / price * 100).toFixed(2);
	        var fiftytwo_low = data.fifty_two_week_low;
	        var fiftytwo_downside = ((fiftytwo_low - price) / price * 100).toFixed(2);
	        var upside = (((priceTarget - price) / price) * 100).toFixed(2);
	        var priceTargetFull = (priceTarget + ' (' + upside + "%)");
	       	$('#52high').text(fiftytwo_high + ' (' + fiftytwo_upside + '%)');
	       	$('#52low').text(fiftytwo_low + ' (' + fiftytwo_downside + '%)');
	       	$('#marketcap').text(marketcap + ' Billion');
	       	$('#analysis').text(summary);
	        

	        ////////////////////// Advanced Metrics  ///////////////////////
			var grossMargin = (data.gross_margin !== null ? data.gross_margin : 'Not Available');
			var netMargin = (data.net_profile !== null ? ((data.net_profit / data.latest_sales) * 100).toFixed(2) : 'Not Available');
			var priceToBook = (data.book_value !== null ? data.book_value : 'Not Available');
			var ROE = data.return_on_equity;
	       	$('#grossMargin').text(grossMargin + '%');
	       	$('#netMargin').text(netMargin + '%');
	       	$('#bookValue').text(priceToBook);
	       	$('#ROE').text(ROE + "%");


	       	/////////////////// Second AJAX call for HISTORICAL stock data  ////////////////
			$.ajax({
				    url: 'https://dozlacmd51.execute-api.us-east-1.amazonaws.com/v1/historical',
				    type: 'PUT',
				    data: { 'sic': sic,
				    		'after': 0,
				    		'select': ['price']
						  },
				    success: function(result) {
				    	
				    	// Preparing array of raw data for chart
				    	var chartArraySorted = [];										// chronologically sorted stock performance
				    	for (i = (result.length - 1); i >= 0; i--) {					// -1 needed as the input array contains an "undefined" at last entry
				    		chartArraySorted.push([(result[i].updated_at * 1000), result[i].price]);
				    	}
				    	renderChart(chartArraySorted);


	        			var currentPrice = result[0].price;
	        			var previousClose = result[1].price;
	        			var priceChange = (previousClose - currentPrice).toFixed(2);
	        			var percentageChange = ((priceChange / previousClose) * 100).toFixed(2);
	        			var chg = (priceChange + " (" + percentageChange + '%)');
	        			$('#chg').text(chg);
	        			dailyChangeFormatting(priceChange);
	        		}
	        });

	       	validPriceTarget(priceTarget, priceTargetFull, price);
	       	currency_formatting(data.currency_code);

	    }
	});
}


///////////////////////////////////////////////////////////////////////////////////


$(document).ready(function () {

  getData();

});