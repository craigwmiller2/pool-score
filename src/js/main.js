jQuery(document).ready(function($){

  let player_data;

  function loadScores() {

    $.ajax({
      url: 'http://localhost:3000/pool-score/wp-json/scores/v1/scores',
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

    let img = data.player_details.image;
    let name = data.player_details.name;
    let pos = ordinal_suffix_of( position );

    let fp = data.score.fp;
    let fp_pct = data.score.fp_pct;
    let mp = data.score.mp;
    let mp_pct = data.score.mp_pct;

    let card = `<div class="score-card">
                  <div class="score-card__player-details">
                    <div class="player-details__group">
                      <img src="${img}" alt="${name}" />
                      <h2>${name}</h2>
                    </div>
                    <span class="position">${pos}</span>
                  </div>
                  <div class="score-card__player-scores">
                    <div class="player-scores__group player-scores__group-fp">
                      <span class="score">${fp}<sup>FP</sup></span>
                      <span class="score">${fp_pct}<sup>%</sup></span>
                    </div>
                    <div class="player-scores__group player-scores__group-mp">
                      <span class="score">${mp}<sup>MP</sup></span>
                      <span class="score">${mp_pct}<sup>%</sup></span>
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

});
