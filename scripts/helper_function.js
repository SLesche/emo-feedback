function get_random_samples_from_list(list, n) {
    jsPsych.randomization.sampleWithoutReplacement(list, n);
    return jsPsych.randomization.sampleWithoutReplacement(list, n);
}
function get_random_rt(mean_rt){
    const sd_rt = 100;
    const tau = 300;
    return jsPsych.randomization.sampleExGaussian(mean_rt, sd_rt, tau, positive = true)
}