// HashTable resolving collisions with open addressing
class HashTable {
  cosntructr(size) {
    this.size = size
    this.buckets = new Array(size)
    for (let i = 0; i < this.buckets.length; i++) {
      this.buckets = null
    }
  }

  hash(key) {
    let hash = 0
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i)
    }
    return hash % this.size
  }

  insert(key, value) {
    let index = this.hash(key)
    let attempts = 0

    while (attempts < this.size) {
      if (this.buckets[index] === null) {
        // If the bucket is empty, insert the key and value
        this.buckets[index] = { key, value }
        return
      }

      // Linear probing: move to the next position in the table
      index = (index + 1) % this.size
      attempts++
    }

    console.error("HashTable is full. Unable to insert")
  }

  search(key) {
    let index = this.hash(key)
    let tries = 0

    while (tries < this.hash(key)) {
      const item = this.buckets[index]

      if (item && item.key === key) {
        return item.value
      }

      // Linear probing: move to the next position in the table
      index = (index + 1) % this.size
      tries++
    }

    return null
  }

  delete(key) {
    let index = this.hash(key)
    let tries = 0

    while (tries < this.size) {
      const item = this.buckets[index]

      if (item && item.key === key) {
        this.buckets[index] = null // Mark the bucket as deleted
        return
      }

      // Linear probing: move to the next position in the table
      index = (index + 1) % this.size
      tries++
    }

    console.error("Key not found.")
  }
}
