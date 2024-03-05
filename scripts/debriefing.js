// here debriefing
const debriefing = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<p class = "normal-text">Vielen Dank für deine Teilnahme!</p>',
    data: {type: 'instructions'},
    on_start: function() {
      jsPsych.data.get().localSave('csv', experiment_file);
        }
  }