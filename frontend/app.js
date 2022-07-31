// @ts-nocheck
/*
<div class="card" style="width: 18rem">
        <img src="..." class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
*/
let api = "http://localhost:5000/single";
fetch(api)
  .then((res) => res.json())
  .then((data) => {
    getData(data);
  })
  .catch((e) => {
    console.log(e);
  });

function getData({ state, data, msg }) {
  //   console.log(data);
  if (state) {
    data.forEach(({ _id, picpath }) => {
      let arr = picpath.split("/");
      picpath = picpath.slice(1);
      // console.log(api + picpath)
      let el = `
        <div class="card" style="width: 18rem">
        <img src="${api + `/${_id}`}" class="card-img-top" alt="${
        arr[arr.length - 1]
      }" />
        <div class="card-body">
          <h5 class="card-title">${arr[arr.length - 1]}</h5>
          <a href="${api + "/" + _id}" class="btn btn-primary" download='${
        api + "/" + _id
      }' >Download</a>
        </div>
      </div>
        `;
      main.insertAdjacentHTML("beforeend", el);
    });
  } else {
    let element = `
    <div class="card" style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title">${msg}</h5>
        </div>
      </div>
    `;
    main.insertAdjacentHTML("beforeend", element);
  }
}

async function uploadImage() {
  let form = document.getElementById("forInput");
  const payload = new FormData(form);
  console.log(payload);
  let res = await fetch(api, { method: "POST", body: payload });
  let { data, msg, state } = await res.json();
  console.log(data);
  if (state) {
    let element = `
    <div class="card" style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title">${msg}</h5>
        </div>
      </div>
    `;
    main.insertAdjacentHTML("beforeend", element);
    setTimeout(() => {
      window.location.reload(true);
    }, 2000);
  } else {
    let element = `
    <div class="card" style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title">${msg}</h5>
        </div>
      </div>
    `;
    main.insertAdjacentHTML("beforeend", element);
  }
}
