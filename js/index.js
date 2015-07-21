
window.onload = function() {

    var oDiv = document.getElementById("roll-images");

    var screenWidth = document.documentElement.clientWidth || document.body.clientWidth;

    var oUl = oDiv.getElementsByTagName("ul")[0];

    var oLis = oUl.getElementsByTagName("li");

    oUl.style.width = oLis.length * screenWidth + "px";

    for(var i = 0; i < oLis.length; i++) {

        oLis[i].getElementsByTagName("img")[0].style.width = screenWidth + "px";
    }

    oDiv.style.height = oLis[0].getElementsByTagName("img")[0].offsetHeight + "px";

    var iNow = 0;

    document.ontouchmove = function(ev) {

        ev.preventDefault();
    };

    oUl.ontouchstart = function(ev) {

        var touch = ev.changedTouches[0];

        var downX = touch.pageX;

        var left = this.offsetLeft;

        var downTime = Date.now();

        this.ontouchmove = function(ev) {

            var touchmove = ev.changedTouches[0];

            var dis = touchmove.pageX - downX;

            this.style.left = left + dis + "px";
        };

        this.ontouchend = function(ev) {

            var touchend = ev.changedTouches[0];

            var cur = parseInt(getComputedStyle(this, false)["left"]);

            this.ontouchmove = null

            this.ontouchend = null;

            if(downX > touchend.pageX) { //<-

                if(iNow != oLis.length-1) {

                    if(((downX - touchend.pageX) > oLis[0].offsetWidth/2) || (Date.now() - downTime < 300) &&(downX - touchend.pageX) >30 ){
                        
                        iNow++;
                    }
                }

                startMove(this, "left", -iNow*oLis[0].offsetWidth);

            } else { //->

                if(iNow != 0) {

                    if((touchend.pageX - downX) > oLis[0].offsetWidth/2 || (Date.now() - downTime < 300) && (touchend.pageX - downX>30)) {

                        iNow--;
                    }
                }

                startMove(this, "left", -iNow*oLis[0].offsetWidth);
            }
        }
    };

    function startMove(element, type, target) {

        var cur = parseInt(getComputedStyle(element,false)[type]);

        var iSpeed = 8;

        if(cur > target) {

            iSpeed = - iSpeed;
        }

        clearInterval(element.timer);


        element.timer = setInterval(function() {

            cur = cur + iSpeed;

            if((iSpeed > 0 && cur < target) || (iSpeed < 0 && cur > target)) { //->

                element.style[type] = cur + "px";

            } else {

                element.style[type] = target + "px";

                clearInterval(element.timer);
            }

        }, 5);
    }
}
