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
    var promise = $.getJSON("https://www.instagram.com/vivaosolshop/?__a=1");
    promise.done(function(response){
        try{
            // 1. Find the template html element on the page
            var $ig_image_template = $('#ig_image_template');

            // 2. Get the "content" prop'erty from the $template variable
            var content = $ig_image_template.prop('content');
            
            // 3. Get the data 
            var nodes = response.user.media.nodes.slice(0,12);

            // 4. Find the widget html element on the page
            var $insta_widget = $('#insta-widget');
            
             // 5. Determine the display size of the widget and how many
             //    boxes to display
            var widget_size = $insta_widget.attr("class");
             if(widget_size === "widget-small"){
                nodes = nodes.slice(0,6);
            } 
            
            // 6. Deletes the "Loading..." message
            $insta_widget.find(".body").html("");

            // 7. Process and display the data
            nodes.forEach(function(element){
                // 7.1 Importing the templates content into the document as a new html element
                var $clone = $(document.importNode(content,true));
                
                // 7.2 Adds the image into the display box
                $clone.find("img").attr("src", element.thumbnail_src);
                
                // 7.3 Add the likes and comments onto the display box
                $clone.find(".likes").append(shortenLargeNumber(element.likes.count));
                $clone.find(".comments").append(shortenLargeNumber(element.comments.count));
                
                // 7.4 Add the caption onto the display box
                // $clone.find(".caption").append(element.caption);
                
                // 7.5 Turn each display box into a link to the original instagram page
                $clone.find("a").attr("href", function(){ return $(this).attr("href") + element.code });

                // 7.6 Display each image/display box in the widget
                $insta_widget.find(".body").append($clone);
            });
            
            // 8. Uses the display size of the widget to determine 
            // the max image display size 
            if(widget_size === "widget-small"){
                $(".box").addClass("col-lg-2");
            }

            // 9. Adds the footing at the bottom of the widget
            var instagram_url = "https://instagram.com/" + response.user.username;
            $insta_widget.find(".footing a").attr("href",instagram_url);

            var user = response.user;
            var $user_info = $insta_widget.find(".user-info");
            $user_info.find("img").attr("src", user.profile_pic_url);
            $user_info.find(".full-name").text(user.full_name);
            $user_info.find(".follower-count").text(shortenLargeNumber(user.followed_by.count));
            $user_info.find(".post-count").text(shortenLargeNumber(user.media.count));

            // 10. Finishes loading all the data into the widget 
            $insta_widget.addClass("loaded");
        } catch(e){
            console.log(e.message);
        }
    });
});