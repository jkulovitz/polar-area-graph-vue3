import axios from 'axios'

export default {
  async getPurchases () {
    const res = await axios.get('http://localhost:3001/purchases')
    return res.data
  },
  async deletePurchase (id) {
    const res = await axios.delete(`http://localhost:3001/purchases/${id}`)
    return res.data
  },
  async editPurchase (id, item) {
    const res = await axios.put(`http://localhost:3001/purchases/${id}`, item)
    return res.data
  },
  async saveNewPurchase (item) {
    const res = await axios.post('http://localhost:3001/purchases', item)
    return res.data
  }
}
