// HashTable resolving collisions with separate chaining
class HashTable {
  constructor(size) {
    this.size = size
    this.buckets = new Array(size)
    for (let i = 0; i < this.buckets.length; i++) {
      this.buckets[i] = []
    }
  }

  // hash function
  hash(key) {
    let hash = 0
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i)
    }

    return hash % this.size
  }

  insert(key, value) {
    const index = this.hash(key)
    this.buckets[index].push({ key, value })
  }

  search(key) {
    const index = this.hash(key)
    for (const item of this.buckets[index]) {
      if (item.key === key) {
        return item.value
      }
    }

    return null
  }

  delete(key) {
    const index = this.hash(key)
    const bucket = this.buckets[index]
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket.splice(i, 1)
        return
      }
    }
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

table.delete("banana")
console.log(table.search("banana"))
table.show()
