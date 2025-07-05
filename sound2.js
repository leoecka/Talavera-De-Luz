
  class Sound {

    constructor() {
    this.soundReady = {
      guitar: true,
      gc: true,
      hm: true,
      ss: true,
      tp: true
    };
     //this.reverb = new p5.Reverb();
  }
  

    getSound(tile) {
      if (tile.instrument === "guitar") {
        return this.guitar();
      } else if (tile.instrument === "GC") {
        return this.GC();
      } else if (tile.instrument === "HM") {
        return this.HM();
      } else if (tile.instrument === "SS") {
        return this.SS();
      } else if (tile.instrument === "TP") {
        return this.TP();
      } 
      return [];
    }

      guitar(){
        if (guitarSamples.length > 0) {
          let rndSample = random(guitarSamples);
          if (rndSample.isLoaded()) {
            let amp = random(0.3, 1.0); // z.B. 30–100% Lautstärke
            rndSample.setVolume(amp);
            this.soundReady.guitar = false;
          //this.reverb.process(rndSample, 1, 2);
            rndSample.play();
               rndSample.onended(() => {
            this.soundReady.guitar = true
           // print(this.soundReady.guitar)
      });
          }
      }
      }

      GC(){
        if (GC.length > 0) {
          let rndSample = random(GC);
          if (rndSample.isLoaded()) {
            let amp = random(0.3, 1.0); // z.B. 30–100% Lautstärke
            rndSample.setVolume(amp);
            rndSample.play();
          }
      }
      }

      HM(){
        if (HM.length > 0) {
          let rndSample = random(HM);
          if (rndSample.isLoaded()) {
            let amp = random(0.3, 1.0); // z.B. 30–100% Lautstärke
            rndSample.setVolume(amp);
            rndSample.play();
          }
      }
      }

      SS(){
        if (SS.length > 0) {
          let rndSample = random(SS);
          if (rndSample.isLoaded()) {
            let amp = random(0.3, 1.0); // z.B. 30–100% Lautstärke
            rndSample.setVolume(amp);
            rndSample.play();
          }
      }
      }

      TP(){
        if (TP.length > 0) {
          let rndSample = random(TP);
          if (rndSample.isLoaded()) {
            let amp = random(0.3, 1.0); // z.B. 30–100% Lautstärke
            rndSample.setVolume(amp);
            rndSample.play();
          }
      }
      }
  }