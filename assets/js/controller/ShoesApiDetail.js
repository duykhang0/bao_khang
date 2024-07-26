import { Shoes } from '../model/Shoes.js'; // Import class Shoes từ file Shoes.js

const getDetailShoe = async (id) => {
  try {
    const response = await axios.get(`https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`);
    const data = response.data.content;
    const shoeObj = new Shoes(data); // Tạo đối tượng Shoes từ dữ liệu API

    // Tạo HTML cho các size sản phẩm
    let htmlSizeString = shoeObj.size.map((sz) => {
      return `<button class="btn btn-success">${sz}</button>`;
    }).join("");

    // Tạo HTML cho phần chi tiết sản phẩm
    let htmlString = `<div class="item__product">
      <div class="item__product-wrap">
        <img src="${shoeObj.image}" alt="${shoeObj.name}" />
      </div>
      <div class="item__product-wrap">
        <div class="item__product-text">
          <h2>${shoeObj.name}</h2>
          <p>${shoeObj.description}</p>
        </div>
        <h4>Available Size</h4>
        <div class="button mb-4 d-flex gap-2">
          ${htmlSizeString}
        </div>
        <p class="text-danger my-4 fs-1">${shoeObj.price}$</p>
        <div class="item__product-number mb-3">
          <button class="btn bg-body-secondary py-2 px-3 me-2">-</button>
          <span>1</span>
          <button class="btn bg-body-secondary py-2 px-3 ms-2">+</button>
        </div>
        <div class="item__product-cart">
          <button class="btn btn-warning fw-bold py-3">Add To Cart</button>
        </div>
      </div>
    </div>`;

    // Cập nhật nội dung trang chi tiết sản phẩm
    let detailProductDom = document.querySelector(".item .container");
    if (detailProductDom) {
      detailProductDom.innerHTML = htmlString;
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
};


window.getAllShoes = async () => {
  try {
    let result = await axios.get(`https://shop.cyberlearn.vn/api/Product`);
    const listData = result.data.content;
    let htmlString = ``;
    let carouselHtmlString = ``;
    let count = 0;

    listData.forEach((shoe) => {
      const shoeObj = new Shoes(shoe);

      htmlString += `<div class="product__item">
        <img src="${shoeObj.image}" alt="" />
        <h3>${shoeObj.name}</h3>
        <p>${shoeObj.shortDescription}</p>
        <div class="group__action">
          <div class="action__buyNow">
            <a href="./detail.html?${shoeObj.id}">Buy Now</a>
          </div>
          <div class="action__price">
            <p>${shoeObj.price}$</p>
          </div>
        </div>
      </div>`;

      if (count < 3) {
        carouselHtmlString += `<div class="carousel-item ${count === 0 ? "active" : ""}">
          <div class="carousel-item__wrap">
            <div class="carousel-item__img">
              <img src="${shoeObj.image}" />
            </div>
            <div class="carousel-item__text p-5">
              <h1 class="mt-5">${shoeObj.name}</h1>
              <p class="mb-5">${shoeObj.description}</p>
              <button class="btn btn-warning">
                <a href="./detail.html?${shoeObj.id}">Buy Now</a>
              </button>
            </div>
          </div>
        </div>`;

        count++;
      }
    });

    let listProductDom = document.querySelector(".product__content.page__detail");
    let carouselProductDom = document.querySelector(".carousel-inner .container");

    if (listProductDom) {
      listProductDom.innerHTML = htmlString;
    }

    if (carouselProductDom) {
      carouselProductDom.innerHTML = carouselHtmlString;
    }
  } catch (error) {
    console.log(error);
  }
};
getAllShoes()
const pageSize = 6;

const  getRelatedProducts = async (pageIndex = 1) => {
  try {
    // console.log("Fetching products...");

    // Gửi yêu cầu API
    const response = await axios({
      method: "GET",
      url: `https://shop.cyberlearn.vn/api/Product/getpaging`,
      params: {
        pageSize,
        pageIndex,
      },
    });

    // Xử lý dữ liệu phản hồi
    const listData = response.data.content;
    const totalPage = Math.ceil(Number(listData.totalRow) / Number(pageSize));

    // Tạo điều hướng phân trang
    const navElement = document.createElement("nav");
    navElement.setAttribute("aria-label", "Page navigation example");
    const ulElement = document.createElement("ul");
    ulElement.className = "pagination justify-content-center";
    navElement.appendChild(ulElement);

    for (let i = 1; i <= totalPage; i++) {
      const liElement = document.createElement("li");
      liElement.className = "page-item";
      const element = document.createElement("div");
      element.className = "page-link";
      element.innerHTML = i;
      element.addEventListener("click", () => {
        getRelatedProducts(i);
      });
      liElement.appendChild(element);
      ulElement.appendChild(liElement);
    }

    // console.log(navElement);

    // Tạo HTML cho danh sách sản phẩm
    let listHtmlString = "";
    listData.items.forEach((shoe) => {
      const shoeObj = new Shoes(shoe);
      listHtmlString = listHtmlString.concat(
        `<div class="product__item">
          <div class="item__img">
            <img src="https://shop.cyberlearn.vn/images/${shoeObj.image}" alt="" />
          </div>
          <div class="item__name">
            <h3>${shoeObj.name}</h3>
          </div>
          <div class="item__shortDescription">
            <p>${shoeObj.shortDescription}</p>
          </div>
           <div class="group__action">
             <div class="action__buyNow">
             <a href="./detail.html?${shoeObj.id}">Buy Now</a>
               
             </div>
             <div class="action__price">
               <p>${shoeObj.price}$</p>
             </div>
           </div>
        </div>`
      );
    });

    // Cập nhật nội dung sản phẩm và phân trang vào DOM
    const listProductDom = document.querySelector(".product__content.page__home");

    if (listProductDom) {
      listProductDom.innerHTML = listHtmlString;
    }

    const paginationDom = document.querySelector(".product__pagination");
    if (paginationDom) {
      if (!paginationDom.hasChildNodes()) {
        paginationDom.appendChild(navElement);
      }
    }
  } catch (err) {
    // Xử lý lỗi
    console.error("Error fetching products:", err);
  }
};

const initialize = () => {
  const searchParams = new URLSearchParams(window.location.search).get('id'); // Lấy giá trị id từ query params
  if (searchParams) {
    getDetailShoe(searchParams);
  }
  getRelatedProducts();
};

// Gọi hàm initialize khi trang được tải
window.onload = initialize;
