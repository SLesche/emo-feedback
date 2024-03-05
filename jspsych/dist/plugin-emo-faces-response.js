var emoFaces = (function (jspsych) {
    'use strict';
  
    const info = {
        name: "emo-faces-response",
        parameters: {
            /** The image to be displayed */
            stimulus: {
                type: jspsych.ParameterType.IMAGE,
                pretty_name: "Stimulus",
                default: undefined,
            },
            /** Set the image height in pixels */
            stimulus_height: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Image height",
                default: null,
            },
            /** Set the image width in pixels */
            stimulus_width: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Image width",
                default: null,
            },
            /** Maintain the aspect ratio after setting width or height */
            line_height: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Line height",
                default: null,
            },

            line_wight: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Line width",
                default: null,
            },

            maintain_aspect_ratio: {
                type: jspsych.ParameterType.BOOL,
                pretty_name: "Maintain aspect ratio",
                default: true,
            },
            /** Array containing the key(s) the subject is allowed to press to respond to the stimulus. */
            choices: {
                type: jspsych.ParameterType.KEYS,
                pretty_name: "Choices",
                default: "ALL_KEYS",
            },
            /** Any content here will be displayed below the stimulus. */
            prompt: {
                type: jspsych.ParameterType.HTML_STRING,
                pretty_name: "Prompt",
                default: null,
            },
            /** How long to show the stimulus. */
            stimulus_duration: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Stimulus duration",
                default: null,
            },
            /** How long to show trial before it ends */
            trial_duration: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Trial duration",
                default: null,
            },
            /** If true, trial will end when subject makes a response. */
            response_ends_trial: {
                type: jspsych.ParameterType.BOOL,
                pretty_name: "Response ends trial",
                default: true,
            },
            /**
             * If true, the image will be drawn onto a canvas element (prevents blank screen between consecutive images in some browsers).
             * If false, the image will be shown via an img element.
             */
            render_on_canvas: {
                type: jspsych.ParameterType.BOOL,
                pretty_name: "Render on canvas",
                default: true,
            },
        },
    };
    class emoFacesPlugin {
        constructor(jsPsych) {
            this.jsPsych = jsPsych;
        }
        trial(display_element, trial) {
            var height, width;
            if (trial.render_on_canvas) {
                var image_drawn = false;
                // first clear the display element (because the render_on_canvas method appends to display_element instead of overwriting it with .innerHTML)
                if (display_element.hasChildNodes()) {
                    // can't loop through child list because the list will be modified by .removeChild()
                    while (display_element.firstChild) {
                        display_element.removeChild(display_element.firstChild);
                    }
                }
                // create canvas element and image
                var canvas = document.createElement("canvas");
                canvas.id = "jspsych-emo-faces-response-stimulus";
                canvas.style.margin = "0";
                canvas.style.padding = "0";
                var ctx = canvas.getContext("2d");
                var img = new Image();
                img.onload = () => {
                    // if image wasn't preloaded, then it will need to be drawn whenever it finishes loading
                    if (!image_drawn) {
                        getHeightWidth(); // only possible to get width/height after image loads
                        ctx.drawImage(img, 0, 0, width, height);
                        draw_red_lines();
                    }
                };
                img.src = trial.stimulus;
                // get/set image height and width - this can only be done after image loads because uses image's naturalWidth/naturalHeight properties
                const getHeightWidth = () => {
                    if (trial.stimulus_height !== null) {
                        height = trial.stimulus_height;
                        if (trial.stimulus_width == null && trial.maintain_aspect_ratio) {
                            width = img.naturalWidth * (trial.stimulus_height / img.naturalHeight);
                        }
                    }
                    else {
                        height = img.naturalHeight;
                    }
                    if (trial.stimulus_width !== null) {
                        width = trial.stimulus_width;
                        if (trial.stimulus_height == null && trial.maintain_aspect_ratio) {
                            height = img.naturalHeight * (trial.stimulus_width / img.naturalWidth);
                        }
                    }
                    else if (!(trial.stimulus_height !== null && trial.maintain_aspect_ratio)) {
                        // if stimulus width is null, only use the image's natural width if the width value wasn't set
                        // in the if statement above, based on a specified height and maintain_aspect_ratio = true
                        width = img.naturalWidth;
                    }
                    canvas.height = height;
                    canvas.width = width;
                };
                getHeightWidth(); // call now, in case image loads immediately (is cached)
                // add canvas and draw image
                display_element.insertBefore(canvas, null);
                if (img.complete && Number.isFinite(width) && Number.isFinite(height)) {
                    // if image has loaded and width/height have been set, then draw it now
                    // (don't rely on img onload function to draw image when image is in the cache, because that causes a delay in the image presentation)
                    ctx.drawImage(img, 0, 0, width, height);
                    image_drawn = true;
                }
                // add prompt if there is one
                if (trial.prompt !== null) {
                    display_element.insertAdjacentHTML("beforeend", trial.prompt);
                }
            }
            else {
                // display stimulus as an image element
                var html = '<img src="' + trial.stimulus + '" id="jspsych-emo-faces-response-stimulus">';
                // add prompt
                if (trial.prompt !== null) {
                    html += trial.prompt;
                }

                // update the page content
                display_element.innerHTML = html;
                // set image dimensions after image has loaded (so that we have access to naturalHeight/naturalWidth)
                var img = display_element.querySelector("#jspsych-emo-faces-response-stimulus");
                if (trial.stimulus_height !== null) {
                    height = trial.stimulus_height;
                    if (trial.stimulus_width == null && trial.maintain_aspect_ratio) {
                        width = img.naturalWidth * (trial.stimulus_height / img.naturalHeight);
                    }
                }
                else {
                    height = img.naturalHeight;
                }
                if (trial.stimulus_width !== null) {
                    width = trial.stimulus_width;
                    if (trial.stimulus_height == null && trial.maintain_aspect_ratio) {
                        height = img.naturalHeight * (trial.stimulus_width / img.naturalWidth);
                    }
                }
                else if (!(trial.stimulus_height !== null && trial.maintain_aspect_ratio)) {
                    // if stimulus width is null, only use the image's natural width if the width value wasn't set
                    // in the if statement above, based on a specified height and maintain_aspect_ratio = true
                    width = img.naturalWidth;
                }
                img.style.height = height.toString() + "px";
                img.style.width = width.toString() + "px";
            }
            // store response
            var response = {
                rt: null,
                key: null,
            };

            const draw_red_lines = () => {
                // Get canvas element
                const canvas = document.getElementById("jspsych-emo-faces-response-stimulus");
                
                // Get canvas context
                const ctx = canvas.getContext("2d");

                // Define center coordinates of the canvas
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;

                // Draw horizontal red line
                ctx.beginPath();
                ctx.moveTo(centerX - (trial.line_width/2), centerY);
                ctx.lineTo(centerX + (trial.line_width/2), centerY);
                ctx.strokeStyle = 'red';
                ctx.line_width = trial.line_width;
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(centerX, centerY - (trial.line_height / 2));
                ctx.lineTo(centerX, centerY + (trial.line_height / 2));
                ctx.strokeStyle = 'red';
                ctx.line_width = trial.line_width;
                ctx.stroke();
            };

            draw_red_lines();

            const display_mask = () => {
                // Get canvas element
                const canvas = document.getElementById("jspsych-emo-faces-response-stimulus");

                // Set background
                canvas.style.background = "darkgrey";

                // Get canvas context
                const ctx = canvas.getContext("2d");

                // Clear canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Generate and draw random cubic functions
                // Generate and draw random lines
                for (let i = 0; i < 50; i++) {
                    const startX = Math.random() * canvas.width;
                    const startY = Math.random() * canvas.height;
                    const endX = Math.random() * canvas.width;
                    const endY = Math.random() * canvas.height;
                    
                    // Determine if this line should connect to another line
                    const connectLine = Math.random() < 0.5; // Adjust probability as needed

                    if (connectLine) {
                        // If connecting, generate another line with shared endpoint
                        const otherStartX = startX;
                        const otherStartY = startY;
                        const otherEndX = Math.random() * canvas.width;
                        const otherEndY = Math.random() * canvas.height;

                        ctx.beginPath();
                        ctx.moveTo(startX, startY);
                        ctx.lineTo(otherEndX, otherEndY);
                        ctx.strokeStyle = 'red';
                        ctx.lineWidth = 2;
                        ctx.stroke();

                        // Draw the other line
                        ctx.beginPath();
                        ctx.moveTo(otherStartX, otherStartY);
                        ctx.lineTo(endX, endY);
                        ctx.strokeStyle = 'red';
                        ctx.lineWidth = 2;
                        ctx.stroke();
                    } else {
                        // If not connecting, draw a single line
                        ctx.beginPath();
                        ctx.moveTo(startX, startY);
                        ctx.lineTo(endX, endY);
                        ctx.strokeStyle = 'red';
                        ctx.lineWidth = 2;
                        ctx.stroke();
                    }
                }
            };

            // function to end trial when it is time
            const end_trial = () => {
                // kill any remaining setTimeout handlers
                this.jsPsych.pluginAPI.clearAllTimeouts();
                // kill keyboard listeners
                if (typeof keyboardListener !== "undefined") {
                    this.jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
                }
                // gather the data to store for the trial
                var trial_data = {
                    rt: response.rt,
                    stimulus: trial.stimulus,
                    response: response.key,
                };
                // clear the display
                display_element.innerHTML = "";
                // move on to the next trial
                this.jsPsych.finishTrial(trial_data);
            };
            // function to handle responses by the subject
            var after_response = (info) => {
                // after a valid response, the stimulus will have the CSS class 'responded'
                // which can be used to provide visual feedback that a response was recorded
                display_element.querySelector("#jspsych-emo-faces-response-stimulus").className +=
                    " responded";
                // only record the first response
                if (response.key == null) {
                    response = info;
                }
                if (trial.response_ends_trial) {
                    end_trial();
                }
            };
            // start the response listener
            if (trial.choices != "NO_KEYS") {
                var keyboardListener = this.jsPsych.pluginAPI.getKeyboardResponse({
                    callback_function: after_response,
                    valid_responses: trial.choices,
                    rt_method: "performance",
                    persist: false,
                    allow_held_key: false,
                });
            }
            // mask stimulus if stimulus_duration is set
            if (trial.mask_duration !== null) {
                this.jsPsych.pluginAPI.setTimeout(() => {
                    // Here, display the mask
                    display_mask();
                }, trial.stimulus_duration);
            }

            // hide stimulus if stimulus_duration is set
            if (trial.stimulus_duration !== null && trial.mask_duration !== null) {
                this.jsPsych.pluginAPI.setTimeout(() => {
                    // Here, display the mask
                    display_element.querySelector("#jspsych-emo-faces-response-stimulus").style.visibility = "hidden";
                }, trial.stimulus_duration + trial.mask_duration);
            }

            // end trial if trial_duration is set
            if (trial.trial_duration !== null) {
                this.jsPsych.pluginAPI.setTimeout(() => {
                    end_trial();
                }, trial.trial_duration);
            }
            else if (trial.response_ends_trial === false) {
                console.warn("The experiment may be deadlocked. Try setting a trial duration or set response_ends_trial to true.");
            }
        }
        simulate(trial, simulation_mode, simulation_options, load_callback) {
            if (simulation_mode == "data-only") {
                load_callback();
                this.simulate_data_only(trial, simulation_options);
            }
            if (simulation_mode == "visual") {
                this.simulate_visual(trial, simulation_options, load_callback);
            }
        }
        simulate_data_only(trial, simulation_options) {
            const data = this.create_simulation_data(trial, simulation_options);
            this.jsPsych.finishTrial(data);
        }
        simulate_visual(trial, simulation_options, load_callback) {
            const data = this.create_simulation_data(trial, simulation_options);
            const display_element = this.jsPsych.getDisplayElement();
            this.trial(display_element, trial);
            load_callback();
            if (data.rt !== null) {
                this.jsPsych.pluginAPI.pressKey(data.response, data.rt);
            }
        }
        create_simulation_data(trial, simulation_options) {
            const default_data = {
                stimulus: trial.stimulus,
                rt: this.jsPsych.randomization.sampleExGaussian(500, 50, 1 / 150, true),
                response: this.jsPsych.pluginAPI.getValidKey(trial.choices),
            };
            const data = this.jsPsych.pluginAPI.mergeSimulationData(default_data, simulation_options);
            this.jsPsych.pluginAPI.ensureSimulationDataConsistency(trial, data);
            return data;
        }
    }
    emoFacesPlugin.info = info;
  
    return emoFacesPlugin;
  
  })(jsPsychModule);
  