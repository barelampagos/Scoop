var sources = ["techcrunch", "ars-technica", "engadget", "google-news", "hacker-news", "mashable", "recode", "reddit-r-all", "the-verge", "wired-de", "techradar"]
var api_key = "4f675d024b9145da9fa4aec1e090fff2";

function generateFeed() {
    sources.forEach(function(s) {
        var url = "https://newsapi.org/v1/articles?source=" + s + "&apiKey=" + api_key;

        console.log("Building feed [" + s + "]")

        $.getJSON(url, function(data) {
            $("#feed").append("<span class='anchor' id='" + s + "'></span><div class='" + s + "'></div>")

            data.articles.forEach(function(a) {

                // Opening tags
                var html = "<div class='section' ><div class='row'>"

                if (a.urlToImage != null) {
                    // Article Image
                    html += "<div class='col s4'><center><img class='responsive-img' src='" + a.urlToImage + "' href='" + a.url + "'></center></div>"
                } else {
                    // Placeholder news image
                    html += "<div class='col s4'><center><img class='responsive-img' src='https://res.cloudinary.com/loanmarket/image/upload/news-placeholder.png' href='" + a.url + "'></center></div>"
                }

                // Article information
                if (a.author != null) {
                    html += "<div class='col s8'><h4><b>" + a.title + "</b> - <i>" + a.author + "</i></h4>"
                } else {
                    html += "<div class='col s8'><h4><b>" + a.title + "</b></h4>"
                }
                if (a.description != null) html += "<h6>" + a.description;

                html += "<br><br>(<a target='_blank' href='" + a.url + "'>READ MORE</a>)</h6></div>"

                // Closing Tags
                html += "</div></div> <div class='divider'></div>"

                $("." + s).append(html);
            })
        });
    })
    removeLoader()
    generateImages()

}

function generateImages() {
    $.getJSON("https://newsapi.org/v1/sources", function(data) {

        sources.forEach(function(s) {
            var currentSource = data.sources.filter(function(d) {
                if (d.id == s) {
                    return d;

                };
            })
            // console.log(currentSource);

            // Generate Dropdown Item
            var dropdownItem = "<li><a href=#" + s + ">" + currentSource[0].name + "</a></li>"
            $("#dropdown1").append(dropdownItem);

            // Generate Source Image
            var sourceImage = "<br><center><img src='" + currentSource[0].urlsToLogos.small + "'></center><br>"
            $("." + s).prepend(sourceImage);
        })
    })
}

function removeLoader() {
    $("#loader").remove();
}

$(document).ready(function() {
    $(".dropdown-button").dropdown();
    $(".button-collapse").sideNav();
    generateFeed();
});
