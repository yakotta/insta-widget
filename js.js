$(document).ready(function(){
    // https://stackoverflow.com/questions/9461621/how-to-format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900-in-javascrip
    function shortenLargeNumber(num) {
        var units = ['k', 'M', 'G'],
        decimal;

        for(var i=units.length-1; i>=0; i--) {
            decimal = Math.pow(1000, i+1);

            if(num <= -decimal || num >= decimal) {
                var places = num.toString().length;
                if (places % 3 === 0){
                    return +(num / decimal).toFixed(0) + units[i];
                } else {
                    return +(num / decimal).toFixed(1) + units[i];
                }
            }
        }

        return num;
    }

    // Look here at this: http://api.jquery.com/jQuery.getJSON/#jQuery-getJSON-url-data-success
    var promise = $.getJSON("https://www.instagram.com/instagram/?__a=1");
    promise.done(function(response){
        try{
            // 1. Find the template html element on the page
            var $ig_image_template = $('#ig_image_template');

            // 2. get the "content" prop'erty from the $template variable
            var content = $ig_image_template.prop('content');

            var nodes = response.user.media.nodes.slice(0,12);

            // 2.5 determine the size of the template
            /* var template_size = $ig_image_template.attr("class");
            console.log(template_size);

            if(template_size === "widget-small"){
                nodes = nodes.slice(0,6);
                $(".box").addClass("col-lg-2");
            } */

            var $insta_widget = $('#insta-widget');

            nodes.forEach(function(element){
                // 3. importing the templates content into the document as a new html element
                var $clone = $(document.importNode(content,true));

                $clone.find("img").attr("src", element.thumbnail_src);
                $clone.find(".likes").append(shortenLargeNumber(element.likes.count));
                $clone.find(".comments").append(shortenLargeNumber(element.comments.count));
                $clone.find(".caption").append(element.caption);
                console.log(element.caption);
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
                ' / ' + shortenLargeNumber(user.followed_by.count) +
                ' followers / ' + shortenLargeNumber(user.media.count) +
                ' posts</div>'
            );

        } catch(e){
            console.log(e.message);
        }
    });
});
