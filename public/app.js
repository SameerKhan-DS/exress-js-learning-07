// const api = require("../services/axiosInstance");

const App = () => {
  const [product, setproduct] = React.useState([]);
  const [form, updateForm] = React.useState({
    name: "",
    price: "",
  });
  React.useEffect(() => {
    fetchProduct();
  }, []);

  async function fetchProduct(params) {

    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setproduct(data);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(form.name);
    if (!form.name || !form.price) {
      return;
    } else {
      fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })
        .then((res) => res.json())
        .then((data) => {
          fetchProduct();
          updateForm({
            name: "",
            price: "",
          });
          // console.log(data);
        });
    }
  }

  function formUpdate(event, field) {
    if (field == "name") {
      updateForm({
        ...form,
        name: event.target.value,
      });
    } else if (field == "price") {
      updateForm({
        ...form,
        price: event.target.value,
      });
    }
  }

  const deleteProduct = (productId) => {
    fetch(`/api/products/${productId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        fetchProduct();
        console.log(data);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={"First name"}
          value={form.name}
          onChange={(e) => formUpdate(event, "name")}
        />
        <input
          type="text"
          placeholder={"Last name"}
          value={form.price}
          onChange={(e) => formUpdate(event, "price")}
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {product && product?.map((item) => {
          return (
            <div key={item.id}>
              <li>{item.name}</li>
              <li>{item.price}</li>
              <button id="btn" onClick={() => deleteProduct(item._id)}>
                Delete
              </button>
            </div>
          );
        })}
      </ul>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
