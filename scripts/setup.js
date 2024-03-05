let jsPsych = initJsPsych(
    /**
    {
        on_finish: function() {
            jsPsych.data.get().localSave('csv', experiment_file);
        },
    } 
    */  
);

const experiment_name = "My Task";
const experiment_short_name = "my_task";
let init_date = new Date();
    jsPsych.data.addProperties({
        date: ("0" + init_date.getDate()).slice(-2) + '_' + ("0" + (init_date.getMonth() + 1)).slice(-2) + '_' + init_date.getFullYear(),
        time: init_date.getHours() + "_" + init_date.getMinutes() + "_" + init_date.getSeconds(),
    });

let init_time = init_date.getFullYear() + "_" + (init_date.getMonth() + 1) + "_" + init_date.getDate() + "_" + init_date.getHours() + "_" + init_date.getMinutes() + "_" + init_date.getSeconds()
let timeline = [];

// IN the real experiment, 250 responses.
// 3*85 pro Block
const n_trials = 30; // 85
const n_blocks = 2;
const n_practice = 10; // 30

const trial_duration = 1000;
const stim_duration = 100;
const mask_duration = 200;
const feedback_dur = 450;
const rsi_duration = 500;
const fixation_dur = 200;

// Remove later
const subject_number = 1;

// init values
var trial_num = 0;
var block_num = 0;
var repeat_practice_now = 1;

var is_experimental = 0;

const possible_conditions = ["condition1", "condition2"];
const possible_response_keys = ["d", "l"];
const random_order = jsPsych.randomization.sampleWithoutReplacement(possible_conditions, 2);
const conditions = [random_order[0], "control", random_order[1]];
var current_condition = "experiment_begin";
const n_conditions = 3;
var icondition = 0;

// record the condition assignment in the jsPsych data
// this adds a property called 'subject' and a property called 'condition' to every trial
jsPsych.data.addProperties({
  subject: subject_number,
});

const experiment_file = "./data/" + experiment_short_name + "_" + subject_number + "_" + init_time + ".csv"
