// HashTable resolving collisions with open addressing
class HashTable {
  constructor(size) {
    this.size = size
    this.buckets = new Array(size)
    for (let i = 0; i < this.buckets.length; i++) {
      this.buckets[i] = null
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

    for (let attempts = 0; attempts < this.size || attempts === 0; attempts++) {
      if (this.buckets[index] === null) {
        // If the bucket is empty, insert the key and value
        this.buckets[index] = { key, value }
        return
      }

      // Linear probing: move to the next position in the table
      index = (index + 1) % this.size
    }

    console.error("HashTable is full. Unable to insert")
  }

  search(key) {
    let index = this.hash(key)

    for (let attempts = 0; attempts < this.size || attempts === 0; attempts++) {
      const item = this.buckets[index]

      if (item && item.key === key) {
        return item.value
      }

      // Linear probing: move to the next position in the table
      index = (index + 1) % this.size
    }

    return null
  }

  delete(key) {
    let index = this.hash(key)

    for (let attempts = 0; attempts < this.size || attempts === 0; attempts++) {
      const item = this.buckets[index]

      if (item && item.key === key) {
        this.buckets[index] = null // Mark the bucket as deleted
        return
      }

      // Linear probing: move to the next position in the table
      index = (index + 1) % this.size
    }

    console.error("Key not found.")
  }

  show() {
    console.log("HashTable: ", this.buckets)
  }
}

const table = new HashTable(10)
table.insert("apple", 10)
table.insert("banana", 20)
table.insert("orange", 30)
table.show()

console.log(table.search("apple"))
console.log(table.search("banana"))
console.log(table.search("orange"))

table.delete("banana")
console.log(table.search("banana"))
table.show()
