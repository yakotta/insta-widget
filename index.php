<!DOCTYPE HTML>
<html>
    <head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous" />
    <link rel="stylesheet" href="styles.css" />
    <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
    <script type="text/javascript" src="js.js"></script>
    </head>

    <body>
        <div id="insta-widget" class="widget-large">
            <div class="heading">
                <h1>Instagram</h1>
            </div>
            <div class="body clearfix">
                <div class="loading">Loading...</div>
            </div>
            <div class="footing">
                <h2><a href="#link" target="_blank">See More</a></h2>
                <div class="user-info">
                    <img src="#image" />
                    <span class="full-name"></span>
                    <span class="follower-count"></span> followers
                    <span class="post-count"></span> posts
                </div>
            </div>
            
            <template id="ig_image_template">
                <div class="box col-md-3 col-sm-4 col-xs-6">
                    <div class="info">
                        <div class="likes">
                            <span class="glyphicon glyphicon-heart"></span>
                        </div>
                        <div class="comments">
                            <span class="glyphicon glyphicon-comment"></span>
                        </div>
                        <!--div class="caption truncated"></div-->
                    </div>
                    <a class="info" href="#link" target="_blank"></a>
                    <img src="#image" />
                </div>
            </template>
        </div>
    </body>
</html>
