/**
 * Soft ambient pad via Web Audio API — no external files required.
 * User-controlled only (starts muted).
 */
(function () {
  const AudioAmbient = {
    ctx: null,
    master: null,
    nodes: [],
    playing: false,

    async ensure() {
      if (this.ctx) return;
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;

      this.ctx = new Ctx();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0;
      this.master.connect(this.ctx.destination);

      const freqs = [110, 164.81, 220, 329.63];
      freqs.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = i % 2 === 0 ? "sine" : "triangle";
        osc.frequency.value = freq;

        filter.type = "lowpass";
        filter.frequency.value = 900;

        gain.gain.value = 0.03 + i * 0.008;

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.master);
        osc.start();

        this.nodes.push({ osc, gain, filter });
      });
    },

    async play() {
      await this.ensure();
      if (!this.ctx) return false;
      if (this.ctx.state === "suspended") await this.ctx.resume();

      const now = this.ctx.currentTime;
      this.master.gain.cancelScheduledValues(now);
      this.master.gain.setValueAtTime(this.master.gain.value, now);
      this.master.gain.linearRampToValueAtTime(0.085, now + 1.4);
      this.playing = true;
      return true;
    },

    stop() {
      if (!this.ctx || !this.master) return;
      const now = this.ctx.currentTime;
      this.master.gain.cancelScheduledValues(now);
      this.master.gain.setValueAtTime(this.master.gain.value, now);
      this.master.gain.linearRampToValueAtTime(0, now + 0.8);
      this.playing = false;
    },

    async toggle() {
      if (this.playing) {
        this.stop();
        return false;
      }
      return this.play();
    }
  };

  window.LiaAudio = AudioAmbient;
})();
