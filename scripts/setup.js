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
const n_trials = 18; // 85
const n_blocks = 32;
const n_practice = 18; //30

const trial_duration = 1000;
const stim_duration = 100;
const mask_duration = 200;
const feedback_dur = 450;
const rsi_duration = 500;
const fixation_dur = 500;
const inter_trial_interval = 500;

// Remove later
const subject_number = 1;

// init values
var trial_num = 0;
var block_num = 0;
var repeat_practice_now = 1;

var is_experimental = 0;

const possible_cross_lengths = [30, 45, 60];
const aspect_ratio = 1.25;

// Set up person and emotion randomizer
const possible_emotions = ["happy", "sad", "disgusted", "neutral"];

// Function for range
const range = (start, stop, step = 1) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
const possible_subject_numbers = range(1, 16, 1);

for (inumber in possible_subject_numbers){
    if (possible_subject_numbers[inumber] < 10){
      possible_subject_numbers[inumber] = "00" + possible_subject_numbers[inumber];
    } else {
      possible_subject_numbers[inumber] = "0" + possible_subject_numbers[inumber];
    }
}

emo_images = {};

for (inumber in possible_subject_numbers){
    let imgs = [];
    for (iemotion in possible_emotions){
        imgs[iemotion] = "img/" + possible_emotions[iemotion] + "_" + possible_subject_numbers[inumber] + ".JPG"
    }
    emo_images[possible_subject_numbers[inumber]] = imgs;
}

const possible_images = [].concat.apply([], Object.values(emo_images));

var block_stimlist = [];

block_stimlist = [jsPsych.randomization.shuffle(possible_subject_numbers).concat(jsPsych.randomization.shuffle(possible_subject_numbers))];

// Set up response mapping
const possible_response_keys = ["h", "v"];
const possible_stimuli = [0, 1];
const response_mapping = {};

response_mapping[possible_stimuli[0]] = possible_response_keys[0];
response_mapping[possible_stimuli[1]] = possible_response_keys[1];

let task_instruction_message = "";

let letter_count = 1;

for (const stimulus in response_mapping) {
    const responseChar = response_mapping[stimulus];
    let line_instruction = "";
    if (stimulus == false){
        line_instruction = "Horizontal line is longer";
    } else {
        line_instruction = "Vertical line is longer";
    }

    task_instruction_message += `${line_instruction} -> Taste ${responseChar.toUpperCase()}`;

     // Add a newline after every 2 combinations
     if (++letter_count % 2 === 0) {
        task_instruction_message += "</br>";
    }
}  

// record the condition assignment in the jsPsych data
// this adds a property called 'subject' and a property called 'condition' to every trial
jsPsych.data.addProperties({
  subject: subject_number,
});

const experiment_file = "./data/" + experiment_short_name + "_" + subject_number + "_" + init_time + ".csv"
