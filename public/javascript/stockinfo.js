


function getData() {

	var tickerParam = location.search.split('ticker=')[1];

	// console.log('HERE IS THE TICKER');
	// console.log(myParam);

	$.ajax({
	    url: 'https://dozlacmd51.execute-api.us-east-1.amazonaws.com/v1/search/filter',
	    type: 'PUT',
	    data: { "conditions": {ticker: tickerParam }, 'select': '_all'},
	    success: function(result) {
	        console.log(result)
	        var data = result[0];

	        // Header Info
	        var name = data.short_name;
	        var ticker = data.ticker.toUpperCase();
	        var price = data.price
	       	var description = data.description;
	       	var webpage = data.home_page;
	       	var sic = data.sic;

	        $('.name').text(name);
	        $('#ticker').text(ticker);
	        $('#price').text(price);
	        $("#readMore").attr('href', webpage);
	        $('#description').text(description);

	        // 5 metrics
	        // part A - Boolean values
	        var dividends = data.dividends;
	        var growing = data.growing;
	       	var profitable = data.profitable;
	       	var cheaper = data.cheaper;
	       	var priceTarget = data.target_price;


	       	if (dividends === true) {
	       		$('#metric2').css('background-color', 'green');
	       		$('#metric2').css('color', 'white');
	       	} else {
	       		$('#metric2').css('background-color', 'red');
	       		$('#metric2').css('color', 'black');
	       	}

	       	if (growing === true) {
	       		$('#metric1').css('background-color', 'green');
	       		$('#metric1').css('color', 'white');
	       	} else {
	       		$('#metric1').css('background-color', 'red');
	       		$('#metric1').css('color', 'black');
	       	}

	       	if (profitable === true) {
	       		$('#metric4').css('background-color', 'green');
	       		$('#metric4').css('color', 'white');
	       	} else {
	       		$('#metric4').css('background-color', 'red');
	       		$('#metric4').css('color', 'black');
	       	}

	       	if (cheaper === true) {
	       		$('#metric5').css('background-color', 'green');
	       		$('#metric5').css('color', 'white');
	       	} else {
	       		$('#metric5').css('background-color', 'red');
	       		$('#metric5').css('color', 'black');
	       	}

	       	if (priceTarget > price) {
	       		$('#metric3').css('background-color', 'green');
	       		$('#metric3').css('color', 'white');
	       	} else {
	       		$('#metric3').css('background-color', 'red');
	       		$('#metric3').css('color', 'black');
	       	}




	       	// part B - String and Integer Values
	        var dps = data.dps;
	        var eps = data.eps;
	        var peRatio = data.pe_ratio;

	       	var reccomendation = data.reccomendation_text;
	        $('#dps').text(dps);
	        $('#eps').text(eps);
	       	$('#peRatio').text(peRatio);

	        $('#peRatio').text(peRatio);


	        // Key Performance Metrics
	        var summary = data.financial_summary;
	        var marketcap = data.enterprise_value;
	        var fiftytwo_high = data.fifty_two_week_high;
	        var fiftytwo_low = data.fifty_two_week_low;
	        var upside = (((priceTarget - price) / price) * 100).toFixed(2);
	        var priceTargetFull = (priceTarget + ' (' + upside + "%)");

	       	$('#52high').text(fiftytwo_high);
	       	$('#52low').text(fiftytwo_low);
	       	$('#marketcap').text(marketcap);
	       	$('#analysis').text(summary);
	        $('.priceTarget').text(priceTargetFull);


			$.ajax({
				    url: 'https://dozlacmd51.execute-api.us-east-1.amazonaws.com/v1/historical',
				    type: 'PUT',
				    data: { 'sic': sic,
				    		'after': 0,
				    		'select': ['price']
						  },
				    success: function(result) {
				    	console.log(result);
	        			var currentPrice = result[0].price;
	        			var previousClose = result[1].price;
	        			var dollarChange = (previousClose - currentPrice).toFixed(2);
	        			var percentageChange = ((dollarChange / previousClose) * 100).toFixed(2);
	        			var chg = (dollarChange + " (" + percentageChange + '%)');
	        		
	        			$('#chg').text(chg);


				       	if (dollarChange > 0) {
				       		$('#chg').css('color', 'green');
				       	} else {
				       		$('#chg').css('color', 'red');
				       	}
	        		}

	        });
	    }
	});
}




///////////////////////////////////////////////////////////////////////////////////


$(document).ready(function () {

  getData();

});