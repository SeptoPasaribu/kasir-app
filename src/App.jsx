import { useState, useEffect } from "react"

function App() {
  const [nama, setNama] = useState("")
  const [harga, setHarga] = useState("")
  const [items, setItems] = useState(() => {
  const dataTersimpan = localStorage.getItem("kasir")

  return dataTersimpan
    ? JSON.parse(dataTersimpan)
    : []
})
const [editIndex, setEditIndex] = useState(null)
const [search, setSearch] = useState("")
const [history, setHistory] = useState([])

useEffect(() => {
  localStorage.setItem(
    "kasir",
    JSON.stringify(items)
  )
}, [items])

  const tambahBarang = () => {
  if (!nama || !harga) return

  const barangBaru = {
    nama,
    harga: parseInt(harga),
  }

  if (editIndex !== null) {
    const dataUpdate = [...items]

    dataUpdate[editIndex] = barangBaru

    setItems(dataUpdate)

    setEditIndex(null)
  } else {
    setItems([...items, barangBaru])
  }

  setNama("")
  setHarga("")
}

  const total = items.reduce((a, b) => a + b.harga, 0)

  return (
    <div
      style={{
        backgroundColor: "#1e1e1e",
        minHeight: "100vh",
        color: "white",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ color: "blue" }}>
  ROTEE SAWANGAN RIVERVIEW
</h1>

      <hr />

      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Nama Barang"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          style={{
            padding: "10px",
            marginRight: "10px",
          }}
        />

        <input
          type="number"
          placeholder="Harga"
          value={harga}
          onChange={(e) => setHarga(e.target.value)}
          style={{
            padding: "10px",
            marginRight: "10px",
          }}
        />

        <button
          onClick={tambahBarang}
          style={{
            padding: "10px 20px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {editIndex !== null ? "Update" : "Tambah"}
        </button>
      </div>
<input
  type="text"
  placeholder="Cari barang..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    padding: "10px",
    width: "300px",
    marginTop: "20px",
    marginBottom: "20px",
    borderRadius: "5px",
  }}
/>
      <table
        border="1"
        cellPadding="10"
        style={{
          marginTop: "30px",
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
  <tr>
    <th>Nama Barang</th>
    <th>Harga</th>
    <th>Aksi</th>
  </tr>
</thead>

        <tbody>
  {items
  .filter((item) =>
    item.nama
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .map((item, index) => (
    <tr key={index}>
      <td>{item.nama}</td>

      <td>Rp {item.harga.toLocaleString("id-ID")}</td>

      <td>

  <button
    onClick={() => {
      setNama(item.nama)
      setHarga(item.harga)
      setEditIndex(index)
    }}
    style={{
      backgroundColor: "blue",
      color: "white",
      border: "none",
      padding: "5px 10px",
      cursor: "pointer",
      marginRight: "10px",
    }}
  >
    Edit
  </button>

  <button
    onClick={() => {
      const dataBaru = items.filter(
        (_, i) => i !== index
      )

      setItems(dataBaru)
    }}
    style={{
      backgroundColor: "red",
      color: "white",
      border: "none",
      padding: "5px 10px",
      cursor: "pointer",
    }}
  >
    Hapus
  </button>

</td>
    </tr>
  ))}
</tbody>
      </table>

      <h2 style={{ marginTop: "20px" }}>
        Total: Rp {total.toLocaleString("id-ID")}
      </h2>

      <button
  onClick={() => {
    let isiStruk = "=== STRUK BELANJA ===\n\n"

    items.forEach((item) => {
      isiStruk += `${item.nama} - Rp ${item.harga.toLocaleString("id-ID")}\n`
    })

    isiStruk += `\nTotal: Rp ${total.toLocaleString("id-ID")}`

  const transaksiBaru = {
    tanggal: new Date().toLocaleString(),
    items: items,
    total: total,
}

setHistory([...history, transaksiBaru])
setItems([])
setNama("")
setHarga("")
setSearch("")
    console.log(isiStruk)
    window.print()
  }}

  style={{
    padding: "15px 30px",
    backgroundColor: "orange",
    color: "black",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
  }}
>
  Bayar
</button>
  <h2 style={{ marginTop: "40px" }}>
  Riwayat Transaksi
  </h2>

  {history.map((trx, index) => (
  <div
    key={index}
    style={{
      border: "1px solid gray",
      padding: "15px",
      marginTop: "20px",
      borderRadius: "10px",
      backgroundColor: "#2a2a2a",
    }}
  >
    <h3>Transaksi #{index + 1}</h3>

    <p>{trx.tanggal}</p>

    {trx.items.map((item, i) => (
      <div key={i}>
        {item.nama} - Rp {item.harga.toLocaleString("id-ID")}
      </div>
    ))}

    <h3>Total: Rp {trx.total.toLocaleString("id-ID")}</h3>
  </div>
))}
    </div>
  )
}

<style>
{`
@media print {

  input,
  button,
  hr {
    display: none !important;
  }

  th:last-child,
  td:last-child {
    display: none !important;
  }

  body {
    background: white !important;
    color: black !important;
  }

  table {
    width: 100%;
    color: black;
  }

  h1, h2, h3, p, td, th {
    color: black !important;
  }
}
`}
</style>

export default App