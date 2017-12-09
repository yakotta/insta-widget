$(document).ready(function(){
    // https://stackoverflow.com/questions/9461621/how-to-format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900-in-javascrip
    function shortenLargeNumber(num) {
        var units = ['k', 'M', 'G'];
        var decimal;

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
    var promise = $.getJSON("https://www.instagram.com/vivaosolshop/?__a=1");
    promise.done(function(response){
        try{
            // 1. Find the template html element on the page
            var $ig_image_template = $('#ig_image_template');

            // 2. Get the "content" prop'erty from the $ig_image_template variable
            var content = $ig_image_template.prop('content');

            // 3. Find the widget html element on the page
            var $insta_widget = $('#insta-widget');
            
            // 4. Determine whether the widget has "small" version enabled
            var is_small = $insta_widget.hasClass("widget-small");

            // 5. Determine the display size of the widget and how many
            //    boxes to display, either 6 or 12
            var items = is_small ? 6 : 12;
            
            // 6. Get the data
            var nodes = response.user.media.nodes.slice(0,items);

            // 7. Deletes the "Loading..." message
            $insta_widget.find(".body").html("");
            
            // 8. Process and display the data
            nodes.forEach(function(element){
                // 8.1 Importing the templates content into the document as a new html element
                $insta_widget.find(".body").append(document.importNode(content,true));
                // 8.2 Display each image/display box in the widget
                $clone = $insta_widget.find(".body").find(".insta-item:last-child");
                
                // 8.3 Adds the image into the display box
                $clone.find("img").attr("src", element.thumbnail_src);

                // 8.4 Add the likes and comments onto the display box
                $clone.find(".likes").append(shortenLargeNumber(element.likes.count));
                $clone.find(".comments").append(shortenLargeNumber(element.comments.count));

                // 8.5 Add the caption onto the display box
                // $clone.find(".caption").append(element.caption);

                // 8.6 Turn each display box into a link to the original instagram page
                $clone.find("a").attr("href", "https://instagram.com/p/" + element.code );
            });

            // 9. Uses the display size of the widget to determine 
            // the max image display size 
            if(is_small){
                $(".box").addClass("large--two-twelfths");
            }

            // 10. Adds the footing at the bottom of the widget
            var instagram_url = "https://instagram.com/" + response.user.username;
            $insta_widget.find(".footing a").attr("href",instagram_url);

            var user = response.user;
            var $user_info = $insta_widget.find(".user-info");
            $user_info.find("img").attr("src", user.profile_pic_url);
            $user_info.find(".full-name").text(user.full_name);
            $user_info.find(".follower-count").text(shortenLargeNumber(user.followed_by.count));
            $user_info.find(".post-count").text(shortenLargeNumber(user.media.count));

            // 11. Finishes loading all the data into the widget 
            $insta_widget.addClass("loaded");
        } catch(e){
            console.log(e.message);
        }
    });
});