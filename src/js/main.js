jQuery(document).ready(function($){

  // store player data from request
  let player_data;

  // new match data to be sent to server
  let new_match_data = new Array();

  function loadScores() {

    $.ajax({
      url: JS_OBJ.site_url + '/wp-json/scores/v1/scores/',
      method: 'GET',
      dataType: 'json',
      cache: false,
      success: function( data ){

        player_data = data;

        for (var i = 0; i < data.length; i++) {
          $('.score-container').append( scoreCard( data[i], i+1 ) );
        }

      }
    });

  }
  loadScores();

  function scoreCard( data, position ){

    let id = data.player_details.id;
    let img = data.player_details.image;
    let name = data.player_details.name;
    let pos = ordinal_suffix_of( position );

    let fp = data.score.fp;
    let fp_pct = data.score.fp_pct;
    let mp = data.score.mp;
    let mp_pct = data.score.mp_pct;

    let card = `<div class="score-card" data-player-id="${id}">
                  <div class="score-card__player-details">
                    <div class="player-details__group">
                      <img src="${img}" alt="${name}" />
                      <h2>${name}</h2>
                    </div>
                    <span class="position counter">${pos}</span>
                  </div>
                  <div class="score-card__player-scores">
                    <div class="player-scores__group player-scores__group-fp">
                      <span class="score"><span class="score-num score-fp" data-count="${fp}">${fp}</span><sup>FP</sup></span>
                      <span class="score"><span class="score-num score-fp-pct" data-count="${fp_pct}">${fp_pct}</span><sup>%</sup></span>
                    </div>
                    <div class="player-scores__group player-scores__group-mp">
                      <span class="score"><span class="score-num score-mp" data-count="${mp}">${mp}</span><sup>MP</sup></span>
                      <span class="score"><span class="score-num score-mp-pct" data-count="${mp_pct}">${mp_pct}</span><sup>%</sup></span>
                    </div>
                  </div>
               </div>`;
    return card;
  }

  function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "<sup>st</sup>";
    }
    if (j == 2 && k != 12) {
        return i + "<sup>nd</sup>";
    }
    if (j == 3 && k != 13) {
        return i + "<sup>rd</sup>";
    }
    return i + "<sup>th</sup>";
  }

  $('body').on('click', 'button.button--new-match', function(){

    // init new_match_data object (hardcoded for the time being)
    // this would be dynamically created based on the players selected for the match,
    // but as it is just 2 players and most likely wont be more, I will leave it hardcoded
    new_match_data.push(
      {
        id: 1,
        score: {
          fp: 0,
          mp: 0
        }
      },
      {
        id: 2,
        score: {
          fp: 0,
          mp: 0
        }
      }
    );

    new_match_data.push();

    let $this = $(this);

    $this.removeClass('button--new-match');
    $this.addClass('button--confirm-match');

    $this.attr('disabled', true);

    $this.text('Confirm Match');

    for (var i = 0; i < player_data.length; i++) {
      $('.new-match-container').append( newMatchCard(player_data[i]) );
    }

    $('.score-container').addClass('fade');
    $('.new-match-container').removeClass('hide');

    setTimeout(function(){
      $('.score-container').addClass('hide');
      $('.new-match-container').removeClass('fade');
    }, 250);

  });

  function newMatchCard( data ) {

    let id = data.player_details.id;
    let img = data.player_details.image;
    let name = data.player_details.name;

    let card = `<div class="score-card score-card--new-match" data-player-id="${id}">
                  <div class="score-card__player-details">
                    <div class="player-details__group">
                      <img src="${img}" alt="${name}" />
                      <h2>${name}</h2>
                    </div>
                    <span class="frame-point"><span class="score" data-score="0">0</span><sup>FP</sup></span>
                  </div>
                  <div class="score-card__button-group">
                    <button class="score-button score-button--minus" disabled="disabled">-</button>
                    <button class="score-button score-button--plus">+</button>
                  </div>
               </div>`;
    return card;

  }

  $('body').on('click', '.score-button', function(){

    let $this = $(this);
    let id = $this.closest('.score-card').data('player-id');

    // current score
    let score_element = $this.closest('.score-card').find('.score');
    let score = parseInt(score_element.attr('data-score'));

    if ( $this.hasClass('score-button--plus') ) {
      score = score + 1;
    } else if ( $this.hasClass('score-button--minus') ) {
      score = score - 1;

      if ( score == 0 ) {
        $this.attr('disabled', true);
      }
    }

    if ( score > 0 ) {
      $this.siblings('.score-button--minus').attr('disabled', false);
    }

    score_element.text(score);
    score_element.attr('data-score', score);

    // find if there is already an entry with this player id
    let index = new_match_data.findIndex(x => x.id == id);

    // if does not exist, push new object to array
    if ( index === -1 ) {
      new_match_data.push({
        id: id,
        score: {
          fp: score,
          mp: 0
        }
      });
    } else {
      // else update that index with new score
      new_match_data[index].score.fp = score;
    }

    $('.button--confirm-match').attr('disabled', false);

    let player_id = $this.closest('.score-card').data('player-id');

  });

  $('body').on('click', '.button--confirm-match', function(){

    let $this = $(this);

    if ( new_match_data[0].score.fp !== new_match_data[1].score.fp ) {
      // find which player in array has the highest score
      let winner = new_match_data.reduce(function(prev, cur) {
        return (prev.score.fp > cur.score.fp) ? prev : cur;
      } );

      // based on object returned, use their ID to find the array index in the original array
      let index = new_match_data.findIndex(x => x.id == winner.id);

      // target the original array using the winning index and add a match point
      new_match_data[index].score.mp = 1;
    }

    $.ajax({
      url: JS_OBJ.site_url + '/wp-json/scores/v1/update-scores/',
      data: {
        scores: new_match_data
      },
      type: 'post',

      beforeSend: function() {
      },

      success: function(data) {
        new_match_data = [];

        $this.removeClass('button--confirm-match');
        $this.text('New Match');
        $this.addClass('button--new-match')

        $('.score-container').removeClass('hide');
        $('.new-match-container').addClass('fade');

        setTimeout(function(){
          $('.score-container').removeClass('fade');
          $('.new-match-container').addClass('hide');
          $('.new-match-container').empty();

          // update current cards
          for (var i = 0; i < data.length; i++) {

            let id = data[i].player_id;

            let card = $(`.score-card[data-player-id="${id}"]`);

            card.find('.score-fp').data('count', data[i].frame_points);
            card.find('.score-fp-pct').data('count', data[i].fp_pct);

            card.find('.score-mp').data('count', data[i].match_points);
            card.find('.score-mp-pct').data('count', data[i].mp_pct);

            animate_count($('.score-fp', card));
            animate_count($('.score-fp-pct', card), true);
            animate_count($('.score-mp', card));
            animate_count($('.score-mp-pct', card), true);

          }

        }, 250);

      },

      error: function() {
        console.log('failed!');
      }

    });

  });

  function animate_count( $el, is_decimal ) {
  	is_decimal = is_decimal || false;

    let new_num = $el.data('count');
    let org_num = parseInt($el.html());

  	jQuery({ counter: org_num }).animate({ counter: is_decimal ? parseFloat(new_num) : parseInt(new_num) }, {
  		duration: 1000,
  		easing: 'swing',
  		step: function () {
  			text = is_decimal ? this.counter.toFixed(2) : Math.ceil(this.counter);
  			$el.text(text);
  		}
  	});
  }

});
