$(document).ready(function(){
    // Look here at this: http://api.jquery.com/jQuery.getJSON/#jQuery-getJSON-url-data-success
    var promise = $.getJSON("https://www.instagram.com/instagram/?__a=1");
    promise.done(function(response){
        try{
            // 1. Find the template html element on the page
            var $ig_image_template = $('#ig_image_template');

            // 2. get the "content" prop'erty from the $template variable
            var content = $ig_image_template.prop('content');

            var nodes = response.user.media.nodes;
            var $insta_widget = $('#insta-widget');

            nodes.slice(0,12).forEach(function(element){
                // 3. importing the templates content into the document as a new html element
                var $clone = $(document.importNode(content,true));

                $clone.find("img").attr("src", element.thumbnail_src);
                $clone.find(".likes").append(element.likes.count);
                $clone.find(".comments").append(element.comments.count);
                $clone.find("a").attr("href", function(){ return $(this).attr("href") + element.code });

                $insta_widget.append($clone);
            });

            $insta_widget.append(
                '<div class="footing"><a href="https://instagram.com/' +
                 response.user.username +
                 '/" target="_blank"><h2>See More</h2></a></div>'
            );

            /* User Info */
            var user = response.user;

            $insta_widget.append(
                '<div class="user-info"><img src="' +
                user.profile_pic_url +
                '" /> ' + user.full_name +
                ' / ' + user.followed_by.count +
                ' followers / ' + user.media.count +
                ' posts</div>'
            );

        } catch(e){
            console.log(e.message);
        }
    });
});
