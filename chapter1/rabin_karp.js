class RabinKarp {
  constructor(text, pattern) {
    this.text = text
    this.pattern = pattern
    this.prime = 101 // A prime number to reduce hash collisions
    this.charSetSize = 256 // Assuming ASCII characters
    this.results = []
  }

  calculateHash(str, end) {
    let hash = 0
    for (let i = 0; i < end; i++) {
      hash = (hash * this.charSetSize + str.charCodeAt(i)) % this.prime
    }

    return hash
  }

  updateHash(hash, oldChar, newChar, pow) {
    // Remove the contribution of the old character
    let newHash =
      (hash - ((oldChar.charCodeAt(0) * pow) % this.prime) + this.prime) %
      this.prime
    // Add the contribution of the new character
    newHash = (newHash * this.charSetSize + newChar.charCodeAt(0)) % this.prime

    return newHash
  }

  areEqual(str1, start1, end1, str2, start2, end2) {
    if (end1 - start1 !== end2 - start2) return false
    while (start1 < end1) {
      if (str1[start1] !== str2[start2]) return false
      start1++
      start2++
    }
    return true
  }

  // main algorithm
  search() {
    console.log("Searching...")

    const textLength = this.text.length
    const patternLength = this.pattern.length
    const patternHash = this.calculateHash(this.pattern, patternLength)

    let textHash = this.calculateHash(this.text, patternLength)

    const pow = Math.pow(this.charSetSize, patternLength - 1) % this.prime

    for (let i = 0; i <= textLength - patternLength; i++) {
      if (
        patternHash === textHash &&
        this.areEqual(
          this.text,
          i,
          i + patternLength,
          this.pattern,
          0,
          patternLength
        )
      ) {
        this.results.push(i) // Match found
      }

      if (i < textLength - patternLength) {
        textHash = this.updateHash(
          textHash,
          this.text[i],
          this.text[i + patternLength],
          pow
        )
      }
    }

    return this.results
  }
}

const text = "ABCCDDDEEAFFABC"
console.log("Text: ", text)

const pattern = "ABC"
console.log("Pattern: ", pattern)

const rabinKarp = new RabinKarp(text, pattern)
const indices = rabinKarp.search()
console.log("Pattern found at indices:", indices)
