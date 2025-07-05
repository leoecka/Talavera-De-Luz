
  class Sound {

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
            rndSample.play();
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