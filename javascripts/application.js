/* Author: Martin Bravo, Base Design. [email] martin@basedesign.com
   Date: Feb 2013

*/


var XXX = (function (xxx, $, _) {

  xxx.settings = {
    initialized : false,
    throttle : true,
    siteRoot : '/'
  }
  xxx.data = {
    w : { width: 0, height : 0 }
  }
  xxx.cfg = {
    //if you want to set globel identifiers


  }

  // SMALL HELPER FOR BODY CLASS MATCHING
  xxx.is = function(classname){
    return $('body').hasClass(classname);
  }

  xxx.init = function(){
    if (xxx.settings.initialized) return false;
    $(document).ready(function(){
      xxx.modules.run('init');
      if(!Modernizr.touch) xxx.modules.run('clickInit');
      if(Modernizr.touch)  xxx.modules.run('touchInit');

      $(window).resize(function(){
        if (xxx.settings.throttle && undefined != _ ) {
          _.throttle(function(){
            xxx.modules.run('resize');
          }, 50)(); 
        } else {
          xxx.modules.run('resize');
        }
      });
       xxx.settings.initialized = true;
    });
    
   
  }

  xxx.fn = {
    calculateSize : function(){
      if (Modernizr.touch) xxx.fn.scrollToCurrent();
      xxx.data.w.width  = (Modernizr.touch) ? window.innerWidth  : $(window).width();
      xxx.data.w.height = (Modernizr.touch) ? window.innerHeight : $(window).height();
    },
     isVisible : function(el) {
      if (!el) return;
      var top = el.offsetTop,
          left = el.offsetLeft,
          width = el.offsetWidth,
          height = el.offsetHeight;
      while(el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
      }
      return (
        top < (window.pageYOffset + window.innerHeight) &&
        left < (window.pageXOffset + window.innerWidth) &&
        (top + height) > window.pageYOffset &&
        (left + width) > window.pageXOffset
      );
    },
    scrollTo : function(element, animate){
    if (arguments.length === 0) animate = false;
      var offset = $(element).offset(),
          margin = parseInt($(element).css('margin-top'),10);
      
      if (animate) {
        $("html,body").animate({
          scrollTop : offset.top - margin
        }, 500);
      } else {
        $("html,body").scrollTop(offset.top - margin);
      }
    },
    updateAddress : function(target){
      var url = target;
      $.address.value(url);
    },
    loadimages : function(){
      //this assumes there is a non-image object (i.e. figure) 
      // with a data-src attribute.
      // if a data-mobile-src is defined, will be used in mobile devices : )
      // mobile device is defined as a touch device with a screen width less than 640px

      $('#home figure.notloaded').each(function(){
        var $figure = $(this),
        src = (Modernizr.touch && xxx.data.w.width < 640 & undefined != $figure.data('mobile-src')) ? 'mobile-src' : "src";
        $figure.removeClass('notloaded').addClass('loading');
        var img = new Image();
        $(img).load(function () {
          $(this).hide();
          $figure.prepend(this);
          $(this).fadeIn('250', function(){
            $figure.removeClass('loading');
          });
        }).error(function () {
          console.log("loading error!!");
        }).attr('src', $figure.data(src));
      });
    }
  };


  xxx.modules = {
    //COMMON TASKS
    common : {
      init : function(){
        $.address.state(xxx.settings.siteRoot);
        xxx.fn.calculateSize();
      },
      resize : function(){
        xxx.fn.calculateSize();
      }
    },

    // SECTIONS

    home : {
      init : function(){
        // init stuff for navigation        
      },
      clickInit : function(){
        // specific things for touch interfaces
      },
      touchInit : function(){
        // specific things for touch interfaces
      },
      resize : function(){
        // do stuff when window resizes
      }
    },



    //GENERAL

    keys : {
      init : function(){
        if (key)
        key('up, pageup', function(){
          //on key up
          return false;

        });
        key('down, pagedown', function(){
          // on key down
          return false;
        });
        key('left', function(){
          // on key left
          return false;
        });
        key('right', function(){
          // on key left
          return false;
        });
      }
    },

    // HELPER TO RUN EACH MODULE
    run : function(group){
      for (module in xxx.modules) {
        if (_.isObject(xxx.modules[module]) && group in xxx.modules[module] && _.isFunction(xxx.modules[module][group]) ){
          // console.log('running: '+ module + " : " + group );
          xxx.modules[module][group]();
        }        
      }
    }
  }

xxx.init();
return xxx;

})(XXX || {}, jQuery, _); // load with jquery and underscore

