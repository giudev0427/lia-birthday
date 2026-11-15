/**
 * LIA — A Little World of Magic
 * Ambient Music Player (local Web Audio API synthesizer).
 *
 * Attempts to start on entry and falls back to a visible user control when
 * browser autoplay policies require an interaction.
 * Creates a warm, original ambient pad using browser-native oscillators.
 */
(function () {
  "use strict";

  const LiaAudio = {
    ctx: null,
    masterGain: null,
    synthNodes: [],
    playing: false,

      /**
       * Set up the audio graph for the synthesized ambient pad
       */
      initSynth() {
        if (this.ctx) return;
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;

                this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);

      // Warm romantic chord (A minor 9th / C major 7th ethereal harmonics: 110Hz, 164.81Hz, 220Hz, 329.63Hz)
      const frequencies = [110.0, 164.81, 220.0, 329.63];
        frequencies.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const oscGain = this.ctx.createGain();
          const filter = this.ctx.createBiquadFilter();

            osc.type = idx % 2 === 0 ? "sine" : "triangle";
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

            filter.type = "lowpass";
            filter.frequency.setValueAtTime(880, this.ctx.currentTime);
            filter.Q.setValueAtTime(1.2, this.ctx.currentTime);

            oscGain.gain.setValueAtTime(0.025 + idx * 0.008, this.ctx.currentTime);

            osc.connect(filter);
            filter.connect(oscGain);
            oscGain.connect(this.masterGain);

              osc.start();
              this.synthNodes.push({ osc, oscGain, filter });
            });
          },

    async playSynth() {
              this.initSynth();
              if (!this.ctx) return false;

                if (this.ctx.state === "suspended") {
                  await this.ctx.resume();
                }
                if (this.ctx.state !== "running") {
                  return false;
                }

                const now = this.ctx.currentTime;
                this.masterGain.gain.cancelScheduledValues(now);
                this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
                this.masterGain.gain.linearRampToValueAtTime(0.09, now + 1.2);
                this.playing = true;
                return true;
              },

                stopSynth() {
                  if (!this.ctx || !this.masterGain) return;
                  const now = this.ctx.currentTime;
                  this.masterGain.gain.cancelScheduledValues(now);
                  this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
                  this.masterGain.gain.linearRampToValueAtTime(0, now + 0.8);
                  this.playing = false;
                },

    async play() {
                      try {
                        return await this.playSynth();
                      } catch (e) {
                        this.playing = false;
                        return false;
                      }
                    },

                    stop() {
                      this.stopSynth();
                    },

    async toggle() {
                          if (this.playing) {
                            this.stop();
                            return false;
                          }
                          return this.play();
                        }
                      };

                      window.LiaAudio = LiaAudio;
                    })();
