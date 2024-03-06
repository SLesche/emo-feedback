function get_random_samples_from_list(list, n) {
    jsPsych.randomization.sampleWithoutReplacement(list, n);
    return jsPsych.randomization.sampleWithoutReplacement(list, n);
}
function get_random_rt(mean_rt){
    const sd_rt = 100;
    const tau = 300;
    return jsPsych.randomization.sampleExGaussian(mean_rt, sd_rt, tau, positive = true)
}

function visualAngleToPixels(visualAngle) {
    const viewingDistance = 60;
    // Convert visual angle from degrees to radians
    var visualAngleRad = visualAngle * Math.PI / 180;

    // Get the screen height in pixels
    var screenHeight = window.innerHeight;

    // Calculate the size in pixels using the tangent function
    var sizeInPixels = 2 * Math.tan(visualAngleRad / 2) * viewingDistance;

    // Convert size to pixels based on screen height
    var pixelsPerDegree = screenHeight / (2 * Math.tan((Math.PI / 180) / 2));
    var sizeInPixelsScaled = sizeInPixels * pixelsPerDegree;

    return sizeInPixelsScaled;
}

function get_correct(longer_line, response_mapping){
    return response_mapping[longer_line]
}