jQuery('document').ready(function($) {
	'use strict';

	console.log("Scripts loaded!");

	let endpoint = 'https://api.themoviedb.org/3/discover/movie';
	let apiKey = 'ca3d69ee336e43d8099727f0d7ce3859';

	// Define custom selected URL variables
	let year = "2020";
	let genre = "action";

	$('#year').change(function(){
		year = $(this).children("option:selected").val();
		console.log(year);

		doRequest(year, "action");
	});


	function doRequest(year, genre) {
		$('.movie-item').remove();

		$.ajax({
			url: endpoint + "?api_key=" + apiKey +"&year=" + year + "&genre=" + genre,
			contentType: "application/json",
			dataType: 'json',
			success: function(result){
				console.log(result);
	
				jQuery.each(result.results, function(index, item) {
	
					let voteRating = item.vote_average;
					let recommendation;
	
					// If movie rating is below 7, show a thumbs down icon
					if (voteRating <= 7) {
						recommendation = "dist/images/thumbs-down-solid.svg";
					
						// Else show a thumbs up icon
					} else {	
						recommendation = "dist/images/thumbs-up-solid.svg";
					}
	
					$('.movies-list').append(`
						<li class="movie-item">
						<div class="movie-rating"><span>${item.vote_average}</span><img class="movie-recommendation" src="${recommendation}" alt=""/></div>
						<aside class="movie-thumbnail mb-3">
							<picture><img src="http://image.tmdb.org/t/p/w440_and_h660_face/${item.poster_path}"></picture>
						</aside>
						<div class="movie-meta">
							<h2 class="movie-title">${item.title}</h2>
							<p class="movie-release-date">${item.release_date}</p>
							<div class="movie-description">${item.overview}</div>
						</div>
					</li>
					`);
				});
			}
		});
	}
});