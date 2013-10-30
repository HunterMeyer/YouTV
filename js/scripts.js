var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/player_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
  var player;
  
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: $(window).height(),
      width: $(window).width(),
      videoId: '9RjJ6Og6lVc',
      playerVars: {
        controls: 0,
        showinfo: 0,
        modestbranding: 1,
        wmode: 'transparent'
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }

  function onPlayerStateChange(event) {
    if (event.data === 0) {
      $("#nextVideo").trigger('click');
    } else if (event.data === 2) {
      $("#play").show();
      $("#pause").hide();
    } else if (event.data === 1) {
      $("#pause").show();
      $("#play").hide();
    }
  }

  function loadVideo(videoID) {
    player.loadVideoById(videoID); 
  }

  function onPlayerReady(event) {
    event.target.playVideo();
  }

  function nextVideo() {
    player.loadVideoById(videoID);
  }

  function prevVideo() {
    player.loadVideoById(videoID);
  }

  function playVideo() {
    player.playVideo();
  }

  function pauseVideo() {
    player.pauseVideo();
  }

  $(function() {
    var index = 0
    var videoIDs = [];
    $("form#search-youtube").submit(function() {
      var request = $("input#search-item").val();
      $.get("https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=" + request + "&key=AIzaSyDzYngwogk7xB6_35qRl3lsGrReDZ76fy4&order=viewCount")
      .done(function(responseText) {
        responseText.items.forEach(function(video) {
          videoIDs.unshift(video.id.videoId);
        });
      })
      .done(function() {
        loadVideo(videoIDs[index]);
      });
      $("#search-item").val("");
      return false;
    });

    $("#nextVideo").click(function() {
      loadVideo(videoIDs[index+1]);
      index++;
    });

    // $("#movies").click(function() {
    //   $.get("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&key=AIzaSyDzYngwogk7xB6_35qRl3lsGrReDZ76fy4&playlistId=PL630A871915194939")
    //   .done(function(responseContent) {
    //     responseContent.items.forEach(function(content) {
    //       $("#movie-list").append("<p id=" + content.snippet.resourceId.videoId + ">" + content.snippet.title + "</p>"); 
    //     });
    //   })
    //   .done(function() {
    //     $("#movie-list").fadeIn(400);
    //   })
    //   .done(function() {
    //     $("#movie-list p").click(function() {
    //       var theVideoId = $(this).attr("id");
    //       $("#movie-list").fadeOut(400);
    //       loadVideo(theVideoId);
    //     });
    //   });
    // });

    // $("#close").click(function() {
    //   $("#movie-list").fadeOut(400);
    // });

    // $("#close2").click(function() {
    //   $("#docu-list").fadeOut(400);
    // });

    // $("#docus").click(function() {
    //   $.get("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&key=AIzaSyDzYngwogk7xB6_35qRl3lsGrReDZ76fy4&playlistId=PL413299DC95044CED")
    //   .done(function(responseContent) {
    //     responseContent.items.forEach(function(content) {
    //       $("#docu-list").append("<p id=" + content.snippet.resourceId.videoId + ">" + content.snippet.title + "</p>"); 
    //     });
    //   })
    //   .done(function() {
    //     $("#docu-list").fadeIn(400);
    //   })
    //   .done(function() {
    //     $("#docu-list p").click(function() {
    //       var theVideoId = $(this).attr("id");
    //       $("#docu-list").fadeOut(400);
    //       loadVideo(theVideoId);
    //     });
    //   });
    // });

    $("#prevVideo").click(function() {
      loadVideo(videoIDs[index-1]);
      index--;
    });

    $("#play").hover(function() {
      $(this).val("play");
    });

    $("#play").mouseout(function() {
      $(this).val(">");
    });

    $("#pause").hover(function() {
      $(this).val("pause");
    });
    
    $("#pause").mouseout(function() {
      $(this).val("ll");
    });

    $("#nextVideo").hover(function() {
      $(this).val("next");
    });
    
    $("#nextVideo").mouseout(function() {
      $(this).val(">>");
    });

    $("#prevVideo").hover(function() {
      $(this).val("prev");
    });
    
    $("#prevVideo").mouseout(function() {
      $(this).val("<<");
    });

    $("#about").hover(function() {
      $(this).val("about");
    });

    $("#about").mouseout(function() {
      $(this).val("?");
    });

    $("#about").click(function() {
      $("#myModal").modal('show');
      $("#pause").trigger('click');
    });

    $("#modal-close").click(function() {
      $("#play").trigger('click');
    });
  });