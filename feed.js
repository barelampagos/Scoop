function generateFeed() {
    var sources = ["techcrunch", "arstechnica", "engadget", "googlenews", "hackernews", "mashable", "recode", "redditrall", "theverge"]

    sources.forEach(function(s) {
        var url = "https://newsapi.org/v1/articles?source=" + s + "&apiKey=4f675d024b9145da9fa4aec1e090fff2"

        console.log("Building feed - " + s + "...")

        $.getJSON(url, function(data) {
            // console.log(data);
            // $("#feed").append("<div id='" + s + "' class='" + s + "'></div>")
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
    var sources = ["techcrunch", "arstechnica", "engadget", "googlenews", "hackernews", "mashable", "recode", "redditrall", "theverge"]

    $.getJSON("https://newsapi.org/v1/sources", function(data) {

        sources.forEach(function(s) {
            var sauce = data.sources.filter(function(d) {
                if (d.id == s) {
                    return d;
                };
            })

            console.log(sauce[0]);

            var html = "<br><center><img src='" + sauce[0].urlsToLogos.small + "'></center><br>"
            $("." + s).prepend(html);
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
