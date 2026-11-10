/**
 * LIA — A Little World of Magic
 * Ambient Music Player (Web Audio API Synthesizer + Optional MP3 fallback).
 *
 * User-controlled only: strictly silent until the user clicks the music toggle.
 * By default creates a warm, cinematic ambient pad using Web Audio oscillators.
 * If an MP3 exists at assets/audio/birthday-music.mp3, it plays that track smoothly.
 */
(function () {
  "use strict";

  const LiaAudio = {
    ctx: null,
    masterGain: null,
    synthNodes: [],
    audioEl: null,
    playing: false,
    usingMp3: false,
    mp3Path: "assets/audio/birthday-music.mp3",

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

    async playMp3() {
                    if (!this.audioEl) {
                      this.audioEl = new Audio(this.mp3Path);
                      this.audioEl.loop = true;
                      this.audioEl.volume = 0.45;
                    }
                    try {
                      await this.audioEl.play();
                      this.playing = true;
                      this.usingMp3 = true;
                      return true;
                    } catch (e) {
                      this.usingMp3 = false;
                      return false;
                    }
                  },

                    stopMp3() {
                      if (this.audioEl) {
                        this.audioEl.pause();
                      }
                      this.playing = false;
                    },

    async play() {
                          // First check if MP3 can be loaded, otherwise fallback gracefully to synth
                          if (!this.usingMp3 && !this.audioEl) {
                            try {
                            const resp = await fetch(this.mp3Path, { method: "HEAD" });
                            if (resp.ok) {
                              const started = await this.playMp3();
                              if (started) return true;
                            }
                          } catch (e) {
                            // No MP3 available, use synth
                          }
                        } else if (this.usingMp3 && this.audioEl) {
                          return this.playMp3();
                        }

                      return this.playSynth();
                    },

                    stop() {
                      if (this.usingMp3) {
                        this.stopMp3();
                      } else {
                        this.stopSynth();
                      }
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
