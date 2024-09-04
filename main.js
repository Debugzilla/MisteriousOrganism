// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)]; 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
}

// Factory function to create a new P. aequor object
const pAequorFactory = (num, mockStrand) => {
  let specimenNum = num;
  let dna = mockStrand();
  return {
    specimenNum,
    dna,

    mutate() {
      const randomIndex = Math.floor(Math.random() * this.dna.length); // Correct index calculation
      const currentBase = this.dna[randomIndex];

      const dnaBases = ['A', 'T', 'C', 'G'];
      const newBases = dnaBases.filter(base => base !== currentBase);

      const newBase = newBases[Math.floor(Math.random() * newBases.length)];

      this.dna[randomIndex] = newBase;

      return this.dna;
    },

    compareDNA(otherPAequor) { 
      let identicalBases = 0;

      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === otherPAequor.dna[i]) {
          identicalBases++;
        }
      }

      const percentage = (identicalBases / this.dna.length) * 100;

      console.log(`Specimen ${this.specimenNum} and specimen ${otherPAequor.specimenNum} have ${percentage.toFixed(2)}% DNA in common.`);    
    },

    willLikelySurvive() {
      const survivalBases = this.dna.filter(base => base === 'C' || base === 'G');
      const percentage = (survivalBases.length / this.dna.length) * 100;
      return percentage >= 60;
    }
  };
};

// Function to generate a number of surviving P. aequor instances
const survivingPAequor = (numberOfStrands) => {
  let survivalList = [];
  for (let i = 1; i <= numberOfStrands; i++) {
    let strandObj = pAequorFactory(i, mockUpStrand);
    while (!strandObj.willLikelySurvive()) {
      strandObj.mutate();
    }
    survivalList.push(strandObj);
  }
  return survivalList;
}

let testObj = pAequorFactory(1, mockUpStrand);
console.log(testObj);
console.log(testObj.mutate());
let otherObj = pAequorFactory(2, mockUpStrand);
testObj.compareDNA(otherObj);
console.log(testObj.willLikelySurvive());
const thirtyStrands = survivingPAequor(30);
console.log(thirtyStrands);

