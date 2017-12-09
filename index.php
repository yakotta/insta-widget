<!DOCTYPE HTML>
<html>
    <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous" />
        <link rel="stylesheet" href="styles.css" />
        <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
        <script defer src="https://use.fontawesome.com/releases/v5.0.1/js/all.js"></script>
        <script type="text/javascript" src="js.js"></script>
    </head>

    <body>
        <div id="insta-widget" class="widget-small">
            <div class="heading">
                <p class="h1 section-header">Get the latest looks</p>
            </div>
            <div class="body clearfix">
                <div class="loading">Loading...</div>
            </div>
            <div class="footing">
                <p class="h2 section-header">
                    <a href="#link" target="_blank">See More</a>
                </p>
                <div class="user-info">
                    <img src="#link" />
                    <span class="full-name"></span>
                    <span class="follower-count"></span> followers
                    <span class="post-count"></span> posts
                </div>
            </div>

            <template id="ig_image_template">
                <div class="insta-item box grid-item medium--three-twelfths small--four-twelfths">
                    <div class="info">
                        <div class="likes">
                            <span class="fa fa-heart"></span>
                        </div>
                        <div class="comments">
                            <span class="fa fa-comment"></span>
                        </div>
                    </div>
                    <a class="info" href="#link" target="_blank"></a>
                    <img src="#image" />
                </div>
            </template>
        </div>  
    </body>
</html>
